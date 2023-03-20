import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({providedIn: 'root'})
export class RoomService{
    constructor(private http: HttpService) {}
    get_properties(){
        return this.http.get_properties();
    }
    get_room_categories(){
        return this.http.get_room_categories();
    }
    get_rooms(){
        return this.http.get_rooms();
    }
    get_room(id:number){
        return this.http.get_room(id);
    }
    add_room(fd: FormData){
        return this.http.add_room(fd);
    }
    update_room(fd: FormData){
        return this.http.update_room(fd);
    }
    room_is_operational(fd: FormData){
        return this.http.room_is_operational(fd);
    }
}