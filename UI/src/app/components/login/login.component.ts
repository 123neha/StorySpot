import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  model = new User();

  constructor(private router: Router,
    private userService: UserService,
    private toastr: ToastrService) {
  }

  login(): void {
    this.userService.login(this.model.email, this.model.password).subscribe(res => {
      if (res && res.success) {
        this.router.navigate(['home']);
      } else {
        this.toastr.error(res.message);
      }
    },
      err => {
        this.toastr.error('Some Error Occured while logging in. Please try again!');
      });
  }
}
