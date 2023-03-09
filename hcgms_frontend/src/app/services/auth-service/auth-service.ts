import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../http-service/http.service";
import { LocalStorageService } from "../local-storage-service/local-storage.service";

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpService, private localStorage: LocalStorageService, private router: Router, private route: ActivatedRoute){}
    login(data:any){
        this.http.login(data).subscribe({
            next: data => {
                this.localStorage.saveToken(data.token);
                this.localStorage.saveData(JSON.stringify(data.user));
                this.router.navigate(['/dashboard'], {relativeTo: this.route});
            },
            error: err => {
                if(err.error.non_field_errors){
                    alert('Error !! User has entered incorrect credentials');
                }
            },
        })
    }
    logout(){
        this.http.logout().subscribe({
            next: data => {
                this.localStorage.clearSession();
                window.location.href = '/';
            },
            error: err => console.log(err),
        })
    }
}