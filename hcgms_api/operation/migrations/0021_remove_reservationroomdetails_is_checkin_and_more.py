# Generated by Django 4.1.7 on 2023-03-03 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operation', '0020_reservationroomdetails_is_checkin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservationroomdetails',
            name='is_checkin',
        ),
        migrations.AddField(
            model_name='reservationdetails',
            name='status',
            field=models.CharField(default='booked', max_length=10),
        ),
        migrations.AddField(
            model_name='reservationroomdetails',
            name='status',
            field=models.CharField(default='booked', max_length=10),
        ),
    ]
