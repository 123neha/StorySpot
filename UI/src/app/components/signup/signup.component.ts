import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  model = new User;

  constructor(private router: Router,
    private userService: UserService,
    private toastr: ToastrService) { }

  signup(): void {
    this.userService.register(this.model).subscribe(res => {
      if (res && res.success) {
        this.toastr.success(res.message);
        this.router.navigate(['login']);
      } else {
        this.toastr.error(res.message);
      }
    },
      err => {

      });
  }

}
