import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({providedIn: 'root'})
export class RoomRateService{
    properties: any = [];
    rooms: any = [];
    room_rates: any = [];
    room_rate!: { id:number, cost: number, start_date: string, end_date: string, property: string, room: string};
    private subscription!: Subscription;
    constructor(private http: HttpService){}
    get_properties(){
        this.subscription = this.http.get_properties().subscribe({
            next: data => { this.properties = data },
            error: err => console.log(err)
        })
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.properties);
                }, 200);
            }
        )
    }
    get_rooms(){
        this.subscription = this.http.get_rooms().subscribe({
            next: data => { this.rooms = data },
            error: err => console.log(err)
        })
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.rooms);
                }, 200);
            }
        )
    }
    get_room_rates(){
        this.subscription = this.http.get_room_rates().subscribe({
            next: data => { this.room_rates = data; },
            error: err => console.log(err)
        });
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.room_rates);
                }, 200);
            }
        )
    }
    get_room_rate(id:number){
        this.subscription = this.http.get_room_rate(id).subscribe({
            next: data => { this.room_rate = { id: data.id, cost: data.cost, start_date: data.start_date, end_date: data.end_date, property: data.property, room: data.room } },
            error: err => console.log(err),
        });
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.room_rate);
                }, 200)
            }
        )
    }
    add_room_rate(data:any){
        this.subscription = this.http.add_room_rate(data).subscribe({
            next: data => { return true},
            error: err => console.log(err),
        })
    }
    update_room_rate(data:any){
        this.subscription = this.http.update_room_rate(data).subscribe({
            next: data => { return true },
            error: err => console.log(err),
        })
    }
    delete_room_rate(id:number){
        this.subscription = this.http.delete_room_rate(id).subscribe({
            next: data => { this.get_room_rates() },
            error: err => console.log(err),
        })
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}