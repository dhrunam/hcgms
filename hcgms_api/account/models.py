# from turtle import update
from django.db import models
from django.contrib.auth.models import User
from hcgms_api.configuration.models import (
    Property
)

# Create your models here.
class UserProfile(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='related_profile')

    property = models.ForeignKey(
        Property, on_delete=models.SET_NULL, null=True, related_name='user_of_property')

    contact_number = models.CharField(max_length=12, null=True)
    created_by=models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='created_by_user')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)