import datetime
from rest_framework import serializers
from hcgms_api.account import models as acc_model
from django.contrib.auth.models import (User, Group)
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction, connection
from hcgms_api.inventory import models
from hcgms_api.configuration import serializers as con_serializers
from hcgms_api.account import serializers as acc_serializers

from hcgms_api.configuration.serializers import(
     PropertySerializer,

)
from hcgms_api.account.serializers import (
    ResgisteredUserSerializer,
)


class ItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Item
        fields = [
                    'id',
                    'name',

        ]


class ItemReceivedSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)

    related_hotel = PropertySerializer(source='hotel', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model =models.ItemReceived

    # hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    # item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    # quantity_received=models.IntegerField(default=0)
    # created_by = models.ForeignKey(
    #  acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_received_created_by')
    # created_at = models.DateTimeField(auto_now=True, blank=False)

        fields = [
            'id',
            'property',
            'item',
            'batch_no',
            'opening_balance',
            'quantity_received',
            'unit_price',
            'remarks',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',


        ]

    # def create(self, validated_data):

    #     try:
    #         with transaction.atomic():

    #             item_received = op_models.ItemReceived.objects.create(
    #                 hotel=validated_data['hotel'],
    #                 item=validated_data['item'],
    #                 batch_no=validated_data['batch_no'],
    #                 opening_balance=validated_data['opening_balance'],
    #                 quantity_received=validated_data['quantity_received'],
    #                 unit_price=validated_data['unit_price'],
    #                 expiry_date=validated_data['expiry_date'],
    #                 remarks=validated_data['remarks'],
    #                 created_by=validated_data['created_by'],

    #             )

              

    #            item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                

    #             if item_in_hotel:
    #                 item_in_hotel[0].opening_balance=validated_data['opening_balance']
    #                 item_in_hotel[0].received=item_in_hotel[0].received + validated_data['quantity_received']
    #                 item_in_hotel[0].save()
    #             else:
    #                 item_in_hotel=op_models.ItemInHotel.objects.create(
    #                 hotel=validated_data['hotel'],
    #                 item=validated_data['item'],
    #                 opening_balance=validated_data['quantity_received'],
    #                 received=validated_data['quantity_received']
    #             )
    #             return item_received

    #             # return Response(serializers.data(), status=status.HTTP_200_OK)

    #     except TypeError:
    #         return TypeError("There is some error in processing your data.")

    def update(self, instance, validated_data):

        try:
            # with transaction.atomic():
                item_received = instance
                prev_quantity_received = item_received.quantity_received

                item_received.hotel = validated_data['property']
                item_received.item = validated_data['item']
                item_received.opening_balance = validated_data['opening_balance']
                item_received.quantity_received = validated_data['quantity_received']
                item_received.remarks = validated_data['remarks']
                item_received.created_by = validated_data['created_by']
                item_received.save()

                item_in_hotel = models.ItemStockInProperty.objects.filter(property=validated_data['property'], item=validated_data['item'])
                if item_in_hotel:
                    item_in_hotel[0].received=item_in_hotel[0].received - prev_quantity_received + validated_data['quantity_received']
                    item_in_hotel[0].save()

                return item_received

        except TypeError:
            return TypeError("There is some error in processing your data.")

class ItemReceivedBatchesSerializer(serializers.ModelSerializer):
    number_of_item = serializers.IntegerField(read_only=True)

    class Meta:
        model = models.ItemReceived

        fields = [
        'id',
        'number_of_item',
        'batch_no',

        ]

class ItemReturnedSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)

    related_hotel = PropertySerializer(source='property', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model = models.ItemReturned

        fields = [
            'id',
            'property',
            'item',
            'opening_balance',
            'quantity_returned',
            'remarks',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',

        ]
    
        # def create(self, validated_data):

        #     try:
        #         # with transaction.atomic():

        #             item_returned = op_models.ItemReturned.objects.create(
        #                 hotel=validated_data['hotel'],
        #                 item=validated_data['item'],
        #                 opening_balance=validated_data['opening_balance'],
        #                 quantity_returned=validated_data['quantity_returned'],
        #                 remarks=validated_data['remarks'],
        #                 created_by=validated_data['created_by'],

        #             )


        #             item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                    

        #             if item_in_hotel:
        #                 item_in_hotel[0].returned=item_in_hotel[0].returned + validated_data['quantity_returned']
        #                 item_in_hotel[0].save()

        #             # return item_returned

        #         # return Response(serializers.data(), status=status.HTTP_200_OK)

        #     except TypeError:
        #         return TypeError("There is some error in processing your data.")

        def update(self, instance, validated_data):

            try:
                with transaction.atomic():
                    item_returned = instance
                    prev_quantity_returned = item_returned.quantity_returned

                    item_returned.hotel = validated_data['property']
                    item_returned.item = validated_data['item']
                    item_returned.opening_balance = validated_data['opening_balance']
                    item_returned.quantity_returned = validated_data['quantity_returned']
                    item_returned.remarks = validated_data['remarks']
                    item_returned.created_by = validated_data['created_by']
                    item_returned.save()

                    item_in_hotel = models.ItemStockInProperty.objects.filter(property=validated_data['property'], item=validated_data['item'])
                    if item_in_hotel:
                        item_in_hotel[0].returned=item_in_hotel[0].returned - prev_quantity_returned + validated_data['quantity_returned']
                        item_in_hotel[0].save()

                    return item_returned

            except TypeError:
                return TypeError("There is some error in processing your data.")

class ItemDamagedSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)

    related_hotel = PropertySerializer(source='property', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model = models.ItemDamaged

    # hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    # item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    # quantity_received=models.IntegerField(default=0)
    # created_by = models.ForeignKey(
    #  acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_received_created_by')
    # created_at = models.DateTimeField(auto_now=True, blank=False)

        fields = [
            'id',
            'property',
            'item',
            'opening_balance',
            'quantity_damaged',
            'remarks',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',


        ]

        # def create(self, validated_data):

        #     try:
        #         with transaction.atomic():

        #             item_damaged = op_models.ItemDamaged.objects.create(
        #                 hotel=validated_data['hotel'],
        #                 item=validated_data['item'],
        #                 opening_balance=validated_data['opening_balance'],
        #                 quantity_damaged=validated_data['quantity_damaged'],
        #                 remarks=validated_data['remarks'],
        #                 created_by=validated_data['created_by'],

        #             )


        #             item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])

        #             if item_in_hotel:
        #                 item_in_hotel[0].damaged=item_in_hotel[0].returned + validated_data['quantity_damaged']
        #                 item_in_hotel[0].save()

        #             return item_damaged

        #     except TypeError:
        #         return TypeError("There is some error in processing your data.")
       
        def update(self, instance, validated_data):

            try:
                with transaction.atomic():
                    item_damaged = instance
                    prev_quantity_damaged = item_damaged.quantity_damaged

                    item_damaged.hotel = validated_data['property']
                    item_damaged.item = validated_data['item']
                    item_damaged.opening_balance = validated_data['opening_balance']
                    item_damaged.quantity_damaged = validated_data['quantity_damaged']
                    item_damaged.remarks = validated_data['remarks']
                    item_damaged.created_by = validated_data['created_by']
                    item_damaged.save()

                    item_in_hotel = models.ItemStockInProperty.objects.filter(property=validated_data['property'], item=validated_data['item'])
                    if item_in_hotel:
                        item_in_hotel[0].damaged=item_in_hotel[0].damaged - prev_quantity_damaged + validated_data['quantity_damaged']
                        item_in_hotel[0].save()

                    return item_damaged

            except TypeError:
                return TypeError("There is some error in processing your data.")

class ItemTransferredSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)
    related_acknowledged_by_user = ResgisteredUserSerializer(
        source='acknowledged_by', read_only=True)

    related_from_hotel = PropertySerializer(source='from_property', read_only=True)
    related_to_hotel = PropertySerializer(source='from_property', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model = models.ItemTransferred

#     from_hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL, related_name='from_hotel')
#     to_hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL, related_name='to_hotel')

#     from_department=models.ForeignKey(config_model.DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='from_department')
#     to_department=models.ForeignKey(config_model.DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='to_department')
   

        fields = [
            'id',
            'from_property',
            'to_property',
            'item',
            'opening_balance',
            'quantity_transferred',
            'remarks',
            'created_by',
            'created_at',
            'is_acknowledged',
            'related_from_hotel',
            'related_to_hotel',
            'related_item',
            'related_create_user',
            'related_acknowledged_by_user'


        ]

        # def create(self, validated_data):

        #     try:
        #         with transaction.atomic():

        #             item_transferred = op_models.ItemTransferred.objects.create(
        #                 from_hotel=validated_data['from_hotel'],
        #                 to_hotel=validated_data['to_hotel'],
        #                 from_department=validated_data['from_department'],
        #                 to_department=validated_data['to_department'],
        #                 item=validated_data['item'],
        #                 opening_balance=validated_data['opening_balance'],
        #                 quantity_transferred=validated_data['quantity_transferred'],
        #                 remarks=validated_data['remarks'],
        #                 created_by=validated_data['created_by'],
        #                 is_acknowledged=False
        #             )



        #             item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                    

        #             if item_in_hotel:
        #                 item_in_hotel[0].transferred=item_in_hotel[0].transferred + validated_data['quantity_transferred']
        #                 item_in_hotel[0].save()

        #             return item_transferred

        #         # return Response(serializers.data(), status=status.HTTP_200_OK)

        #     except TypeError:
        #         return TypeError("There is some error in processing your data.")

    
    
        def update(self, instance, validated_data):

            try:
                with transaction.atomic():
                    item_transferred = instance
                    prev_quantity_transferred = item_transferred.quantity_transferred 
                    item_transferred.from_hotel = validated_data['from_property']
                    item_transferred.to_hotel = validated_data['to_property']
                    item_transferred.item = validated_data['item']
                    item_transferred.opening_balance = validated_data['opening_balance']
                    item_transferred.quantity_transferred = validated_data['quantity_transferred']
                    item_transferred.remarks = validated_data['remarks']
                    item_transferred.created_by = validated_data['created_by']
                    item_transferred.is_acknowledged = validated_data['is_acknowledged']
                    item_transferred.save()

                    item_in_hotel = models.ItemStockInProperty.objects.filter(property=validated_data['property'], item=validated_data['item'])
                    if item_in_hotel:
                        item_in_hotel[0].transferred=item_in_hotel[0].transferred - prev_quantity_transferred + validated_data['quantity_transferred']
                        item_in_hotel[0].save()

                    return item_transferred

            except TypeError:
                return TypeError("There is some error in processing your data.")

class ItemStockInPropertySerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)
        
    related_hotel = PropertySerializer(source='property', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)

    class Meta:
        model = models.ItemStockInProperty

    # hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    # item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    # opening_balance=models.IntegerField(default=0)
    # received=models.IntegerField(default=0)
    # damaged=models.IntegerField(default=0)
    # returned=models.IntegerField(default=0)
    # transferred=models.IntegerField(default=0)
    # min_level=models.IntegerField(default=0)
    # max_level=models.IntegerField(default=0)

        fields = [
            'id',
            'property',
            'item',
            'opening_balance',
            'received',
            'damaged',
            'returned',
            'transferred',
            'min_level',
            'max_level',
            'related_hotel',
            'related_item',

        ]


