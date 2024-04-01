import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/auth.service"; 

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(){
        return this.authService.user.pipe(
            map(user => {
                const loggedIn = user ? true : false;
                if(loggedIn){
                    return true;
                }else{
                    return this.router.createUrlTree(['/login']);
                }
            }
            )
        )
    }

}