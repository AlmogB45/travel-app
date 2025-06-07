import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss',
})
export class UserRegisterComponent implements OnInit{
  registerForm!: FormGroup;

constructor(private fb: FormBuilder, private http: HttpClient) {}
  
ngOnInit() {
  this.registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;

    this.http
      .post('http://localhost:3000/register', { email, password })
      .subscribe({
        next: (res) => {
          console.log('Registered Successfully', res);
          alert('Registered Successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Registration failed.');
        },
      });
  }
}
