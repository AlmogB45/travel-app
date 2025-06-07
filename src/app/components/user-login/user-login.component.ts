import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse } from '../../models/Login.model';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.http
      .post<LoginResponse>('http://localhost:3000/login', { email, password })
      .subscribe({
        next: (res) => {
          console.log(res);
          const token = res['session']?.['session']?.['access_token'];
          const userId = res['session']?.['session']?.['user']?.['id'];
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', userId);
            this.router.navigate(['/home']);
          } else {
            alert('Login failed: No token received.');
          }
        },
        error: (err) => {
          console.error(err);
          alert('Login failed.');
        },
      });
  }
}
