import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
//import { AlertService } from 'ngx-alerts';
//import { ToastModule } from 'ng2-toastr/ng2-toastr';
//import { BrowserAnimationsModule } from '@angular/platform-browser-dynamic/'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;


  constructor(private validateService: ValidateService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      //this.flashMessage.show('Please fill in fields', {cssClass: 'alert-danger', timeout: 3000});
      //this.alertService.warning('asdasdasd');
      return false;
    }

    // Required Fields
    if (!this.validateService.validateEmail(user.email)) {
      //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      //this.alertService.warning('asdasdasd');
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        console.log('successful registration');
        this.router.navigate(['/login']);
      } else {
        console.log('registration fail');
        this.router.navigate(['/register']);
      }
    });
  }
}
