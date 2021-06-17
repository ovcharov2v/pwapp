import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { TransactionService } from './../../services/transaction.service';
import { TransactionModel } from './../../models/transaction.model';


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
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    this.transactionService.getTransactionList().subscribe(list => {
      this.myTransactionDataSource = list.my
      this.incomeTransactionDataSource = list.income
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
