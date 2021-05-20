import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RegisterUserModel} from './auth/register/registerUser.model';
import {LoginUserModel} from './auth/login/loginUser.model';
import {UserModel} from './user.model';
import {tap} from 'rxjs/operators';
import {TransactionModel} from './dashboard/transaction/transaction.model';
import {HistoryModel} from './dashboard/history/history.model';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel());
  userChanged =  this.user.asObservable();

  // Token data
  token: string|null;
  tokenExpDate: number|null;

  constructor(private http: HttpClient) {
    // Auto login
    const savedDataStr = localStorage.getItem('user');
    if (savedDataStr) {
      const savedDataJson = JSON.parse(savedDataStr);
      this.saveTokenData(savedDataJson.token);
      this.updateUserInfo();
    }
  }

  register(user: RegisterUserModel): Observable<{id_token: string}>{
    return this.http.post<{id_token: string}>('http://193.124.114.46:3001/users', user).pipe(
      tap(
        res => {
          this.saveTokenData(res.id_token);
          this.updateUserInfo();
        }
      )
    );
  }

  login(user: LoginUserModel): Observable<{id_token: string}>{
    return this.http.post<{id_token: string}>('http://193.124.114.46:3001/sessions/create', user).pipe(
      tap(
        res => {
          this.saveTokenData(res.id_token);
          this.updateUserInfo();
        }
      )
    );
  }

  saveTokenData(token: string): void {
    this.token = token;
    // @ts-ignore
    this.tokenExpDate = jwt_decode(token).exp * 1000;
  }

  logout(): void{
    this.token = null;
    this.tokenExpDate = null;
    localStorage.removeItem('user');
  }

  isAuthentificated(): boolean {
    console.log(this.token , Date.now() , this.tokenExpDate)
    if (this.token && Date.now() < this.tokenExpDate) {
      return true;
    }
    else {
      this.logout();
      return false;
    }
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
  }

  getUserInfo(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>('http://193.124.114.46:3001/api/protected/user-info', {headers});
  }

  readUserInfo(): UserModel{
    return JSON.parse(localStorage.getItem('user'));
  }

  updateUserInfo(): void {
    this.getUserInfo().subscribe(user => {
      const userInfo = {...user.user_info_token, token: this.token};
      this.user.next(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
    });
  }

  getFilteredUserList(filter: string): any {
    const headers = this.getAuthHeaders();
    return this.http.post<{id: string; name: string; }[]>(
      'http://193.124.114.46:3001/api/protected/users/list',
      {filter},
      {headers}
    );
  }

  createTransaction(transaction: TransactionModel): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ string }>(
      'http://193.124.114.46:3001/api/protected/transactions',
      transaction,
      {headers}
    );
  }

  getTransactionList(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<HistoryModel>(
      'http://193.124.114.46:3001/api/protected/transactions',
      {headers}
    );
  }
}
