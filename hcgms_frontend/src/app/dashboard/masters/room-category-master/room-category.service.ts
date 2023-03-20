import { Injectable } from "@angular/core";
import { delay } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({providedIn: 'root'})
export class RoomCategoryService{
    constructor(private http: HttpService){}
    get_room_categories(){
        return this.http.get_room_categories().pipe(delay(300))
    }
    get_room_category(id:number){
        return this.http.get_room_category(id).pipe(delay(300))
    }
    add_room_category(data: FormData){
        return this.http.add_room_category(data).pipe(delay(300))
    }
    update_room_category(data: FormData){
        return this.http.update_room_category(data).pipe(delay(300))
    }
    delete_room_category(id:number){
        return this.http.delete_room_category(id)
    }
}