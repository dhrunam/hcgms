import datetime
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
    related_property = PropertySerializer(source='property', read_only=True)
    related_category = RoomCategorySerializer(source='room_category', read_only=True)
    class Meta:
        model = models.Room
        fields = [
                    'id', 
                    'property', 
                    'room_category',
                    'room_no',
                    'occupancy',
                    'description',
                    'is_operational',
                    'related_property',
                    'related_category'

                ]

class RoomRateSerializer(serializers.ModelSerializer):
    related_property = PropertySerializer(source='property', read_only=True)
    related_room = RoomSerializer(source='room', read_only=True)
    class Meta:
        model = models.RoomRate
        fields = [
                    'id', 
                    'property', 
                    'room',
                    'cost',
                    'start_date',
                    'end_date',
                    'related_property',
                    'related_room'

                ]
    def validate(self, attrs):


        today=datetime.date.today()
        if attrs['start_date'] > attrs['end_date']:
            raise serializers.ValidationError(
                {"start_date": "Start date  cannot be greater than End date."})

        if attrs['start_date'] < today:
            raise serializers.ValidationError(
                {"start_date": "Start date  cannot be less than today's date."})

        if attrs['end_date'] < today:
            raise serializers.ValidationError(
                {"end_date": "End date  cannot be less than today's date."})

        room_rates=models.RoomRate.objects.filter(property=attrs['property'],room=attrs['room'], end_date__gte=attrs['start_date'])
        
        if room_rates and room_rates.count()>0:

            raise serializers.ValidationError(
                {"start_date": "Start date already configured in this date range."})

        room_rates=models.RoomRate.objects.filter(property=attrs['property'],room=attrs['room'], end_date__gte=attrs['end_date'])
        
        if room_rates and room_rates.count()>0:

            raise serializers.ValidationError(
                {"end_date": "Start date already configured in this date range."})

        

        return attrs
