from django.db.models.query import QuerySet
from hcgms_api.configuration import models as conf_models
import datetime

class CostCalculator():
    def calculate_total_room_cost(self, rooms):
        print(type(rooms))
        total_cost=0
        if(isinstance(rooms, QuerySet) or isinstance(rooms, list)):

                for element in rooms:
                    print(element)
                    total_cost+=element.room_rate
                        
                print('Total Room Cost:', total_cost)
        
        if( isinstance(rooms, list)):

            for element in rooms:
                print(element)
                total_cost+=element['room_rate']
                    
            print('Total Room Cost:', total_cost)

        if(isinstance(rooms, dict) ):
                for element in rooms:
                    print(element)
                    total_cost+=element['room_rate']
                print('Total Room Cost:', total_cost)
        
        return total_cost
    
    def calculate_total_service_cost(self, services):

        total_cost=0
        if(isinstance(services, QuerySet) or isinstance(services, list)):
            for element in services:
                    print(element)
                    total_cost+=element.cost
            print('Total service Cost:', total_cost)
        if(isinstance(services, dict)):
            for element in services:
                    print(element)
                    total_cost+=element['cost']       
            print('Total service Cost:', total_cost)
        return total_cost

    def get_applicable_tax_details(self,cost):

                applicable_tax_details=conf_models.ApplicableTaxDetails.objects.filter(is_applicable=True,start_date__lte=datetime.datetime.today(),
                end_date__gte=datetime.datetime.today()).filter(lower_limit__lte=cost,upper_limit__gte=cost).last()
                
                result={'cgst_rate':0,'sgst_rate':0,'other_cess_rate':0}

                if applicable_tax_details:
                    result['cgst_rate']=applicable_tax_details.cgst_percentage
                    result['sgst_rate']=applicable_tax_details.sgst_percentage
                    result['other_cess_rate']=applicable_tax_details.service_tax_percentage

                return result
