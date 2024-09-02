"""
Main routing config.
"""
from django.views.generic import TemplateView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)
from django.contrib import admin
from django.urls import path, include, re_path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/shema/', SpectacularAPIView.as_view(), name='api-shema'),
    path(
        'api/docs/',
        SpectacularSwaggerView.as_view(url_name='api-shema'),
        name='api-docs',
    ),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('api/', include('user_profile.urls')),
]

urlpatterns += [re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))]