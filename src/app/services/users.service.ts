import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Users } from '../models/users';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,private router: Router, private localstorageService:LocalstorageService) { }

  baseUrl = 'http://localhost:8080/users/register';
  baselogin = 'http://localhost:8080/users/login';

  register(user: Users): Observable<Users> {
    return this.http.post<Users>(this.baseUrl, user);
  }


  login(name: string, password: string): Observable<Users> {
    return this.http.post<Users>(this.baselogin, { name, password });
  }

  logOut(){
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }


}
