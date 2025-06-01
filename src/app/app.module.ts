import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './shared/layout/layout/layout.component';
import { UserUpdateDialogComponent } from './users/users/user-update-dialog.component';
import { AttractionsListComponent } from './attractions/attractions-list/attractions-list.component';
import { CreateUpdateAttractionDialogComponent } from './attractions/create-update-attraction-dialog.component';
import { PetSalesComponent } from './pet-sales/pet-sales/pet-sales.component';
import { ErrorHandlerInterceptor } from './core/interceptors/errorhandler.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    LayoutComponent,
    UserUpdateDialogComponent,
    AttractionsListComponent,
    CreateUpdateAttractionDialogComponent,
    PetSalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
        BrowserAnimationsModule,
    
     ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,}), 

  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
