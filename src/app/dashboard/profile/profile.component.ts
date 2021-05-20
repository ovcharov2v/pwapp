import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {UserModel} from '../../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserModel;

  constructor(apiService: ApiService) {
    apiService.userChanged.subscribe(
      res => this.user = res
    );
  }

  ngOnInit(): void {
  }

}
