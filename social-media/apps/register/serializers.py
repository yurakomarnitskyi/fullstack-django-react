"""
Serializer configuration.
"""
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model


User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    """Serializer for user."""
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')