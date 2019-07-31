import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrordialogComponent } from '../views/errordialog/errordialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrordialofService {
  public isDialogOpen: Boolean = false;
  constructor(public dialog: MatDialog) { }

  openDialog(data): any {
    if (this.isDialogOpen) {
      return false;
    }
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(ErrordialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.isDialogOpen = false;
      let animal;
      animal = result;
    });
  }
}
