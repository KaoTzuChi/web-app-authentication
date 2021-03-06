import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApimessageService } from './message/apimessage/apimessage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private apimessageService : ApimessageService,
    private router: Router,
  ){

  }
  goHome(): void {
    //this.apimessageService.clear();
    this.router.navigate(["./home"]);
  }

  goLogin(): void {
    //this.apimessageService.clear();
    this.router.navigate(["./user/login"]);
  }

  goLogout(): void {
    //this.apimessageService.clear();
    this.router.navigate(["./user/logout"]);
  }

  goUser(): void {
    //this.apimessageService.clear();
    this.router.navigate(["./user"]);
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
