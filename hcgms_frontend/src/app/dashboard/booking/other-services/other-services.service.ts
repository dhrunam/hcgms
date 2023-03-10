import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({
  providedIn: 'root'
})
export class OtherServicesService {

    other_seervices: any = [];
    constructor(private http: HttpService){}
    
    get_other_services_reservations(){
        this.http.get_other_services_reservations().subscribe({
            next: data => { this.other_seervices = data },
            error: err => console.log(err),
        })
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.other_seervices);
                },200)
            }
        )
    }
    
    get_miscellaneous_service_of_reservation(id:number){
        this.http.get_misscellaneous_services_of_reservation(id)
        .subscribe({
            next: data => { this.other_seervices = data},
            error: err => console.log(err)
        })
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.other_seervices);
                },200)
            }
        )
    }
    
    on_miscellaneous_service_save(fd:any){
        this.http.on_misscellaneous_service_save(fd).subscribe({
            next: data =>  { this.other_seervices = data},
            error: err => console.log(err)
        })
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.other_seervices);
                },200)
            }
        )
    }
    on_miscellaneous_service_update(fd:any){
        this.http.on_misscellaneous_service_update(fd).subscribe({
            next: data => console.log(data),
            error: err => console.log(err)
        })
    }
}
