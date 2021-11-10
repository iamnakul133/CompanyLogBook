import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// const loginApi='https://localhost:5000/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private  login_url = 'http://localhost:5000/login';
  // setUser(userId : string) : void{
  //   localStorage.setItem('userId', userId);
  // }
  // getUser(): string | null{
  //   return localStorage.getItem('userId');
  // }
  // isLogin():boolean {
  //   return this.getUser() !== null;
  // }
  // logoutUser(): void{
  //   localStorage.removeItem('token');
  //   this.router.navigate(['login']);
  // }
  constructor(private http : HttpClient) { }
  login(user : FormGroup) {
    return this.http.post<any>(this.login_url, user);
  }

}
