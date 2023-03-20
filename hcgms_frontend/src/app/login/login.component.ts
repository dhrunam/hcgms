import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService,private router: Router, private route: ActivatedRoute){}

  onLogin(data: any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('username', data.value.username);
      fd.append('password', data.value.password);
      fd.append('client', 'web');
      this.authService.login(fd).subscribe({
        next: data => {
            this.router.navigate(['/dashboard'], {relativeTo: this.route});
        },
        error: err => {
            if(err.error.non_field_errors){
                alert('Error !! User has entered incorrect credentials');
            }
        },
      });
      data.reset();
    }
  }
}
