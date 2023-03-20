import { Injectable } from "@angular/core";
import { delay, Subject } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class ReservationService{
    acknowledgement = new Subject<any>();
    roomDetails = new Subject<{property: number, checkin_date: Date, checkout_date: Date, rooms: any}>();
    results = new Subject<{data: any, checkin_date: Date, checkout_date: Date, property: number, days: number}>();
    room_detail:any = [];
    constructor(private http: HttpService){}
    getProperties(){
        return this.http.get_properties()
    }
    search_rooms(checkin_date: Date, checkout_date: Date, property: number){
        return this.http.search_rooms(checkin_date, checkout_date, property).pipe(delay(300));
    }
    confirm_reservation(fd:any){
        return this.http.confirm_reservation(fd)
    }
}