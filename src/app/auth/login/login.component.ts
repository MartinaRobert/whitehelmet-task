import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr:ToastrService) { 
  }
  
  ngOnInit(): void {
    sessionStorage.removeItem('token');
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if(this.loginForm.invalid){
      return
    }
    this.auth.login(this.loginForm.value).subscribe({

      next: () => {
        this.toastr.success('Login success')
        this.router.navigate(['/users'])
      },
      error: () => this.toastr.error('Invalid credentials'),
    });
  }
}
