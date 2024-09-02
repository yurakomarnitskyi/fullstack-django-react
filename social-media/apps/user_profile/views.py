"""
Views logic for profile.
"""
from core.models import Profile
from user_profile.serializer import ProfileSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response


class ProfileViews(viewsets.ModelViewSet):
   """Logic for user profile."""
   serializer_class = ProfileSerializer
   queryset = Profile.objects.all()
   authentication_classes = [JWTAuthentication]
   permission_classes = [IsAuthenticated]


   def update(self, request, *args, **kwargs):
      """Function that allow update only personal profile."""
      profile_instance = self.get_object()

      if profile_instance.user != self.request.user:
         return Response({"message": "You do not have permission to perform this action."}, status=403)
      return super().update(request, args, **kwargs)

