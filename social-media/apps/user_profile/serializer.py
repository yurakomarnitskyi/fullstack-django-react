"""
Serializer for user profile.
"""
from rest_framework import serializers
from core.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for profile fields."""
    class Meta:
        model = Profile
        fields = ['id', 'name', 'profile_photo', 'address', 'hobby', 'description', 'posts']
        read_only_fields = ['id', 'name']
