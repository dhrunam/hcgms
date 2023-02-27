from hcgms_api.operation import models as op_models
from hcgms_api.configuration import models as conf_models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hcgms_api.operation import serializers
from durin.auth import TokenAuthentication
import datetime


def generate_reservation_no(self, data):

    latest_record = op_models.ReservationDetails.objects.filter(property=data['property']).last()
    property = conf_models.Property.objects.get(pk=data['property'])
    date_object = datetime.datetime.strptime(data['checkin_date'], '%Y-%m-%d')

    reservation_year =date_object.strftime('%Y')
    sl_no = 1
    if latest_record and property:
        reservation_no = latest_record.reservation_no

        if reservation_no:

            year = reservation_no[-9:-5]
            print('year:')
            print(year)
            sl_no = int(reservation_no[-5:])

            if reservation_year == year:
                sl_no = sl_no+1
            else:
                sl_no = 1

            return property.short_name+str(reservation_year)+f"{sl_no:05d}"

        return property.short_name+str(reservation_year)+f"{sl_no:05d}"

    return property.short_name+str(reservation_year)+f"{sl_no:05d}"

class ReservationDetailsList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_models.ReservationDetails.objects.all()
    serializer_class = serializers.ReservationDetailsSerializer
    # pagination.PageNumberPagination.page_size = 100
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data['created_by'] = request.user.id

        request.data['reservation_no'] = generate_reservation_no(
            self, request.data)
        request.data._mutable = False
        reservation_details = self.create(request, *args, **kwargs)
        rooms = [{'room':1, 'room_rate':400},{'room':3, 'room_rate':400}]
        print(reservation_details.data)
        if(rooms):
            for element in rooms:
                
                reservation_room=op_models.ReservationRoomDetails.objects.create(
                        reservation = op_models.ReservationDetails.objects.get(id=reservation_details.data['id']),
                        property = conf_models.Property.objects.get(id = request.data['property']),
                        room = conf_models.Room.objects.get(id=element['room']),
                        room_rate = element['room_rate'],
                        checkin_date = request.data['checkin_date'],
                        checkout_date = request.data['checkout_date']
                    )
                

        return self.get(request, *args, **kwargs)
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        if self.request.method == "POST":
            reservation_no=self.request.data['reservation_no']
            if(reservation_no):
                return op_models.ReservationDetails.objects.filter(reservation_no=reservation_no)
        # order_number = self.request.data['order_no']
        reservation_no = self.request.query_params.get('reservation_no')
        reservation_for= self.request.query_params.get('reservation_for')
        if(reservation_no):
            return op_models.ReservationDetails.objects.filter(reservation_no=reservation_no)
        if(reservation_for):
            return op_models.ReservationDetails.objects.filter(reservation_for=reservation_for)
        else:
            return op_models.ReservationDetails.objects.all()



class ReservationDetailsDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_models.ReservationDetails.objects.all()
    serializer_class = serializers.ReservationDetailsSerializer
    # pagination.PageNumberPagination.page_size = 100
    @transaction.atomic
    def put(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data['created_by'] = request.user.id


        request.data._mutable = False
        reservation_details = self.update(request, *args, **kwargs)
        rooms = [{'room':1, 'room_rate':400}]
        print(reservation_details.data)
        if(rooms):
            op_models.ReservationRoomDetails.objects.filter(reservation=reservation_details.data['id']).delete()
            for element in rooms:
                
                reservation_room=op_models.ReservationRoomDetails.objects.create(
                        reservation = op_models.ReservationDetails.objects.get(id=reservation_details.data['id']),
                        property = conf_models.Property.objects.get(id = request.data['property']),
                        room = conf_models.Room.objects.get(id=element['room']),
                        room_rate = element['room_rate'],
                        checkin_date = request.data['checkin_date'],
                        checkout_date = request.data['checkout_date']
                    )
                

        return self.get(request, *args, **kwargs)
    



# ===