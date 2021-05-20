import {Component, OnInit} from '@angular/core';
import {TransactionModel} from '../transaction/transaction.model';
import {Router} from '@angular/router';
import {ApiService} from '../../api.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  myTransactionDataSource: TransactionModel[];
  incomeTransactionDataSource: TransactionModel[];
  displayedColumns = ['username', 'date', 'amount'];
  myDisplayedColumns = ['username', 'date', 'amount', 'repeat'];

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.apiService.getTransactionList().subscribe(list => {
      this.myTransactionDataSource = list.trans_token.filter(el => el.amount < 0).map(el => {
        return {...el, amount: Math.abs(el.amount)};
      });
      this.incomeTransactionDataSource = list.trans_token.filter(el => el.amount > 0);
    });
  }

  repeatTransaction(transaction: any) {
    this.router.navigate([
      'transaction',
      {
        name: transaction.username,
        amount: transaction.amount
      }
    ]);
  }
}
