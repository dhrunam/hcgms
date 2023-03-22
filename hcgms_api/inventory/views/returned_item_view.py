from hcgms_api.configuration import models as conf_model
from hcgms_api.inventory import models as inv_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection

from hcgms_api.inventory import serializers
from durin.auth import TokenAuthentication

class ReturnedItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_model.ItemReturned.objects.all()
    serializer_class = serializers.ItemReturnedSerializer
    # pagination.PageNumberPagination.page_size = 2
    
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        print('hi')
        #request.data._mutable = True
        data = request.data['data']
        result=Response()
        if(data):
            for element in data:

                print(element)

                
                request.data['property'] = element['property']
                request.data['item'] = element['item']
                request.data['opening_balance'] = element['opening_balance']
                request.data['quantity_returned'] = element['quantity_returned']
                request.data['remarks'] = element['remarks']
                request.data['created_by'] = request.user.id

                result = self.create(request, *args, **kwargs)

                item_in_hotel = inv_model.ItemStockInProperty.objects.filter(property=element['property'], item=element['item'])
                    

                if item_in_hotel:
                    item_in_hotel[0].returned=item_in_hotel[0].returned + element['quantity_returned']
                    item_in_hotel[0].save()



        #request.data._mutable = False
        return self.get(request, *args, **kwargs)
    




class ReturnedItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_model.ItemReturned
    serializer_class = serializers.ItemReturnedSerializer