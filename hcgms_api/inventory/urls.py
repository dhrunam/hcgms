
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from durin import views as durin_views
from hcgms_api.inventory import views

urlpatterns = [
    path('api/inventory/item', views.ItemList.as_view()),
    path('api/inventory/item/<int:pk>', views.ItemDetails.as_view()),
    path('api/inventory/item/stock', views.ItemInStockList.as_view()),
    path('api/inventory/item/stock<int:pk>', views.ItemInStockDetails.as_view()),
    
]


