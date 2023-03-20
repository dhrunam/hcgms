import { Injectable } from "@angular/core";
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
        return this.http.get_users()
    }
    get_user(id: number){
        return this.http.get_user(id)
    }
    add_user(fd:FormData){
        return this.http.add_user(fd)
    }
    update_user(fd:FormData){
        return this.http.update_user(fd)
    }
    delete_user(id:number){
        return this.http.delete_user(id)
    }
    change_user_password(fd:FormData){
        return this.http.change_user_password(fd)
    }
}