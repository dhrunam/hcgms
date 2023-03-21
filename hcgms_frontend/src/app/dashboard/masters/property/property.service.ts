import { Injectable } from "@angular/core";
import { delay } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({providedIn: 'root'})
export class PropertyService{
    constructor(private http: HttpService){}
    get_properties(){
        return this.http.get_properties().pipe(delay(300));
    }
    get_property(id:number){
        return this.http.get_property(id).pipe(delay(300));
    }
    add_property(data:any){
        return this.http.add_property(data).pipe(delay(400));
    }
    update_property(data:any){
        return this.http.update_property(data).pipe(delay(400));
    }
    delete_property(data:any){
        return this.http.update_property(data);
    }
}