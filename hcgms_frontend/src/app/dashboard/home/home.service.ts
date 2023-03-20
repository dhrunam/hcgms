import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class HomeService{
    totalCount: number = 0;
    checkinCount: number = 0;
    checkoutCount: number = 0;
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
        return this.http.get_checkin_reservations(checkin_date).pipe(map(resp => { this.checkinCount = resp.length; return resp.length } ) );
    }
    getCheckoutCount(checkout_date: string){
        return this.http.get_checkout_reservations(checkout_date).pipe(map(resp => { this.checkoutCount = resp.length; return resp.length } ) );
    }
    getTotalCheckInOutCount(){
        return this.checkinCount+this.checkoutCount;
    }
}