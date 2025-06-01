import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface User {
  id: number;
  fname: string;
  lname:string;
  username:string;
  email: string;
}
@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styles: ``
})

export class UserUpdateDialogComponent implements OnInit {
  userForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder){}
 
    ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [this.data.user.id], 
      fname: [this.data.user.fname, Validators.required],
      lname: [this.data.user.lname, Validators.required],
      username: [this.data.user.username, [Validators.required]],
      email: [this.data.user.email ? this.data.email : this.data.username, [Validators.required, Validators.email]],
      avatar: ['https://www.melivecode.com/users/cat.png'],
      password: ['', !this.data.isUpdate ? Validators.required:'']
    });
  }
  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
