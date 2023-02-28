from hcgms_api.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.operation import serializers
from durin.auth import TokenAuthentication

class RoomSearchList(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSearchSerializer
    # pagination.PageNumberPagination.page_size = 100
    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        checkin_date = self.request.query_params.get('checkin_date')
        checkout_date = self.request.query_params.get('checkout_date')
        # purchase = self.request.query_params.get('purchase')
        queryset = models.Room.objects.raw('''
                select * from (
            select cr.*,
                case when rr.room_id is null then 0
                else 1
                end status,
                rate.cost
            from public.configuration_room as cr
                join (SELECT id, cost,property_id, room_id
                FROM public.configuration_roomrate
                where start_date<=%s --checkin_date
                    and end_date>=%s --checkin_date
                ) as rate on rate.property_id=cr.property_id and rate.room_id=cr.id
            left join (
            SELECT 
                property_id, room_id
                FROM public.operation_reservationroomdetails as rr
                
                where 
                (
                    checkin_date<=%s-- checkin_date
                    and
                    checkout_date>%s -- checkin_date
                )
                or
                (
                    checkin_date<%s-- checkout_date
                    and
                    checkout_date>=%s -- checkout_date
                )
                or
                (
                    checkin_date>%s -- checkin_date
                    and
                    checkout_date<%s--checkout_date
                )
                
                ) as rr on rr.room_id=cr.id and rr.property_id=cr.property_id

            ) as f
            where f.status=0
                    
                    ;
            ''',  [checkin_date,checkin_date,checkin_date, checkin_date, checkout_date,checkout_date, checkin_date, checkout_date])

        return queryset
    
# ===

