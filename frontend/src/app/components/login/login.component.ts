import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService } from '../../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    Email: new FormControl( ''),
    password: new FormControl(''),
  });
  constructor(private auth: LoginService, private router: Router) { }
  onSubmit() : void {
    this.auth.login(this.LoginForm.value).subscribe(
      (res: any) =>{
        console.log(res);
        if(res.status=="success!!"){
          this.router.navigate(['/dashboard']);
        }
        else this.router.navigate(['/login']);
      },(err)=> {
         this.router.navigate(['/login']);
      }
    )
  }

  ngOnInit(): void {

  }

}
