import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  passwordForm!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  AuthMessage='You Entered Wrong Email.';

  constructor(private resetPasswordService:ResetPasswordService, private router: Router) { }

  ngOnInit(): void {
    this._initPasswordForm();
  }

  private _initPasswordForm() {
    this.passwordForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.passwordForm.valid){
      this.resetPasswordService.sendOtp(this.passwordForm.value).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/resetpassword/verify']);
        },
        (err) => {
          this.authError = true;
        }
      );
    }   
  }

}

