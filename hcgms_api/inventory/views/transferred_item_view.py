from hcgms_api.configuration import models as conf_model
from hcgms_api.inventory import models as inv_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection


from hcgms_api.inventory import serializers
from durin.auth import TokenAuthentication

class TransferredItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_model.ItemTransferred.objects.all()
    serializer_class = serializers.ItemTransferredSerializer
    # pagination.PageNumberPagination.page_size = 2

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        print('hi')
        #request.data._mutable = True
        data = request.data['data']
        result = Response()
        if(data):
            for element in data:


                request.data['from_hotel'] = element['from_hotel']
                request.data['to_hotel'] = element['to_hotel']

                request.data['item'] = element['item']
                request.data['opening_balance'] = element['opening_balance']
                request.data['quantity_transferred'] = element['quantity_transferred']
                request.data['remarks'] = element['remarks']
                request.data['created_by'] = request.user.id
                request.data['is_acknowledged'] = False

                result = self.create(request, *args, **kwargs)

                item_in_from_hotel = inv_model.ItemStockInProperty.objects.filter(property=element['from_hotel'], item=element['item'])
                    

                if item_in_from_hotel and element['from_hotel']!=element['to_hotel']:
                    item_in_from_hotel[0].transferred=item_in_from_hotel[0].transferred + element['quantity_transferred']
                    item_in_from_hotel[0].save()

                item_in_to_hotel = inv_model.ItemStockInProperty.objects.filter(property=element['to_hotel'], item=element['item'])
               
                if item_in_to_hotel and element['from_hotel']!=element['to_hotel']:
                    item_in_to_hotel[0].received=item_in_to_hotel[0].received + element['quantity_transferred']
                    item_in_to_hotel[0].save()


        #request.data._mutable = False
        return self.get(request, *args, **kwargs)
    



class TransferredItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_model.ItemTransferred
    serializer_class = serializers.ItemTransferredSerializer