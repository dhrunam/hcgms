from hcgms_api.operation import models as op_models
from hcgms_api.configuration import models as conf_models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hcgms_api.operation import serializers
from durin.auth import TokenAuthentication
import datetime



class GuestCheckInCheckOutDetailsList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_models.GuestCheckInCheckOutDetails.objects.all()
    serializer_class = serializers.CheckInCheckOutSerializer
    # pagination.PageNumberPagination.page_size = 100
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data['created_by'] = request.user.id

        
        reservation_details = self.create(request, *args, **kwargs)
       
        # request.data['created_by'] = reservation_details.data['id']
        reservation_room = op_models.ReservationRoomDetails.objects.filter(
        reservation=request.data['reservation'], property=request.data['property'], room=request.data['room'])
        if(reservation_room):
            reservation_room[0].checkin_date = request.data['checkin_date']
            reservation_room[0].save()

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
                return op_models.GuestCheckInCheckOutDetails.objects.filter(reservation=reservation_id)
        # order_number = self.request.data['order_no']
        # reservation_no = self.request.query_params.get('reservation_no')
        # reservation_for= self.request.query_params.get('reservation_for')
        # if(reservation_no):
        #     return op_models.ReservationDetails.objects.filter(reservation_no=reservation_no)
        # if(reservation_for):
        #     return op_models.ReservationDetails.objects.filter(reservation_for=reservation_for)
        # else:
        return op_models.GuestCheckInCheckOutDetails.objects.all()



class GuestCheckInCheckOutDetailsDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_models.GuestCheckInCheckOutDetails.objects.all()
    serializer_class = serializers.CheckInCheckOutSerializer
    # pagination.PageNumberPagination.page_size = 100
    @transaction.atomic
    def put(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data['created_by'] = request.user.id


        request.data._mutable = False
        reservation_details = self.update(request, *args, **kwargs)
                
        reservation_room = op_models.ReservationRoomDetails.objects.filter(
        reservation=request.data['reservation'], property=request.data['property'], room=request.data['room'])
        if(reservation_room):
            print('check out date:')
            print(reservation_room[0].checkout_date)
            reservation_room[0].checkout_date = request.data['checkout_date']
            reservation_room[0].save()

        return self.get(request, *args, **kwargs)
    
    
    def patch(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data['created_by'] = request.user.id


        request.data._mutable = False
        reservation_details = self.partial_update(request, *args, **kwargs)
                
        reservation_room = op_models.ReservationRoomDetails.objects.filter(
        reservation=request.data['reservation'], property=request.data['property'], room=request.data['room'])
        if(reservation_room):
            
            if 'checkin_date' in request.data:

                reservation_room[0].checkin_date = request.data['checkin_date']

            if 'checkout_date' in request.data:

                reservation_room[0].checkout_date = request.data['checkout_date']
                
            reservation_room[0].save()

        return self.get(request, *args, **kwargs)

        # return self.partial_update(request, *args, **kwargs)


# ===