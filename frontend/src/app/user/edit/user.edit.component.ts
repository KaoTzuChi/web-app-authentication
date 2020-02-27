import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, formatDate } from '@angular/common';
import { UserDetailService } from '../detail/user.detail.service';
import { User } from '../user';
import { UserEditService } from './user.edit.service';

@Component({
  selector: 'app-supervisor-user-edit',
  templateUrl: './user.edit.component.html',
  providers: [UserEditService, UserDetailService],
  styleUrls: ['./user.edit.component.css']
})

export class UserEditComponent implements OnInit {
  @Input() user: User;
  currentid: string = '';
  jstoday : string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userDetailService: UserDetailService,
    private userEditService: UserEditService,
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

  ngOnInit() {
    this.currentid = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUser(this.currentid);
  }

  goBack(): void {
    this.router.navigate(["/user/query"]);
  }

  getUser(id:string): void {
    this.userDetailService.getUser(id)
      .subscribe(user => this.user = user);
  }

  replaceUser(){
    this.userEditService.replaceUser(this.user)
      .subscribe(() => {
      this.router.navigate(["/user/query"]);
    });
  }

}
