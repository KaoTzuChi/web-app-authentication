import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location, formatDate } from '@angular/common';
import { User } from '../user';
import { UserInsertService } from './user.insert.service';

@Component({
  selector: 'app-supervisor-user-insert',
  templateUrl: './user.insert.component.html',
  providers: [UserInsertService],
  styleUrls: ['./user.insert.component.css']
})

export class UserInsertComponent implements OnInit {
  @Input() user: User;
  currentid: string = '';
  jstoday : string = '';

  constructor(
    private userInsertService: UserInsertService,
    private location: Location,
    private router: Router,
  ) {
    this.jstoday = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ssZ', 'en-us', '+0800');
    this.user = new User();
    this.user.username = '';
    this.user.password = '';
    this.user.email = '';
    this.user.is_staff = false;
    this.user.is_superuser = false;
    this.user.is_active = true;
    this.user.auth_token = 'none';
  }

  ngOnInit() {}

  goBack(): void {
    this.router.navigate(["/user/query"]);
  }

  insertUser(){
    
    this.userInsertService.insertUser(this.user).subscribe(() => {
      this.router.navigate(["/user/query"]);
    });
  }
}

