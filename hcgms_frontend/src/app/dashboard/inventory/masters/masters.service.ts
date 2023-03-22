import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class MastersService{
    constructor(private http: HttpService) {}
    get_items(){
        return this.http.get_inventory_items()
    }
    get_item(id:number){
        return this.http.get_inventory_item(id);
    }
    add_item(fd:FormData){
        return this.http.add_inventory_item(fd);
    }
    update_item(fd:FormData){
        return this.http.update_inventory_item(fd);
    }
}