import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class HomeService{
    constructor(private http: HttpService){}
    getPropertiesCount(){
        return this.http.get_properties().pipe(map(resp => { return resp.length } ) );
    }
    getRoomsCount(){
        return this.http.get_rooms().pipe(map(resp => { return resp.length } ) );
    }
    getBookingsCount(){
        return this.http.get_reservations().pipe(map(resp => { return resp.length } ) );
    }
    getCheckinCount(checkin_date: string){
        return this.http.get_checkin_reservations(checkin_date).pipe(map(resp => { return resp.length } ) );
    }
    getCheckoutCount(checkout_date: string){
        return this.http.get_checkout_reservations(checkout_date).pipe(map(resp => { return resp.length } ) );
    }
    getTotalCheckInOutCount(date:string){
        return this.http.get_checkin_checkout(date).pipe(map(resp => { return resp.length } ) );
    }
}