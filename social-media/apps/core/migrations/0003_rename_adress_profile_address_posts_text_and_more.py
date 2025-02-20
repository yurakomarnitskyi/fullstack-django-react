# Generated by Django 4.2.11 on 2024-04-16 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_profile_posts'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='adress',
            new_name='address',
        ),
        migrations.AddField(
            model_name='posts',
            name='text',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='posts',
            field=models.ManyToManyField(related_name='profiles', to='core.posts'),
        ),
    ]
