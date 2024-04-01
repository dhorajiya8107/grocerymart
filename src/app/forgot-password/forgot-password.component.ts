import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: any;
  errMsg: string = "";
  Email: string;

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public authService: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    })
  }

  displaySnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
  }

  OnFormSubmit(){
    const { email } = this.forgotPasswordForm.value;
    if(email == null){
      return;
    }
    else{
      this.Email = email;
      this.authService.forgotPassword(this.Email).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/login']);
          this.displaySnackBar("Your Password has been reset successfully");
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

}
