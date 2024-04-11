import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  authForm: FormGroup;
  roleResponse: any;
  roleDropDown:IDropdownSettings = {};
  errMsg: any = null;
  isRoleInvalid: boolean = false;
  btnClicked: boolean = false;
  hidePassword: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public router: Router, 
    public authService: AuthService,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.authForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$')]],
      fullname: [null, Validators.required],
      address: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
      roleId: [null, Validators.required]
    })

    this.authService.getAllRoles().subscribe((res) => {
      this.roleResponse = res;
      this.roleResponse = this.roleResponse;
    })
    
    // this.roleDropDown = {
    //   singleSelection: true,
    //   idField: 'RoleId',
    //   textField: 'RoleName'
    // };
  }

  displaySnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // onSelectRole() {
  //   this.isRoleInvalid = false;
  // }

  // onDeSelectRole() {
  //   this.isRoleInvalid = true;
  // }

  OnFormSubmit(){
    this.btnClicked = true;
    if(!this.authForm.valid) return;
    this.authForm.controls['contact'].setValue(this.authForm.controls['contact'].value?.toString());
    this.authService.signup(this.authForm.value).subscribe({
      next: (res) => {
        console.log(res);   
        this.authForm.reset();
        this.router.navigate(['/login']);
        this.displaySnackBar("Registration successful");
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
