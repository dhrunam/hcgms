from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from rest_framework.views import APIView
from rest_framework.response import Response

from hcgms_api.operation import models as op_models
from hcgms_api.configuration import models as conf_models
from hcgms_api.operation import serializers
from durin.auth import TokenAuthentication
import datetime
import json

def generate_bill_no(self, data):

    latest_record = op_models.ReservationBillDetails.objects.filter(reservation=data['reservation'], property=data['property']).last()
    property = conf_models.Property.objects.get(pk=data['property'])
    # date_object = datetime.datetime.strptime(data['checkin_date'], '%Y-%m-%d')
    date_object = datetime.datetime.today()

    bill_year = int(date_object.strftime('%y'))
    bill_month =int(date_object.strftime('%m'))
    sl_no = 1
    if latest_record and property:

        bill_no = latest_record.bill_no

        if bill_no:

            year =int( bill_no[-7:-5])
            month= int(bill_no[-5:-3])
            sl_no = int(bill_no[-3:])

            if bill_year == year and bill_month == month  :

                sl_no = sl_no+1
            else:
                sl_no = 1

            return  'B-' + property.short_name + str(bill_year) + f"{bill_month:02d}" + f"{sl_no:03d}"

        return  'B-' + property.short_name + str(bill_year) + f"{bill_month:02d}" + f"{sl_no:03d}"
    return  'B-' + property.short_name + str(bill_year) + f"{bill_month:02d}" + f"{sl_no:03d}"

class ReservationBillList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_models.ReservationBillDetails.objects.all()
    serializer_class = serializers.ReservationBillSerializer
    # pagination.PageNumberPagination.page_size = 100
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data['created_by'] = request.user.id

        request.data['bill_no'] = generate_bill_no(self,request.data)

        print(request.data['bill_no'])

        reservation_bill = self.create(request, *args, **kwargs)
        reservation= op_models.ReservationDetails.objects.get(
        pk=request.data['reservation'])

        if(reservation):
            reservation.is_bill_generated = True
            reservation.save()

        request.data._mutable = False
        return self.get(request, *args, **kwargs)
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        if self.request.method == "POST":
            reservation_id=self.request.data['reservation']
            if(reservation_id):
                return op_models.ReservationBillDetails.objects.filter(reservation=reservation_id)
        # order_number = self.request.data['order_no']
        # reservation_no = self.request.query_params.get('reservation_no')
        # reservation_for= self.request.query_params.get('reservation_for')
        # if(reservation_no):
        #     return op_models.ReservationDetails.objects.filter(reservation_no=reservation_no)
        # if(reservation_for):
        #     return op_models.ReservationDetails.objects.filter(reservation_for=reservation_for)
        # else:
        return op_models.ReservationBillDetails.objects.all()



class ReservationBillDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_models.ReservationBillDetails.objects.all()
    serializer_class = serializers.ReservationBillSerializer
    # pagination.PageNumberPagination.page_size = 100
    @transaction.atomic
    def put(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data['created_by'] = request.user.id


        request.data._mutable = False
        reservation_bill = self.update(request, *args, **kwargs)
                
        reservation= op_models.ReservationDetails.objects.get(
        pk=request.data['reservation'])
        if(reservation):
            reservation.is_bill_generated = True
            reservation.save()

        return self.get(request, *args, **kwargs)
    
    
    def patch(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data['created_by'] = request.user.id


        request.data._mutable = False
        reservation_details = self.partial_update(request, *args, **kwargs)
                
        reservation = op_models.ReservationDetails.objects.get(
        pk=request.data['reservation'])
        if(reservation):
            
            reservation.is_bill_generated=True
                
            reservation.save()

        return self.get(request, *args, **kwargs)

        # return self.partial_update(request, *args, **kwargs)
