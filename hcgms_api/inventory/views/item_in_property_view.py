from hcgms_api.configuration import models as conf_model
from hcgms_api.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.inventory import serializers
from durin.auth import TokenAuthentication
from hcgms_api.inventory import models as inv_models

class PropertyItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_models.ItemStockInProperty.objects.all()
    serializer_class = serializers.ItemStockInPropertySerializer
    # pagination.PageNumberPagination.page_size = 2
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """

        # order_number = self.request.data['order_no']
        queryset=inv_models.ItemStockInProperty.objects.all()
        property_id = self.request.query_params.get('property_id')
        item_id = self.request.query_params.get('item_id')

        if(property_id):
            queryset = inv_models.ItemStockInProperty.objects.filter(property=property_id)
        if(item_id):
            queryset = inv_models.ItemStockInProperty.objects.filter(item=item_id)

        return queryset

class PropertyItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = inv_models.ItemStockInProperty
    serializer_class = serializers.ItemStockInPropertySerializer