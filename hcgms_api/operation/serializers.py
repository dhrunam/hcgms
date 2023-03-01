import datetime
from rest_framework import serializers
from hcgms_api.account import models as acc_model
from django.contrib.auth.models import (User, Group)
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction, connection
from hcgms_api.operation import models
from hcgms_api.configuration import models as conf_model
from hcgms_api.configuration import serializers as conf_serializers


class ReservationRoomDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ReservationRoomDetails
        fields = [
                    'id', 
                    'reservation', 
                    'property',
                    'room',
                    'room_rate',
                    'checkin_date',
                    'checkout_date',

                ]
class ReservationDetailsSerializer(serializers.ModelSerializer):
    reservation_room_details = ReservationRoomDetailsSerializer(source='reservation_room_details.all', many=True,read_only=True)
    # model2s = Model2Serializer(source='model3s.all.model2', many=True)


    class Meta:
        model = models.ReservationDetails
        fields = [
                    'id', 
                    'property',
                    'reservation_no', 
                    'lead_guest_name',
                    'reservation_for',
                    'reservation_from',
                    'address',
                    'contact_no',
                    'remarks',
                    'checkin_date',
                    'checkout_date',
                    'total_room_cost',
                    'discount',
                    'refund',
                    'is_bill_generated',
                    'created_at',
                    'reservation_room_details'

                ]
        
    def validate(self, attrs):


        today=datetime.date.today()
        if attrs['checkin_date'] > attrs['checkout_date']:
            raise serializers.ValidationError(
                {"checkin_date": "Checkin date  cannot be greater than Checkout date."})

        if attrs['checkin_date'] < today:
            raise serializers.ValidationError(
                {"checkin_date": "Checkin date  cannot be less than today's date."})

        return attrs




class RoomSearchSerializer(serializers.ModelSerializer):
    related_property = conf_serializers.HelperPropertySerializer(source='property', read_only=True)
    related_category = conf_serializers.RoomCategorySerializer(source='room_category', read_only=True)
    cost = serializers.DecimalField(max_digits=8, decimal_places=2,  read_only=True)
    class Meta:
        model = conf_model.Room
        fields = [
                    'id', 
                    'property', 
                    'room_category',
                    'room_no',
                    'occupancy',
                    'description',
                    'is_operational',
                    'related_property',
                    'related_category',
                    'cost'

                ]

class CheckInCheckOutSerializer(serializers.ModelSerializer):
    # related_property = conf_serializers.HelperPropertySerializer(source='property', read_only=True)
    # related_category = conf_serializers.RoomCategorySerializer(source='room_category', read_only=True)
    # cost = serializers.DecimalField(max_digits=8, decimal_places=2,  read_only=True)
    class Meta:
        model = models.GuestCheckInCheckOutDetails
        fields = [
                    'id', 
                    'reservation',
                    'property',
                    'room',
                    'lead_guest',
                    'no_adult',
                    'no_child',
                    'address',
                    'checkin_date',
                    'checkout_date',
                    'remarks',


                ]
