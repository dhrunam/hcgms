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

class ReservationDetailsSerializer(serializers.ModelSerializer):
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

                ]



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

    