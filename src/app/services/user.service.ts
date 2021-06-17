import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel());

  constructor(private http: HttpClient, auth: AuthService) {
    auth.tokenChanged.subscribe( token =>{
      if(token) {
        this.updateUser();
      }
      else {
        this.clearUser();
      }

    })
   }

  updateUser() {
    this.http.get<any>(environment.apiUrl + 'api/protected/user-info').subscribe(
      user => this.user.next(user.user_info_token)
    );
  }

  clearUser() {
    this.user.next(new UserModel());
  }
}
