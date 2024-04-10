import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        
        let token = this.authService.getToken();
        // let token = token1.split(' ')[1];
        if(token){

            req = req.clone({ setHeaders: { 
                Authorization: token
            } 
            
        })
        // debugger;
        }
        return next.handle(req);
    }
}
