import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatLabel } from '@angular/material/form-field';
import {  MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';       
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core'; 

import { DeleteDialogComponent } from './components/delete-dialog.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [
    DeleteDialogComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatLabel,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatDatepickerModule,
    NgxEchartsModule.forRoot({ echarts }),
   
  ],
  exports:[
    
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatLabel,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatDatepickerModule,
    NgxEchartsModule,
    LoaderComponent
  ],
  providers: [provideNativeDateAdapter()]
})
export class SharedModule { }
