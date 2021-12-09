import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  verifyForm!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  AuthMessage='Somethnig went wrong';

  constructor(private resetPasswordService:ResetPasswordService, private router:Router) { }

  ngOnInit(): void {
    this._initVerifyForm();

  }

  private _initVerifyForm() {
    this.verifyForm = new FormGroup({
      email: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required),
      hashedPassword: new FormControl('', Validators.required)
    });
  }

      

  onSubmit() {
    this.isSubmitted = true;
    if (this.verifyForm.invalid) {
      return;
    }
    this.resetPasswordService.resetPassword(this.verifyForm.value).subscribe(
      (res) => {
        console.log(res);
        this.authError = false;
        this.router.navigate(['/login']);
      },
      // (err) => {
      //   this.authError = true;

      // }
      (err: HttpErrorResponse)=>{
        if(err.status===400){
          this.authError = true;
          this.AuthMessage = "Please Enter valid Details.";
        }
        else{
          this.authError = true;
          this.AuthMessage = "Something went wrong";
        }
      }
    );
  }


}

