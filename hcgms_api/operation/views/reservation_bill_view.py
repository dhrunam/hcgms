from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from rest_framework.views import APIView
from rest_framework.response import Response

from hcgms_api.operation import models as op_models
from hcgms_api.configuration import models as conf_models
from hcgms_api.operation import serializers
from hcgms_api.operation.utility.cost_calculator import CostCalculator
from durin.auth import TokenAuthentication
import datetime
import json

def generate_bill_no(self, data):

    latest_record = op_models.ReservationBillDetails.objects.filter(property=data['property']).last()
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
            print(bill_year,bill_month,sl_no, year, month)
            if bill_year == year and bill_month == month  :
                print('I am in..')
                sl_no = sl_no+1
                return  'B-' + property.short_name + str(bill_year) + f"{bill_month:02d}" + f"{sl_no:03d}"
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

        reservation_rooms=op_models.ReservationRoomDetails.objects.filter(reservation=request.data['reservation'])
        if(reservation_rooms):
            request.data['total_room_cost'] = CostCalculator.calculate_total_room_cost(self,reservation_rooms )
        
        service_details=op_models.MiscellaneousServiceChargeDetails.objects.filter(reservation=request.data['reservation'])
        if(service_details):
            request.data['total_service_cost'] = CostCalculator.calculate_total_service_cost(self, service_details)
            
        request.data['bill_no'] = generate_bill_no(self,request.data)
        
        request.data['created_by'] = request.user.id


        reservation_bill = self.create(request, *args, **kwargs)
        reservation= op_models.ReservationDetails.objects.get(pk=request.data['reservation'])

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
        
        reservation= self.request.query_params.get('reservation')

        if(reservation):
            return op_models.ReservationBillDetails.objects.filter(reservation=reservation)
        
        
        reservation_no= self.request.query_params.get('reservation_no')
        if(reservation_no):
            reservation= op_models.ReservationDetails.objects.filter(reservation_no=reservation_no).last()
            if(reservation):
                return op_models.ReservationBillDetails.objects.filter(reservation=reservation.id)
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


class ReservationBill(APIView):
    def get(self, request, format=None):
        reservation = request.query_params.get('reservation')
 
        

        with connection.cursor() as cursor:
            cursor.execute('''
                select * from (
            select cr.id, cr.room_no, cr.occupancy, cr.description, cr.is_operational, cr.property_id, cr.room_category_id, rc.name as room_category_name,
                case when rr.room_id is null then 0
                else 1
                end status,
                rate.cost
            from public.configuration_room as cr
                join public.configuration_property as pr
	            on cr.property_id=pr.id and pr.is_operational=true and pr.id=%s
                join (SELECT id, cost,property_id, room_id
                FROM public.configuration_roomrate
                where start_date<=%s --checkin_date
                    and end_date>=%s --checkin_date
                ) as rate on rate.property_id=cr.property_id and rate.room_id=cr.id
                join public.configuration_roomcategory as rc on rc.id=cr.room_category_id
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
             order by f.property_id asc
                    
                    ;
            ''',[property,checkin_date,checkin_date,checkin_date, checkin_date, checkout_date,checkout_date, checkin_date, checkout_date])
            raw_query_results = cursor.fetchall()

        property=conf_models.Property.objects.filter(is_operational=True, id=property)
        
        results = []
        rooms=[]

        if property:
            for property_row in property:
                if raw_query_results:
                    for room_row in raw_query_results: 

                        if property_row.id == room_row[5]:
                            rooms.append({
                                'id':room_row[0],
                                'room':room_row[1],
                                'occupancy':room_row[2],
                                'description':room_row[3],
                                'is_operational':room_row[4],
                                'property_id':room_row[5],
                                'room_category_id':room_row[6],
                                'room_category_name':room_row[7],
                                'status':room_row[8],
                                'cost':room_row[9],
                            })
                            
                    
                    results.append({
                        'id':property_row.id,
                        'name':property_row.name,
                        'short_name':property_row.short_name,
                        'code':property_row.code,
                        'address':property_row.address,
                        'description':property_row.description,
                        'rooms':rooms
                    })
                
                rooms=[]

            return Response(results)
