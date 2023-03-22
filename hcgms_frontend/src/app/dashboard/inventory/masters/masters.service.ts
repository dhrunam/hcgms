import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http-service/http.service";

@Injectable({providedIn: 'root'})
export class MastersService{
    constructor(private http: HttpService) {}
    get_items(){

    }
    get_item(id:number){
        
    }
    add_item(){

    }
    update_item(){

    }
}