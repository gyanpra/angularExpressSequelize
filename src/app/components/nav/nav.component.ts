import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  isLoggedIn = false;
  name?: string;

  constructor(private usersService: UsersService, private localstorageService: LocalstorageService) { }



  ngOnInit(): void {


  }

  ngDoCheck() {
    this.isLoggedIn = !!this.localstorageService.getToken();
    if (this.isLoggedIn) {
      // this.localstorageService.getUser().subscribe(
      //   (user: Users) => {
      //     this.name = user.name;
      //   }
      // );
    }
        
  }


  logout() {
    this.usersService.logOut();
    window.location.reload();
  }
}