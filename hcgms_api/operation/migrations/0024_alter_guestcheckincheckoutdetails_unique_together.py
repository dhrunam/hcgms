# Generated by Django 4.1.7 on 2023-04-05 07:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0009_applicabletaxdetails'),
        ('operation', '0023_alter_reservationdetails_status_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='guestcheckincheckoutdetails',
            unique_together={('reservation', 'room')},
        ),
    ]
