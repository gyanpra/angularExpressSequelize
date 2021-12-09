import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: Boolean = false;
  authError: boolean = false;
  AuthMessage='Email or Password is Wrong';

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: ActivatedRoute,private route:Router ) { }

  ngOnInit(): void {
    this._initUserForm();
  }

  private _initUserForm(){
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      hashedPassword: ['', Validators.required],
      phone: [''],
      isAdmin: [],
      address: ['']
    })
  }

  private _addUser(user: Users){
    this.usersService.register(user).subscribe(
      (data) => {
        console.log(data);
        this.isSubmitted = true;
        
      },
      (error) => {
        console.log(error);
      }
    )
  }

  signUp() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: Users = {
      name: this.form.value.name,
      email: this.form.value.email,
      hashedPassword: this.form.value.hashedPassword,
      phone: '',
      isAdmin: false,
      address: ''
    }
    this._addUser(user);
    this.route.navigate(['/login']);
    
  }

  get userForm() {
    return this.form.controls;
  }
}
