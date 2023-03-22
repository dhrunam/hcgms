import datetime
from rest_framework import serializers
from hcgms_api.account import models as acc_model
from django.contrib.auth.models import (User, Group)
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction, connection
from hcgms_api.inventory import models
from hcgms_api.configuration import serializers as con_serializers
from hcgms_api.account import serializers as acc_serializers

class ItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Item
        fields = [
                    'id',
                    'name',

        ]


class ItemInstockSerializer(serializers.ModelSerializer):
    related_item=ItemSerializer(source='item', read_only=True)
    related_property= con_serializers.HelperPropertySerializer(source= 'property',read_only=True)
    related_created_by= acc_serializers.LeanUserSerializer(source='created_by',read_only=True)
    class Meta:
        model = models.ItemInStock
        fields = [
            'id',
            'item',
            'property',
            'batch_no',
            'quantity_received',
            'date_of_received',
            'created_by',
            'created_at',
            'updated_at',
            'related_item',
            'related_property',
            'related_created_by'
        ]

    
