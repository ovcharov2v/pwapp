import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  get userName$() {
      return this.userService.user.pipe(map(u => u.name));
  }

  get userBalance$() {
    return this.userService.user.pipe(map(u => u.balance));
  }
}
