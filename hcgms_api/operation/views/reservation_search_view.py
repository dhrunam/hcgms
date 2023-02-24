from hcgms_api.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.configuration import serializers
from durin.auth import TokenAuthentication

class RoomSearchList(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.RoomRate.objects.all()
    serializer_class = serializers.RoomRateSerializer
    # pagination.PageNumberPagination.page_size = 100
    
# ===