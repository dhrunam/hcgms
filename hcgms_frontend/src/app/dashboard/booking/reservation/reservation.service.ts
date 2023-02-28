import { Injectable } from "@angular/core";
import { map, Subject, Subscription } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class ReservationService{
    selectedRooms = new Subject<any>();
    results = new Subject<any>();
    properties: any = [];
    searchRooms: any;
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
    search_rooms(checkin_date: Date, checkout_date: Date){
        this.subscription = this.http.search_rooms(checkin_date, checkout_date)
        .pipe(map(data => {return this.filtered_rooms(data);}))
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
    ngOnDestroy(): void{
        this.subscription.unsubscribe();
    }
    filtered_rooms(data: any){
        let room:any,
            property:any,
            rooms:any = [],
            main:any = [];
        this.getProperties().then((d:any) => {
            for(var i=0; i<d.length;i++){
                for(var j=0;j<data.length;j++){
                    if(d[i].id === data[j].property){
                        room = {
                            'room_id': data[j].id,
                            'room_rate': data[j].cost,
                            'room_no': data[j].room_no,
                            'room_category': data[j].related_category.name,
                        }
                        rooms.push(room)
                    }
                }
                property = {
                    'property_id': d[i].id,
                    'property_name': d[i].name,
                    'meta_rooms': rooms
                }
                main.push(property);
                rooms = [];
            }
        })
        return main;
    }
}