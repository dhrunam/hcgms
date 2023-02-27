
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from durin import views as durin_views
from hcgms_api.operation import views

urlpatterns = [
    path('api/reservation', views.ReservationDetailsList.as_view()),
    path('api/reservation/<int:pk>', views.ReservationDetailsDetails.as_view()),

    # path('api/room/category', views.RoomCategoryList.as_view()),
    # path('api/room/category/<int:pk>', views.RoomCategoryDetails.as_view()),

    # path('api/room', views.RoomList.as_view()),
    # path('api/room/<int:pk>', views.RoomDetails.as_view()),

    # path('api/room/rate', views.RoomRateList.as_view()),
    # path('api/room/rate/<int:pk>', views.RoomRateDetails.as_view()),
]


