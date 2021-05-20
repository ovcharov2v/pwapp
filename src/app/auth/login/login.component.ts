import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean;
  form: FormGroup;
  errorMessage: string;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.hidePassword = true;
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  onSubmit(): void {
    this.form.disable();
    this.errorMessage = '';
    this.apiService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        this.form.enable();
      }
    );
  }
}
