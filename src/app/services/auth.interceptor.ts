import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;

  constructor(private authService: AuthService) {
    //this.token = this.authService.tokenChanged.pipe(e=>e)
  }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if(req.url.match(/api\//)) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.token),
      })
      return next.handle(authReq);
    }
    else {
      return next.handle(req)
    }
  }
}
