"""
Database models.
"""
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class UserAccountManager(BaseUserManager):
    """Class for creating user."""
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """User database fields."""
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return f"{self.first_name}_{self.last_name}"

    def get_short_name(self):
        return self.last_name

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        Profile.objects.get_or_create(user=self, name=self.get_full_name())
        

def upload_to(instance, filename):
    return 'user-profile/{filename}'.format(filename=filename)

class Profile(models.Model):
    """Model for user profile."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    profile_photo = models.ImageField(_('Image'), upload_to=upload_to, default='user-profile/default.jpg')
    address = models.CharField(max_length=255, blank=True)
    hobby = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    posts = models.ForeignKey('Post', related_name='profile_posts', blank=True, null=True, on_delete=models.CASCADE)


class Post(models.Model):
    """Model for user posts."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    photo = models.ImageField(upload_to='posts', null=True, blank=True)
    video = models.FileField(upload_to='posts', null=True, blank=True)


@receiver(post_save, sender=Post)
def update_profile(sender, instance, created, **kwargs):
    """Signals for updating profile."""
    if created:
        profile, _ = Profile.objects.get_or_create(user=instance.user)
        profile.posts.add(instance)


@receiver(post_save, sender=UserAccount)
def save_user_profile(sender, instance, created, **kwargs):
    """Signals that create user set name in profile"""
    if created:
        Profile.objects.create(user=instance, name=instance.get_full_name())
    else:
        if hasattr(instance, 'profile'):
            instance.profile.save()
        else:
            Profile.objects.create(user=instance, name=instance.get_full_name())

