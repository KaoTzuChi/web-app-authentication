import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, formatDate } from '@angular/common';
import { User } from '../user';
import { UserQueryService } from './user.query.service';

@Component({
  selector: 'app-supervisor-user-query',
  templateUrl: './user.query.component.html',
  providers: [UserQueryService],
  styleUrls: ['./user.query.component.css']
})

export class UserQueryComponent implements OnInit {
  users: User[];
  selectedItem: User;
  displayColumn = ['radio', 'serialno', 'username', 'password', 'email', 'is_staff', 'is_superuser', 'is_active', 'auth_token'];
  search_cond1_exists_lang = null;

  constructor(
    private userQueryService: UserQueryService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
  }

  ngOnInit() {
    this.getUsers();
    document.getElementById('apiMessageBlock').style.display = 'block';
  }

  getUsers(): void {
    this.userQueryService.getUsers()
      .subscribe(users => {
        this.users = users;
        if((this.users!=null)&&(this.users.length>0)){
          this.selectedItem = this.users[0];
        }
      });
  } 

  goBack(): void {
    document.getElementById('apiMessageBlock').style.display = 'none';
    this.router.navigate(["/user"]);
    //window.open("/user", '_self');
  }
  goInsert(path1:string) {
    this.router.navigate(["/user/insert"]);
  }
  goMaintain(path1:string, path2:string) {
    this.router.navigate(["/user/"+path2+"/"+this.selectedItem.username]);
  }
  onSelect(item: User): void {
    this.selectedItem = item;
  }
}
