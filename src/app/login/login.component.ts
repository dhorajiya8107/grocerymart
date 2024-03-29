import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authForm: any;
  isLoginMode: Boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public router: Router, 
  ){}
  
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    const usernameControl = this.authForm.get('username');
    if (!this.isLoginMode) {
      usernameControl.setValidators(Validators.required);
    } else {
      usernameControl.clearValidators();
    }
    usernameControl.updateValueAndValidity();
    this.authForm.reset();
  }

  ngOnInit(){
    this.authForm = this.formBuilder.group({
      username: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null,  Validators.required]
    })
  }

  OnFormSubmit(){
    const { username, email, password } = this.authForm.value;
    
    if(this.isLoginMode){
      if(email == null || password == null){
        return;
      }
      else{
        console.log(email, password);  
        this.authForm.reset();
        this.router.navigate(['/home']);
      }
    }
    else{
      if(username == null || email == null ||  password == null){
        return;
      }
      else{
        const data= { UserName: username,Email: email, Password: password, returnSecureToken: true };
        this.http.post('http://192.168.1.25:8010/Api/PDMS/RegisterNewUser', data).subscribe((res) => {
          console.log("res",res);
        })
        console.log(username, email, password);  
        this.isLoginMode = true;
        this.authForm.reset();
      }
    }
  }
}
