import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { HttpService } from "../http-service/http.service";
import { LocalStorageService } from "../local-storage-service/local-storage.service";

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpService, private localStorage: LocalStorageService){}
    login(data:any){
        return this.http.login(data).pipe(
            tap(resp => {
                this.localStorage.saveToken(resp.token);
                this.localStorage.saveData(JSON.stringify(resp.user));
            })
        )
    }
    logout(){
        return this.http.logout().pipe(tap(() => this.localStorage.clearSession()));
    }
}