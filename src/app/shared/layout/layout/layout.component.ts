import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  isLoggedIn$;
  constructor(private router:Router, private authService:AuthService){
    this.isLoggedIn$ = this.authService.isLoggedIn$;

  }
  ngOnInit(): void {
  
  }
 
logout(){
  this.authService.logout();
  this.router.navigate(['/login'])
}
}
