import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class ReportingService{
    constructor(private http: HttpService){}
    getDetails(checkin_date:string, checkout_date:string){
        return this.http.get_report(checkin_date, checkout_date);
    }
}