import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authForm: any;
  isLoginMode: Boolean = true;
  roleResponse: any;
  roleDropDown:IDropdownSettings = {};
  errorMessage: string = "";
  errMsg: string = "";

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public router: Router, 
    public authService: AuthService
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
// 3520B0s-
  ngOnInit(){
    this.authForm = this.formBuilder.group({
      username: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null,  Validators.required],
      fullname: [null, Validators.required],
      address: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
      roleId: [null, Validators.required]
    })

    this.authService.getAllRoles().subscribe((res) => {
      this.roleResponse = res;
      this.roleResponse = this.roleResponse.ServiceObject;
    })
    
    this.roleDropDown = {
      singleSelection: true,
      idField: 'RoleId',
      textField: 'RoleName'
    };

  }

  OnFormSubmit(){
    const { username, email, password, fullname, contact, roleId } = this.authForm.value;
    
    if(this.isLoginMode){
      if(email == null || password == null){
        return;
      }
      else{
        this.authService.login(email, password).subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/home']);
            this.authForm.reset();
          },
          error: (errMsg) => {
            this.errMsg = errMsg;
            console.log(errMsg);
          }
        })
      }
    }
    else{
      if(username == null || email == null ||  password == null || fullname == null || contact == null){
        return;
      }
      if(roleId == null || roleId == ""){
        this.errorMessage = "*Role is Required";
        return;
      }
      else{
        const roleid = roleId[0].RoleId;
        this.authService.signup(username, email, password, fullname, contact, roleid).subscribe({
          next: (res) => {
            this.isLoginMode = true;
            this.authForm.reset();
            location.reload();
          },
          error: (errMsg) => {
            this.errMsg = errMsg;
            console.log(errMsg);
          }
        })
      }
    }
  }
}
