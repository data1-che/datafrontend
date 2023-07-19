import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-softskill-edit-dialog',
  templateUrl: './softskill-edit-dialog.component.html',
  styleUrls: ['./softskill-edit-dialog.component.css']
})
export class SoftskillEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SoftskillEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.data.urlImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
