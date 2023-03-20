import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({providedIn: 'root'})
export class RoomRateService{
    status:any;
    properties: any = [];
    rooms: any = [];
    room_rates: any = [];
    room_rate!: { id:number, cost: number, start_date: string, end_date: string, property: string, room: string, property_name: string, room_no:string};
    constructor(private http: HttpService){}
    get_properties(){
        this.http.get_properties().subscribe({
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
    get_rooms(property_id: number){
        this.http.get_property_room(property_id).subscribe({
            next: data => { this.rooms = data},
            error: err => console.log()
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
        this.http.get_room_rates().subscribe({
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
        this.http.get_room_rate(id).subscribe({
            next: data => { this.room_rate = { id: data.id, cost: data.cost, start_date: data.start_date, end_date: data.end_date, property: data.property, room: data.room, property_name: data.related_property.name, room_no: data.related_room.room_no } },
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
        this.http.add_room_rate(data).subscribe({
            next: data => { this.status = data },
            error: err => { this.status = err },
        });
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.status);
                },200);
            }
        )
    }
    update_room_rate(data:any){
        this.http.update_room_rate(data).subscribe({
            next: data => { this.status = data },
            error: err => { this.status = err; console.log(err) },
        });
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.status);
                },200);
            }
        )
    }
    delete_room_rate(id:number){
        this.http.delete_room_rate(id).subscribe({
            next: data => { this.get_room_rates() },
            error: err => console.log(err),
        })
    }
}