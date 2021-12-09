import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Otp} from '../models/otp';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  sendmail = 'http://localhost:8080/reset/sendmail';
  verify = 'http://localhost:8080/reset/verify';

  sendOtp(email: string): Observable<Otp> {
    return this.http.post<Otp>(this.sendmail, email);
  }

  resetPassword(otp: Otp): Observable<Otp> {
    return this.http.post<Otp>(this.verify, otp);
  }
}
