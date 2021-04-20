import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { OAuthService } from '../services/oauth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token : string;

  constructor() {
   this.token=JSON.parse(localStorage.getItem("token"));
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer `+ this.token
      }
    });
    return next.handle(request);
  }
}
