import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApimessageService } from '../message/apimessage/apimessage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  
})
export class UserComponent implements OnInit {
  currentuser: string = '';

  constructor(
    private apimessageService : ApimessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {  

  }

  ngOnInit() {
    document.getElementById('apiMessageBlock').style.display = 'block';
  }


  goLogin(): void {
    //this.apimessageService.clear();
    this.router.navigate(["./user/login"]);
  }
  goQuery(): void {
    //this.apimessageService.clear();
    this.router.navigate(["./user/query"]);
  }

  isAuthenticated():boolean{
    let isUserAuthenticated = false;
    let token =  sessionStorage.getItem('userToken');
    let name =  sessionStorage.getItem('userName');
    if( (token!=null) && (token!=undefined) && (token.length >4)
     && (name!=null) && (name!=undefined) && (name.length >0) ){
      isUserAuthenticated = true;
      this.currentuser = name;
    }
    return isUserAuthenticated;
  }

}


