from hcgms_api.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.configuration import serializers
from durin.auth import TokenAuthentication

class PropertyList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Property.objects.all()
    serializer_class = serializers.PropertySerializer
    # pagination.PageNumberPagination.page_size = 100


class PropertyDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Property
    serializer_class = serializers.PropertySerializer
# ===