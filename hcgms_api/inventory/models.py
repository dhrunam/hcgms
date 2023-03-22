from django.conf import settings
from django.db import models
from hcgms_api.configuration import models as conf_models
from django.contrib.auth.models import User
# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=128, blank=False, unique=True)
    def __str__(self) -> str:
        return super().__str__()


class ItemReceived(models.Model):
    property=models.ForeignKey(conf_models.Property,null=True, on_delete=models.SET_NULL, related_name='item_received')
    item=models.ForeignKey(Item, null=True, on_delete=models.SET_NULL, related_name='item_received')
    batch_no=models.CharField(max_length=128, null=False)
    opening_balance=models.IntegerField(default=0)
    quantity_received=models.IntegerField(default=0)
    unit_price=models.DecimalField(default=0, decimal_places=2, max_digits=10)
    # expiry_date=models.DateField(auto_now=False, auto_now_add=False,blank=True, null=True)
    remarks=models.CharField(max_length=1024, default='', null=True)
    created_by = models.ForeignKey(
     User, null=True, on_delete=models.SET_NULL, related_name='item_received')
    created_at = models.DateTimeField(auto_now=True, blank=False)

class ItemReturned(models.Model):
    property=models.ForeignKey(conf_models.Property,null=True, on_delete=models.SET_NULL,related_name='item_returned')
    item=models.ForeignKey(Item, null=True, on_delete=models.SET_NULL, related_name='item_returned')
    opening_balance=models.IntegerField(default=0)
    quantity_returned=models.IntegerField(default=0)
    remarks=models.CharField(max_length=1024, default='', null=True)
    created_by = models.ForeignKey(
     User, null=True, on_delete=models.SET_NULL, related_name='item_returned')
    created_at = models.DateTimeField(auto_now=True, blank=False)

class ItemDamaged(models.Model):
    property=models.ForeignKey(conf_models.Property,null=True, on_delete=models.SET_NULL, related_name='item_damaged')
    item=models.ForeignKey(Item, null=True, on_delete=models.SET_NULL, related_name='item_damaged')
    opening_balance=models.IntegerField(default=0)
    quantity_damaged=models.IntegerField(default=0)
    remarks=models.CharField(max_length=1024, default='', null=True)
    created_by = models.ForeignKey(
     User, null=True, on_delete=models.SET_NULL, related_name='item_damaged')
    created_at = models.DateTimeField(auto_now=True, blank=False)

class ItemTransferred(models.Model):
    from_property=models.ForeignKey(conf_models.Property,null=True, on_delete=models.SET_NULL, related_name='item_transferred_from')
    to_property=models.ForeignKey(conf_models.Property,null=True, on_delete=models.SET_NULL, related_name='item_transferred_to')

    item=models.ForeignKey(Item, null=True, on_delete=models.SET_NULL)
    opening_balance=models.IntegerField(default=0)
    quantity_transferred=models.IntegerField(default=0)
    remarks=models.CharField(max_length=1024, default='', null=True)
    created_by = models.ForeignKey(
     User, null=True, on_delete=models.SET_NULL, related_name='item_transferred_by')
    created_at = models.DateTimeField(auto_now=True, blank=False)

    is_acknowledged = models.BooleanField(default=False, null=False)
    acknowledged_by=models.ForeignKey(
     User, null=True, on_delete=models.SET_NULL, related_name='item_ack_by')

# Items in Hotel
class ItemStockInProperty(models.Model):
    property=models.ForeignKey(conf_models.Property,null=True, on_delete=models.SET_NULL , related_name='item_in_property')
    item=models.ForeignKey(Item, null=True, on_delete=models.SET_NULL, related_name='item_in_property')
    opening_balance=models.IntegerField(default=0)
    received=models.IntegerField(default=0)
    damaged=models.IntegerField(default=0)
    returned=models.IntegerField(default=0)
    transferred=models.IntegerField(default=0)
    min_level=models.IntegerField(default=0)
    max_level=models.IntegerField(default=0)


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["property", "item"],
                name="unique_item_of_property",
            ),
        ]
    


