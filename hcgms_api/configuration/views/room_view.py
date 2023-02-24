from hcgms_api.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hcgms_api.configuration import serializers
from durin.auth import TokenAuthentication

class RoomList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
    # pagination.PageNumberPagination.page_size = 100


class RoomDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Room
    serializer_class = serializers.RoomSerializer
# ===