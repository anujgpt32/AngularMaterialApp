import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DeleteAccountDialogComponent>) {
   }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  delete() {
    this.dialogRef.close('deleted');
  }
}
