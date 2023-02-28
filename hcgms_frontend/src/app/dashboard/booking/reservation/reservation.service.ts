import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class ReservationService{
    roomDetails = new Subject<any>();
    results = new Subject<{data: any, checkin_date: Date, checkout_date: Date, property: number}>();
    properties: any = [];
    searchRooms: any;
    room_detail:any = [];
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
    search_rooms(checkin_date: Date, checkout_date: Date, property: number){
        this.subscription = this.http.search_rooms(checkin_date, checkout_date, property)
        .subscribe({
            next: data => { this.searchRooms = data },
            error: err => console.log(err)
        });
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.searchRooms);
                }, 200);
            }
        )
    }
    room_details(){
        this.subscription = this.roomDetails.subscribe({
            next: data => { this.room_detail = data},
            error: err =>  console.log(err),
        })
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.room_detail);
                }, 200);
            }
        )
    }
    confirm_reservation(fd:any){
        this.subscription = this.http.confirm_reservation(fd).subscribe({
            next: data => { return true },
            error: err => console.log(err)
        })
    }
    ngOnDestroy(): void{
        this.subscription.unsubscribe();
    }
}