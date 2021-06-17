import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements OnInit {

  @Input() columns;
  @Input() dataSource;
  @Input() showRepeat;
  @Output() repeatTransaction = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitRepeatTransaction(data) {
    this.repeatTransaction.emit(data);
  }
}
