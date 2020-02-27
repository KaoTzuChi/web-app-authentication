import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location, formatDate } from '@angular/common';
import { User } from '../user';
import { UserLogoutService } from './user.logout.service';
import { createAotUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-supervisor-user-logout',
  templateUrl: './user.logout.component.html',
  providers: [UserLogoutService],
  styleUrls: ['./user.logout.component.css']
})

export class UserLogoutComponent implements OnInit {
  @Input() user: User;
  currentid: string = '';
  jstoday : string = '';

  constructor(
    private userLogoutService: UserLogoutService,
    private location: Location,
    private router: Router,
  ) {
    this.jstoday = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ssZ', 'en-us', '+0800');
    this.user = new User();
    this.user.username = '';
    this.user.password = 'none';
    this.user.email = 'none';
    this.user.is_staff = false;
    this.user.is_superuser = false;
    this.user.is_active = true;
    this.user.auth_token = 'none';
  }

  ngOnInit() {
    let chk = this.isAuthenticated();
    if(chk){
      this.goLogout();
    }
  }

  goBack(): void {
    this.router.navigate(["/user/query"]);
  }

  goLogout(){
    this.userLogoutService.logoutUser(this.user).subscribe( data => {
      //console.log('UserLogoutComponent goLogout data=', data);
    });
  }

  isAuthenticated():boolean{
    let isUserAuthenticated = false;
    let token =  sessionStorage.getItem('userToken');
    let name =  sessionStorage.getItem('userName');
    if( (token!=null) && (token!=undefined) && (token.length >4)
     && (name!=null) && (name!=undefined) && (name.length >0) ){
      isUserAuthenticated = true;
      this.user.username = name;
    }
    return isUserAuthenticated;
  }
}

