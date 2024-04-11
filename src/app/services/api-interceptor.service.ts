import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor() {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
  
      for (let host of environment.hosts) {
        if (req.url.includes(host.prefix)) {
          let newUrl = req.url.replace(host.prefix, host.target);
          var modifiedReq = req.clone({ url: newUrl });
        }
      }
      return next.handle(modifiedReq);
    }
  }