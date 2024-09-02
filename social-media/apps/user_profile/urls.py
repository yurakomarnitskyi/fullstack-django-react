"""
Routing for user profile.
"""
from django.urls import path, include
from user_profile import views
from rest_framework.routers import DefaultRouter

from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register('user_profile', views.ProfileViews)


app_name = 'user_profile'


urlpatterns = [
    path('', include(router.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)