import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionModel } from '../../models/transaction.model';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';

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
  balance: number;

  constructor(private transactionService: TransactionService, private userService: UserService, private route: ActivatedRoute) {
    this.transactionSuccessStatus = false;
    userService.user.subscribe(user => this.balance = user.balance);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        this.maxAmountValidator()
      ])
    });
    // Repeat transaction
    this.route.params.subscribe((params: { name: string, amount: number }) => {
      if (Object.keys(params).length !== 0) {
        this.form.controls.name.patchValue(params.name);
        this.form.controls.amount.patchValue(params.amount);
      }
    });
  }

  getFilteredUsers(filter: string): string[] | void {
    if (filter && filter.length) {
      return this.transactionService.getFilteredUserList(filter).subscribe(
        response => this.filteredUsers = response
      );
    }
  }

  onSubmit(): void {
    this.form.disable();
    this.errorMessage = '';
    this.transactionService.createTransaction(this.form.value).subscribe(
      response => {
        this.transaction = { name: response.trans_token.username, amount: Math.abs(response.trans_token.amount) };
        this.transactionSuccessStatus = true;
        this.userService.updateUser();
        this.form.enable();
        this.form.reset();
      },
      (error: HttpErrorResponse) => {
        this.transactionSuccessStatus = false;
        this.errorMessage = error.error;
        this.form.enable();
      }
    );
  }

  maxAmountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return +control.value > this.balance ? {maxBalance: true} : null;
    };
  }

  get name() {
    return this.form.get('name');
  }

  get amount() {
    return this.form.get('amount');
  }
}
