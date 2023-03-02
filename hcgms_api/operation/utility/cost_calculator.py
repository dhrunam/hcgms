from django.db.models.query import QuerySet

class CostCalculator():
    def calculate_total_room_cost(self, rooms):
        print(type(rooms))
        total_cost=0
        if(isinstance(rooms, QuerySet) or isinstance(rooms, list)):

                for element in rooms:
                    print(element)
                    total_cost+=element.room_rate
                        
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