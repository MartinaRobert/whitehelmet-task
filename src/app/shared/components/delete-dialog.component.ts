import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styles: ``
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>){}
  onSave(): void {
      this.dialogRef.close(true);
    }
  

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
