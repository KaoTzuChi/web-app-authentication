import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../user';
import { HttpErrorHandler, HandleError } from '../../api-interactor/http-error-handler.service';
import { environment } from '../../../environments/environment';
import { ApimessageService } from '../../message/apimessage/apimessage.service';


@Injectable({
  providedIn: 'root'
})

export class UserLoginService {
  private handleError: HandleError;
  apiUrl = environment.apihost + 'account_login/' ;

  constructor(
    httpErrorHandler: HttpErrorHandler,
    private http: HttpClient,
    private apimessageService : ApimessageService,
    ) {
    this.handleError = httpErrorHandler.createHandleError('UserLoginService');
  }

  ngOnInit() {}

  loginUser (user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
      .pipe(
        tap( result => {
          let token =  result['auth_token'];
          let name =  result['username'];
          if((token!=null) && (token!=undefined) && (token.length >4)
          && (name!=null) && (name!=undefined) && (name.length >0)){
            sessionStorage.setItem('userName', name);
            sessionStorage.setItem('userToken', token);
            this.log(`login user name=${name}`);
          }else{
            this.log(`result = ${result['status']}`);
          }
        } ),
        catchError(this.handleError('login action fail:', user))
      );
  }

  private log(message: string) {
    this.apimessageService.add(`UserLoginService: ${message}`);
  }

}
