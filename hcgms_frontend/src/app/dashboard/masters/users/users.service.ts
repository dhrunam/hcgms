import { Injectable } from "@angular/core";
import { delay } from "rxjs";
import { HttpService } from "src/app/services/http-service/http.service";
@Injectable({providedIn: 'root'})
export class UserService{
    constructor(private http: HttpService){}
    get_roles(){
        return this.http.get_roles()
    }
    get_properties(){
        return this.http.get_properties()
    }
    get_users(){
        return this.http.get_users().pipe(delay(300))
    }
    get_user(id: number){
        return this.http.get_user(id).pipe(delay(300))
    }
    add_user(fd:FormData){
        return this.http.add_user(fd).pipe(delay(300))
    }
    update_user(fd:FormData){
        return this.http.update_user(fd).pipe(delay(300))
    }
    delete_user(id:number){
        return this.http.delete_user(id)
    }
    change_user_password(fd:FormData){
        return this.http.change_user_password(fd)
    }
}