import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {UsersService} from '../../services/users.service';
import { Users } from 'src/app/models/users';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  AuthMessage='Email or Password is Wrong';


  


  constructor(private usersService:UsersService, private router: Router, private localstorageService: LocalstorageService) {}

  ngOnInit(): void {
    this._initloginForm();
  }

  private _initloginForm() {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  onSubmit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.usersService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe(
      
      data => {
        this.authError = false;
        this.localstorageService.setToken(data.token);
        console.log(data);
        this.router.navigate(['/home']);
        
      },
      error => {
        this.authError = true;
        console.log(error);
      } 
    );
  }


}
