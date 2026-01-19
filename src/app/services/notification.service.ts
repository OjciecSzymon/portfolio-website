import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

type SnackType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, type: SnackType = 'info', config: MatSnackBarConfig = {}) {
    const panelClass = `snack-${type}`;
    this.snackBar.open(message, this.getActionLabel(type), {
      duration: 3000,
      panelClass,
      ...config
    });
  }

  success(message: string, config?: MatSnackBarConfig) {
    this.open(message, 'success', config);
  }

  error(message: string, config?: MatSnackBarConfig) {
    this.open(message, 'error', config);
  }

  info(message: string, config?: MatSnackBarConfig) {
    this.open(message, 'info', config);
  }

  private getActionLabel(type: SnackType) {
    return type === 'error' ? 'Zamknij' : 'OK';
  }
}

