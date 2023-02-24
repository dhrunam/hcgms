from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.
class Property(models.Model):

    name=models.CharField(max_length=128,blank=False)
    short_name=models.CharField(max_length=4,blank=True)
    code=models.CharField(max_length=128,blank=False, unique=True)
    address=models.CharField(max_length=1024, blank=False)
    description=models.CharField(max_length=1024,blank=True, default='')


    def __str__(self) -> str:
        return super().__str__()


class RoomCategory(models.Model):

    name=models.CharField(max_length=128,blank=False)

    def __str__(self) -> str:
        return super().__str__()

class Room(models.Model):

    property=models.ForeignKey(Property, null=True, on_delete=models.SET_NULL)
    room_category=models.ForeignKey(RoomCategory, null=True, on_delete=models.SET_NULL)
    room_no=models.CharField(max_length=128,blank=False)
    occupancy=models.IntegerField(default=2)
    description= models.CharField(max_length=1024, blank=True, null=True)
    is_operational=models.BooleanField(default=True)

    class Meta:
        unique_together = [['property', 'room_no']]


    
    def __str__(self) -> str:
        return super().__str__()


class RoomRate(models.Model):

    property=models.ForeignKey(Property, null=True, on_delete=models.SET_NULL)
    room=models.ForeignKey(Room, null=True, on_delete=models.SET_NULL)
    cost=models.DecimalField(max_digits=8, decimal_places=2)
    start_date=models.DateField(auto_now=False, auto_now_add=False)
    end_date=models.DateField(auto_now=False, auto_now_add=False)

    def clean(self):
        print('I was calling..')
        super().clean()

        print('I was calling..')

        if self.start_date > self.end_date:
            raise ValidationError(
                'Start date cannot be greater than End date.'
            )

        existing_rows = RoomRate.objects.filter(
            start_date__lte=self.end_date,
            end_date__gte=self.start_date
        )

        if self.pk:
            existing_rows = existing_rows.exclude(pk=self.pk)

        if existing_rows.exists():
            raise ValidationError(
                'This date range overlaps with an existing row.'
            )
    
    def __str__(self) -> str:
        return super().__str__()