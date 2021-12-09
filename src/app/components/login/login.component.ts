import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {UsersService} from '../../services/users.service';
import { Users } from 'src/app/models/users';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  AuthMessage='Something went wrong';


  


  constructor(private usersService:UsersService, private router: Router, private localstorageService: LocalstorageService) {}

  ngOnInit(): void {
    this._initloginForm();
  }

  private _initloginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      hashedPassword: new FormControl('', Validators.required)
    });
  }


  onSubmit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.usersService.login(this.loginForm.value.email, this.loginForm.value.hashedPassword).subscribe(
      
      data => {
        this.authError = false;
        this.localstorageService.setToken(data.token);
        // console.log(data);
        this.router.navigate(['/home']);
        
      },
      (err: HttpErrorResponse)=>{
        if(err.status === 401){
          this.authError = true;
          this.AuthMessage = "Password is Wrong";
        }
        if(err.status === 404){
          this.authError = true;
          this.AuthMessage = "Email is Wrong";
        }
        if(err.status === 500){
          this.authError = true;
          this.AuthMessage = "Something went wrong";
        }
      }
    );
  }


}
