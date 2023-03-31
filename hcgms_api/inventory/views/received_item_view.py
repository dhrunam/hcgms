from hcgms_api.configuration import models as conf_models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.inventory import serializers
from durin.auth import TokenAuthentication
from hcgms_api.inventory import models as inv_models
from django.db import transaction, connection

class ReceivedItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_models.ItemReceived.objects.all()
    serializer_class = serializers.ItemReceivedSerializer
    # pagination.PageNumberPagination.page_size = 2

    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """

        # order_number = self.request.data['order_no']
        search_text = self.request.query_params.get('batch_no')

        if(search_text):
            return inv_models.ItemReceived.objects.filter(batch_no=search_text)

        return inv_models.ItemReceived.objects.all()

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        #request.data._mutable = True
        data = request.data['data']
        # result = self.create(request, *args, **kwargs)
        if(data):
            for element in data:
                
                # request.data['id'] = element['id']
                request.data['property'] = element['property']
                request.data['item'] = element['item']
                request.data['batch_no'] = element['batch_no']
                request.data['opening_balance'] = element['opening_balance']
                request.data['quantity_received'] = element['quantity_received']
                request.data['unit_price'] = element['unit_price']
                #request.data['brand'] = element['brand']
                #request.data['warranty_period'] = element['warranty_period']
                request.data['remarks'] = element['remarks']
                request.data['created_by'] = request.user.id
                #if(request.data['id'] is None or request.data['id'] <= 0):
                result = self.create(request, *args, **kwargs)

                item_in_hotel = inv_models.ItemStockInProperty.objects.filter(property=element['property'], item=element['item'])
                if item_in_hotel:
                    #item_in_hotel[0].opening_balance=element['opening_balance']
                    item_in_hotel[0].received=item_in_hotel[0].received + int(element['quantity_received'])
                    item_in_hotel[0].save()
                else:
                    item_in_hotel=inv_models.ItemStockInProperty.objects.create(
                        hotel=inv_models.prop.objects.get(id=element['property']),
                        item=conf_models.Item.objects.get(id=element['item']),
                        opening_balance=element['quantity_received'],
                        received=element['quantity_received']
                    )
                



        #request.data._mutable = False
        return self.get(request, *args, **kwargs)
    

class ReceivedItemBatches(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_models.ItemReceived.objects.all()
    serializer_class = serializers.ItemReceivedBatchesSerializer
    # pagination.PageNumberPagination.page_size = 2

    def get_queryset(self):
        print('What is this?')
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        hotel = self.request.query_params.get('property_id')

        queryset = inv_models.ItemReceived.objects.raw('''
            SELECT ROW_Number() over( order by batch_no) as id, count(*) as number_of_item, 
                batch_no
	        FROM public.operation_itemreceived where property_id=%s group by batch_no;
                ''', [property])
        return queryset

    # def list(self, request, *arg, **kwargs):

    #     return super().list(self, request, *arg, **kwargs)




class ReceivedItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_models.ItemReceived
    serializer_class = serializers.ItemReceivedSerializer