import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location, formatDate } from '@angular/common';
import { User } from '../user';
import { UserLoginService } from './user.login.service';

@Component({
  selector: 'app-supervisor-user-login',
  templateUrl: './user.login.component.html',
  providers: [UserLoginService],
  styleUrls: ['./user.login.component.css']
})

export class UserLoginComponent implements OnInit {
  @Input() user: User;
  currentuser: string = '';
  jstoday : string = '';

  constructor(
    private userLoginService: UserLoginService,
    private location: Location,
    private router: Router,
  ) {
    this.jstoday = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ssZ', 'en-us', '+0800');
    this.user = new User();
    this.user.username = '';
    this.user.password = '';
    this.user.email = 'none';
    this.user.is_staff = false;
    this.user.is_superuser = false;
    this.user.is_active = true;
    this.user.auth_token = 'none';
  }

  ngOnInit() {}

  goHome(): void {
    this.router.navigate(["/home"]);
  }

  //{"username":"user2","password":"user2pwd","email":"none","is_staff":false,"is_superuser":false,"is_active":true,"auth_token":"none"}
  goLogin(){
    this.userLoginService.loginUser(this.user)
      .subscribe( result => this.user = result );
  }

  isAuthenticated():boolean{
    let isUserAuthenticated = false;
    let token =  sessionStorage.getItem('userToken');
    let name =  sessionStorage.getItem('userName');
    if( (token!=null) && (token!=undefined) && (token.length >4)
     && (name!=null) && (name!=undefined) && (name.length >0) ){
      isUserAuthenticated = true;
    }
    return isUserAuthenticated;
  }

}

