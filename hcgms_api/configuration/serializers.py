from rest_framework import serializers
from hcgms_api.account import models as acc_model
from django.contrib.auth.models import (User, Group)
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction, connection
from hcgms_api.configuration import models


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Property
        fields = [
                    'id', 
                    'name', 
                    'short_name',
                    'code',
                    'address',
                    'description',

                ]

class RoomCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RoomCategory
        fields = [
                    'id', 
                    'name', 

                ]


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Room
        fields = [
                    'id', 
                    'property', 
                    'room_category',
                    'room_no',
                    'occupancy',
                    'description',
                    'is_operational'

                ]

