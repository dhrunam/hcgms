from hcgms_api.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.configuration import serializers
from durin.auth import TokenAuthentication

class RoomRateList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.RoomRate.objects.all()
    serializer_class = serializers.RoomRateSerializer
    # pagination.PageNumberPagination.page_size = 100


class RoomRateDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.RoomRate
    serializer_class = serializers.RoomRateSerializer
# ===