import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    public snackBar: MatSnackBar) { }

  // Snackbar that opens with success background
  openSuccessSnackBar(message: string): MatSnackBar {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
    return this.snackBar;
  }

  // Snackbar that opens with failure background
  openFailureSnackBar(message: string): MatSnackBar {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['red-snackbar', 'login-snackbar'],
    });

    return this.snackBar;
  }

    // Snackbar that opens with failure background
    openWarningSnackBar(message: string): MatSnackBar {
      this.snackBar.open(message, 'OK', {
        duration: 3000,
        panelClass: ['white-snackbar', 'login-snackbar'],
      });

      return this.snackBar;
    }
}
