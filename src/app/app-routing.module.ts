import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users/users.component';
import { AuthGuard } from './auth/auth.guard';
import { AttractionsListComponent } from './attractions/attractions-list/attractions-list.component';
import { PetSalesComponent } from './pet-sales/pet-sales/pet-sales.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent , },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'attractions', component: AttractionsListComponent, canActivate: [AuthGuard] },
  { path: 'pet-sales', component: PetSalesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
