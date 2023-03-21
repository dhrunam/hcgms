import { Injectable } from "@angular/core";
import { delay, Subscription } from "rxjs";
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
        return this.http.get_room_rates().pipe(delay(300));
    }
    get_room_rate(id:number){
        return this.http.get_room_rate(id).pipe(delay(300));
    }
    add_room_rate(fd:FormData){
        return this.http.add_room_rate(fd).pipe(delay(300));
    }
    update_room_rate(fd:FormData){
        return this.http.update_room_rate(fd).pipe(delay(300));
    }
    delete_room_rate(id:number){
        return this.http.delete_room_rate(id)
    }
}