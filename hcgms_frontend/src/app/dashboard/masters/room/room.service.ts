import { Injectable } from "@angular/core";
import { delay } from "rxjs";
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
        return this.http.get_rooms().pipe(delay(300));
    }
    get_room(id:number){
        return this.http.get_room(id).pipe(delay(300));
    }
    add_room(fd: FormData){
        return this.http.add_room(fd).pipe(delay(300));
    }
    update_room(fd: FormData){
        return this.http.update_room(fd).pipe(delay(300));
    }
    room_is_operational(fd: FormData){
        return this.http.room_is_operational(fd);
    }
}