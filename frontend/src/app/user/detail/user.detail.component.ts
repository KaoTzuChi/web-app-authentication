import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserDetailService } from './user.detail.service';

@Component({
  selector: 'app-supervisor-user-detail',
  templateUrl: './user.detail.component.html',
  providers: [UserDetailService],
  styleUrls: ['./user.detail.component.css']
})

export class UserDetailComponent implements OnInit {
  currentid: string = '';
  user: User;
  loginuser :string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userDetailService: UserDetailService,
    private location: Location,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.currentid = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUser(this.currentid);
    this.loginuser = sessionStorage.getItem('userName');
  }

  goBack(): void {
    this.router.navigate(["/user/query"]);
  }

  getUser(id:string): void {
    this.userDetailService.getUser(id)
      .subscribe(user => this.user = user);
  }

  deactivateUser(): void{
    //this.user.auth_token = ((this.user.auth_token!=null)&&(this.user.auth_token!=undefined)&&(this.user.auth_token.length>0))?this.user.auth_token:'none';
    this.userDetailService.deactivateUser(this.user)
      .subscribe(() => {
        if(this.user.username==this.loginuser){
          this.router.navigate(["/user"]);
        }else{
          this.router.navigate(["/user/query"]);
        }
      
    });
  }
  
  activateUser(): void{
    this.userDetailService.activateUser(this.user)
      .subscribe(() => {
      this.router.navigate(["/user/query"]);
    });
  }
  
}
