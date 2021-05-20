import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {UserModel} from '../../user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: UserModel;
  constructor(public apiService: ApiService) {
    apiService.userChanged.subscribe(
      res => this.user = res
    );
  }

  ngOnInit(): void {


  }

}
