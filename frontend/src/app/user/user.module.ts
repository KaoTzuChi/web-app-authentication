import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatListModule, MatRadioModule,
MatTableModule, MatFormFieldModule, MatInputModule,
MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule, 
MatSelectModule, MatDialogModule, MatButtonToggleModule } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { UserComponent } from './user.component';
import { UserQueryComponent } from './query/user.query.component';
import { UserDetailComponent } from './detail/user.detail.component';
import { UserEditComponent } from './edit/user.edit.component';
import { UserInsertComponent } from './insert/user.insert.component';
import { UserLoginComponent } from './login/user.login.component';
import { UserLogoutComponent } from './logout/user.logout.component';

const user_routes = [
  { path: 'user', component: UserComponent, children: [
    { path: 'query', component: UserQueryComponent },
    { path: 'insert', component: UserInsertComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'logout', component: UserLogoutComponent },
    { path: 'detail/:id', component: UserDetailComponent },
    { path: 'edit/:id', component: UserEditComponent },
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(user_routes),
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [
  ],
  declarations: [
    UserComponent,
    UserQueryComponent,
    UserDetailComponent,
    UserEditComponent,
    UserInsertComponent,
    UserLoginComponent,
    UserLogoutComponent,
  ]
})
export class UserModule { 
  constructor() {  }
  ngOnInit() { }
}

