import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../Model/User";
const api = "http://192.168.29.144:8010/Api/PDMS";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(
        public http: HttpClient,
        public router: Router
    ){}
    user = new BehaviorSubject<User>(null);

    signup(data){
        return this.http.post(`${api}/RegisterNewUser`, data)
        .pipe(catchError(this.handleSignupError), tap((res) => {
            return res;
        }))
    }

    login(data){
        return this.http.post(`${api}/Login`, data)
        .pipe(catchError(this.handleLoginError), tap((res) => {
            this.handleCreateUser(res);
        }))
    }

    forgotPassword(email){
        return this.http.get(`${api}/ForgotPassword/${email}`)
        .pipe(catchError(this.handleForgotPasswordError), tap((res) => {
            return res;
        }))
    }

    autoLogin(){
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            return;
        }
        const loggedUser = new User(user.Userid, user.Username, user.Email, user.Token);
        if(loggedUser.token){
            this.user.next(loggedUser);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('user');
    }

    getAllRoles(){
        return this.http.get(`${api}/GetAllRoles`);
    }

    getToken(){
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.Token : null;
    }

    handleSignupError(err: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred';
            if (err.error && err.error.ServiceObject && err.error.ServiceObject.Description) {
                errorMessage = err.error.ServiceObject.Description;
            } else if (err.error && err.error[0] && err.error[0].Description) {
                errorMessage = err.error[0].Description;
            }
        return throwError(() => errorMessage);
    }
     
    handleLoginError(err:any){
        return throwError(() => err.error.Message);
    }

    handleForgotPasswordError(err:any){
        return throwError(() => err.error.Description);
    }

    handleCreateUser(res:any){
        const user = new User(res.Userid, res.Username, res.Email, res.Token);
        this.user.next(user);
        localStorage.setItem('user',JSON.stringify(user));
    }

}
