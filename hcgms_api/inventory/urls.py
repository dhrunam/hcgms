
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from durin import views as durin_views
from hcgms_api.inventory import views

urlpatterns = [
    path('api/inventory/item', views.ItemList.as_view()),
    path('api/inventory/item/<int:pk>', views.ItemDetails.as_view()),

    path('api/inventory/item/receive', views.ReceivedItemList.as_view()),
    path('api/inventory/item/receive/<int:pk>', views.ReceivedItemDetails.as_view()),

    path('api/inventory/property/item', views.PropertyItemList.as_view()),
    path('api/inventory/property/item/<int:pk>', views.PropertyItemDetails.as_view()),

    path('api/inventory/property/item/damage', views.DamagedItemList.as_view()),
    path('api/inventory/property/item/damage<int:pk>', views.DamagedItemDetails.as_view()),

    path('api/inventory/property/item/return', views.ReturnedItemList.as_view()),
    path('api/inventory/property/item/return<int:pk>', views.ReturnedItemDetails.as_view()),

    path('api/inventory/property/item/transfer', views.TransferredItemList.as_view()),
    path('api/inventory/property/item/transfer<int:pk>', views.TransferredItemDetails.as_view()),

]



