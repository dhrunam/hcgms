import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({providedIn: 'root'})
export class RoomCategoryService{
    status: any;
    categories: any = [];
    category!: { id:number, name:string};
    constructor(private http: HttpService){}
    get_room_categories(){
        this.http.get_room_categories().subscribe({
            next: data => { this.categories = data;},
            error: err => console.log(err)
        })
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.categories);
                },200)
            }
        )
    }
    get_room_category(id:number){
        this.http.get_room_category(id).subscribe({
            next: data => { this.category = { id: data.id, name: data.name } },
            error: err => console.log(err)
        })
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.category);
                },200)
            }
        )
    }
    add_room_category(data: any){
        this.http.add_room_category(data).subscribe({
            next: data => { this.status = data },
            error: err => { this.status = err}
        })
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.status);
                },200)
            }
        )
    }
    update_room_category(data: any){
        this.http.update_room_category(data).subscribe({
            next: data => { this.status = data },
            error: err => { this.status = err}
        });
        return new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.status);
                },200)
            }
        )
    }
    delete_room_category(id:number){
        this.http.delete_room_category(id).subscribe({
            next: data => { this.get_room_categories() },
            error: err => console.log(err)
        })
    }
}