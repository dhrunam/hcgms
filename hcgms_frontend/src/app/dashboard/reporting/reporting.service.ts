import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class ReportingService{
    details: any;
    constructor(private http: HttpService){}
    getDetails(checkin_date:string, checkout_date:string){
        this.http.get_report(checkin_date, checkout_date).subscribe({
            next: data => { this.details = data },
            error: err => { this.details = err }
        });
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.details);
                }, 200)
            }
        )
    }
}