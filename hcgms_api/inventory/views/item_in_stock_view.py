from hcgms_api.inventory import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.inventory import serializers
from durin.auth import TokenAuthentication

class ItemInStockList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.ItemInStock.objects.all().order_by('id')
    serializer_class = serializers.ItemInstockSerializer
    # pagination.PageNumberPagination.page_size = 100

    def post(self, request, *args, **kwargs):

        request.data._mutable = True

        request.data['created_by'] = request.user.id

        item_in_stock = self.create(request, *args, **kwargs)


        request.data._mutable = False
        return self.get(request, *args, **kwargs)
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        queryset =  models.ItemInStock.objects.all()
        # order_number = self.request.data['order_no']
        search_text = self.request.query_params.get('property')
        if(search_text):
            queryset= models.ItemInStock.objects.filter(property=search_text)
        else:
            queryset= models.ItemInStock.objects.all()
        
        if self.request.method == "POST":
            pk_id=self.request.data['id']
            if(id):
                queryset= queryset.filter(id=pk_id)

        return queryset



class ItemInStockDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.ItemInStock
    serializer_class = serializers.ItemInstockSerializer
# ===