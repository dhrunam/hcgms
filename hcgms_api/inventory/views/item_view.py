from hcgms_api.inventory import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.inventory import serializers
from durin.auth import TokenAuthentication

class ItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Item.objects.all().order_by('id')
    serializer_class = serializers.ItemSerializer
    # pagination.PageNumberPagination.page_size = 100


class ItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Item
    serializer_class = serializers.ItemSerializer
# ===