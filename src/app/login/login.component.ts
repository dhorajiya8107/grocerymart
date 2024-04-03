import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authForm: any;
  errMsg: string = "";
  hidePassword: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public router: Router, 
    public authService: AuthService,
    public snackBar: MatSnackBar
  ){}
// 3520B0s-
  ngOnInit(){
    this.authForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null,  Validators.required]
    })
  }

  displaySnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }


  OnFormSubmit(){
    if(!this.authForm.valid) return;
    this.authService.login(this.authForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.authForm.reset();
        this.router.navigate(['/home']);
        this.displaySnackBar("Login successful");
      },
      error: (errMsg) => {
        this.errMsg = errMsg;
        setTimeout(() => {
          this.errMsg = null;
        }, 3000); 
        console.log(errMsg);
      }
    })
  }
}
