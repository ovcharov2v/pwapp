import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  subscription: Subscription

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  get userId$() {
    return this.userService.user.pipe(map(u => u.id));
  }

  get userName$() {
    return this.userService.user.pipe(map(u => u.name));
  }

  get userEmail$() {
    return this.userService.user.pipe(map(u => u.email));
  }

  get userBalance$() {
    return this.userService.user.pipe(map(u => u.balance));
  }
}
