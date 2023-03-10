import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class CancelService{
    status: any;
    checkin_list: any = [];
    constructor(private http: HttpService){}
    get_checkin_reservations(checkin_date:string){
        this.http.get_checkin_reservations(checkin_date).subscribe({
            next: data => { this.checkin_list = data },
            error: err => console.log(err),
        })
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.checkin_list);
                },200)
            }
        )
    }
    on_cancellation(data:any){
        this.http.on_cancel_booking(data).subscribe({
            next: data => { return true },
            error: err => console.log(err)
        })
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(true);
                },200)
            }
        )
    }
}