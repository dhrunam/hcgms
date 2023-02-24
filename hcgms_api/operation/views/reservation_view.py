from hcgms_api.operation import models as op_models
from hcgms_api.configuration import models as conf_models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hcgms_api.operation import serializers
from durin.auth import TokenAuthentication

class ReservationDetailsList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_models.ReservationDetails.objects.all()
    serializer_class = serializers.ReservationDetailsSerializer
    # pagination.PageNumberPagination.page_size = 100
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        #request.data._mutable = True
        data = request.data['data']
        request.data['created_by'] = request.user.id
        reservation_details=self.create(request, *args, **kwargs)
        # result = self.create(request, *args, **kwargs)
        if(data):
            for element in data:
                
                reservation_room=op_models.ReservationRoomDetails.objects.create(
                        reservation=reservation_details,
                        property=conf_models.Property.objects.get(id=element['property']),
                        room=conf_models.Room.objects.get(id=element['room']),
                        room_rate=element['room_rate'],
                        checkin_date=element['checkin_date'],
                        checkout_date=element['checkout_date']
                    )
                
        #request.data._mutable = False
        return self.get(request, *args, **kwargs)
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """

        # order_number = self.request.data['order_no']
        reservation_no = self.request.query_params.get('reservation_no')
        reservation_for= self.request.query_params.get('reservation_for')
        if(reservation_no):
            return op_models.ReservationDetails.objects.filter(reservation_no=reservation_no)
        if(reservation_for):
            return op_models.ReservationDetails.objects.filter(reservation_for=reservation_for)
        else:
            return models.Room.objects.all()




# ===