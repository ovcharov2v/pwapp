import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TransactionModel} from './transaction.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  transactionSuccessStatus: boolean;
  transaction: TransactionModel;
  filteredUsers: string[];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.transactionSuccessStatus = false;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      amount: new FormControl(null, [
        Validators.required,
        this.minAmountValidator.bind(this),
        this.maxAmountValidator.bind(this)
      ])
    });
    // Repeat transaction
    this.route.params.subscribe((params: { name: string, amount: number }) => {
      if (Object.keys(params).length !== 0) {
        this.form.controls.name.setValue(params.name);
        this.form.controls.amount.setValue(params.amount);
      }
    });
  }

  getFilteredUsers(filter: string): string[] | void {
    if (filter && filter.length) {
      return this.apiService.getFilteredUserList(filter).subscribe(
        response => this.filteredUsers = response
      );
    }
  }

  onSubmit(): void {
    this.form.disable();
    this.errorMessage = '';
    this.apiService.createTransaction(this.form.value).subscribe(
      response => {
        this.transaction = {name: response.trans_token.username, amount: Math.abs(response.trans_token.amount)};
        this.transactionSuccessStatus = true;
        this.apiService.updateUserInfo();
        this.form.enable();
        this.form.reset();
        console.log(this.form)
      },
      (error: HttpErrorResponse) => {
        this.transactionSuccessStatus = false;
        this.errorMessage = error.error;
        this.form.enable();
      }
    );
  }

  minAmountValidator(control: AbstractControl): any {
    return typeof control.value === 'number' && control.value <= 0 ? {minBalance: true} : null;
  }

  maxAmountValidator(control: AbstractControl): any {
    return +control.value > JSON.parse(localStorage.getItem('user')).balance ? {maxBalance: true} : null;
  }
}
