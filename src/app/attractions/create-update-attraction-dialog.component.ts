import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface attraction {
  id: number;
  name: string;
  detail: string;
  latitude: string;
  longitude: string;
}
@Component({
  selector: 'app-create-update-attraction-dialog',
  templateUrl: './create-update-attraction-dialog.component.html',
  styles: ``
})
export class CreateUpdateAttractionDialogComponent implements OnInit {
  attractionsForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateUpdateAttractionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.attractionsForm = this.fb.group({
      id: [this.data.attraction.id],
      name: [this.data.attraction.name, Validators.required],
      detail: [this.data.attraction.detail, Validators.required],
      latitude: [this.data.attraction.latitude, [Validators.required]],
      longitude: [this.data.attraction.longitude, [Validators.required]],
      coverimage: ['https://www.melivecode.com/users/cat.png'],
    });
  }
  onSave(): void {
    if (this.attractionsForm.valid) {
      this.dialogRef.close(this.attractionsForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
