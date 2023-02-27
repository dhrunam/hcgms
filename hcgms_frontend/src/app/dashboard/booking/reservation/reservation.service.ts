import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class ReservationService{
    selectedRooms = new Subject<any>();
    properties: any = [];
    private subscription!: Subscription;
    constructor(private http: HttpService){}

    getProperties(){
        this.subscription = this.http.get_properties().subscribe({
            next: data => this.properties = data,
            error: err => console.log(err),
        });
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.properties);
                },200)
            }
        )
    }
    ngOnDestroy(): void{
        this.subscription.unsubscribe();
    }
}