import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private signalSource = new BehaviorSubject<boolean | null>(false);
  signal$ = this.signalSource.asObservable();

  setSignal(value: boolean) {
    this.signalSource.next(value);
  }
}
