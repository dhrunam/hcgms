import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({providedIn: 'root'})
export class RoomRateService{
    constructor(private http: HttpService){}
    get_properties(){
        return this.http.get_properties()
    }
    get_rooms(property_id: number){
        return this.http.get_property_room(property_id)
    }
    get_room_rates(){
        return this.http.get_room_rates()
    }
    get_room_rate(id:number){
        return this.http.get_room_rate(id)
    }
    add_room_rate(fd:FormData){
        return this.http.add_room_rate(fd)
    }
    update_room_rate(fd:FormData){
        return this.http.update_room_rate(fd)
    }
    delete_room_rate(id:number){
        return this.http.delete_room_rate(id)
    }
}