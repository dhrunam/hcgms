# Generated by Django 4.1.7 on 2023-02-24 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0004_rename_room_catgory_room_room_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='room_no',
            field=models.CharField(max_length=128),
        ),
        migrations.AlterUniqueTogether(
            name='room',
            unique_together={('property', 'room_no')},
        ),
    ]
