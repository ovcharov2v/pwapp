import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryTableComponent } from './history/components/history-table/history-table.component';
import { HistoryComponent } from './history/history.component';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';



@NgModule({
  declarations: [
    TransactionComponent,
    HistoryComponent,
    HistoryTableComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class TransactionModule { }
