# Generated by Django 4.1.7 on 2023-02-24 05:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0003_property_short_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='room_catgory',
            new_name='room_category',
        ),
    ]
