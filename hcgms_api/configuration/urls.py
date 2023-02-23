
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from durin import views as durin_views
from hcgms_api.configuration import views

urlpatterns = [
    path('api/property', views.PropertyList.as_view()),
    path('api/property/<int:pk>', views.PropertyDetails.as_view()),
]


