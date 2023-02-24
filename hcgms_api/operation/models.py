from django.db import models
from hcgms_api.configuration import models as conf_models
from django.contrib.auth.models import User
# Create your models here.
class ReservationDetails(models.Model):

    property=models.ForeignKey(conf_models.Property, null=True, on_delete=models.SET_NULL)
    reservation_no=models.CharField(max_length=128,blank=False)
    lead_guest_name=models.CharField(max_length=128, blank=True)
    reservation_for=models.CharField(max_length=128, blank=False)
    reservation_from=models.CharField(max_length=128, blank=False)
    address=models.CharField(max_length=1024, blank=False)
    contact_no=models.CharField(max_length=12,blank=True, null=True)
    remarks=models.CharField(max_length=1024,blank=True, null=True)
    checkin_date=models.DateField(auto_now=False, auto_now_add=False)
    checkout_date=models.DateField(auto_now=False, auto_now_add=False)
    created_by=models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='reservation_by_user')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return super().__str__()


class ReservationRoomDetails(models.Model): 
    reservation=models.ForeignKey(ReservationDetails, null=True, on_delete=models.SET_NULL)
    property=models.ForeignKey(conf_models.Property, null=True, on_delete=models.SET_NULL)
    room=models.ForeignKey(conf_models.Room, null=True, on_delete=models.SET_NULL)
    room_rate=models.DecimalField(max_digits=8, decimal_places=2)
    checkin_date=models.DateField(auto_now=False, auto_now_add=False)
    checkout_date=models.DateField(auto_now=False, auto_now_add=False)


    def __str__(self) -> str:
        return super().__str__()

        