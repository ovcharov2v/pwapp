import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getFilteredUserList(filter: string): any {
    return this.http.post<{id: string; name: string; }[]>(
      environment.apiUrl+'api/protected/users/list',
      {filter}
    );
  }

  createTransaction(transaction: TransactionModel): Observable<any> {
    return this.http.post<{ string }>(
      environment.apiUrl+'api/protected/transactions',
      transaction
    );
  }

  getTransactionList() {
    const response = this.http.get<any>(environment.apiUrl+'api/protected/transactions').pipe(map(list=>{
      const myTransactions = list.trans_token.filter(el => el.amount < 0).map(el => {
        return {...el, amount: Math.abs(el.amount)};
      });
      const incomeTransactions = list.trans_token.filter(el => el.amount > 0);
      return {'my': myTransactions, 'income': incomeTransactions};
    }))
    return response;
  }
}
