# Generated by Django 4.1.7 on 2023-02-28 05:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0008_property_is_operational_alter_room_property_and_more'),
        ('operation', '0004_alter_reservationdetails_reservation_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservationroomdetails',
            name='property',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reservation_room_details', to='configuration.property'),
        ),
        migrations.AlterField(
            model_name='reservationroomdetails',
            name='reservation',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reservation_room_details', to='operation.reservationdetails'),
        ),
        migrations.AlterField(
            model_name='reservationroomdetails',
            name='room',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reservation_room_details', to='configuration.room'),
        ),
    ]
