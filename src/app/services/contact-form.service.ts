import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
  website?: string;
};

export type ContactFormResponse =
  | { ok: true }
  | { ok: false; error: string };

@Injectable({ providedIn: 'root' })
export class ContactFormService {
  constructor(private http: HttpClient) {}

  send(payload: ContactFormPayload): Observable<ContactFormResponse> {
    return this.http.post<ContactFormResponse>('/api/contact.php', payload);
  }
}


