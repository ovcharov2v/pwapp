import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { RegisterUserModel } from '../models/registerUser.model';
import { environment } from '../../environments/environment';
import { take, takeLast, tap, map } from 'rxjs/operators';
import { LoginUserModel } from '../models/loginUser.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';
  tokenExpDate: number|undefined;

  tokenChanged : BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    const savedData= localStorage.getItem('data');
    if (savedData) {
      const savedDataJson = JSON.parse(savedData);
      this.token = savedDataJson.token;
      this.tokenExpDate = savedDataJson.tokenExpDate;
      this.tokenChanged.next(savedDataJson.token)
    }
  }

  register(user: RegisterUserModel): Observable<{id_token: string}>{
    return this.http.post<{id_token: string}>(environment.apiUrl+'users', user).pipe(
      tap(
        res => {
          this.saveData(res);
        }
      )
    );
  }

  login(user: LoginUserModel): Observable<{id_token: string}>{
    return this.http.post<{id_token: string}>(environment.apiUrl+'sessions/create', user).pipe(
      tap(
        res => {
          this.saveData(res);
        }
      )
    );
  }

  logout(): void{
    localStorage.removeItem('data');
    this.token = undefined;
    this.tokenExpDate = undefined;
    this.tokenChanged.next(this.token)
  }

  isAuthentificated() {
    if (!this.token || Date.now() >= this.tokenExpDate) {
      this.logout();
      return false;
    }
    else {
      return true;
    }
  }

  saveData(res) {
    this.token = res.id_token;
    this.tokenChanged.next(this.token)
    // @ts-ignore
    this.tokenExpDate = jwt_decode(res.id_token).exp * 1000;
    const data = {'token': res.id_token, 'tokenExpDate': this.tokenExpDate};
    localStorage.setItem('data', JSON.stringify(data));
  }
}
