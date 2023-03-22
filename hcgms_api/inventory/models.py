from django.conf import settings
from django.db import models
from hcgms_api.configuration import models as conf_models
from django.contrib.auth.models import User
# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=128, blank=False, unique=True)
    def __str__(self) -> str:
        return super().__str__()


class ItemInStock(models.Model):
    item = models.ForeignKey(Item, null = True, on_delete=models.SET_NULL, related_name='item_in_stock')
    property = models.ForeignKey(conf_models.Property, null=True, on_delete=models.SET_NULL, related_name='item_in_stock')
    batch_no = models.CharField(max_length = 12, default = '', blank = True)
    quantity_received = models.IntegerField(default = 0)
    date_of_received = models.DateField()
    created_by = models.ForeignKey(
    User, on_delete = models.SET_NULL, null = True, related_name='item_in_stock')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

