
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from durin import views as durin_views
from hcgms_api.operation import views

urlpatterns = [
    path('api/reservation', views.ReservationDetailsList.as_view()),
    path('api/reservation/<int:pk>', views.ReservationDetailsDetails.as_view()),

    path('api/room/search/v1', views.RoomSearchList.as_view()),
    path('api/room/search/v2', views.RoomSearchGroupByProperty.as_view()),

    path('api/room/checkin', views.GuestCheckInCheckOutDetailsList.as_view()),
    path('api/room/checkout', views.GuestCheckOutDetailsList.as_view()),
    path('api/room/noshow', views.GuesNoShowDetailsList.as_view()),



    path('api/reservation/miscellaneous/charge', views.MiscellaneousServiceChargeList.as_view()),
    path('api/reservation/miscellaneous/charge/<int:pk>', views.MiscellaneousServiceChargeDetails.as_view()),
    
    
    path('api/reservation/bill', views.ReservationBillList.as_view()),
    path('api/reservation/bill/<int:pk>', views.ReservationBillDetails.as_view()),
    path('api/reservation/bill/view', views.ReservationBillListForView.as_view()),
  

    path('api/reservation/report', views.ReservationDetailsListForReporting.as_view()),


    # api/reservation/report/ci_co?date_of_the_day=2023-02-24
    path('api/reservation/report/ci_co', views.ReservationDetailsListForReportingCheckInCheckOut.as_view()),


]


