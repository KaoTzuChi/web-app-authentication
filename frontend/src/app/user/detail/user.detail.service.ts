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
export class UserDetailService {
  private handleError: HandleError;
  dataUrl = environment.apihost + 'account_read_one' ;
  apiUrl1 = environment.apihost + 'account_deactivate/';
  apiUrl2 = environment.apihost + 'account_activate/';
  
  constructor(
    httpErrorHandler: HttpErrorHandler,
    private http: HttpClient,
    private apimessageService : ApimessageService,
    ) {
    this.handleError = httpErrorHandler.createHandleError('UserDetailService');
  }
  ngOnInit() {}
  
  getUser(id: string): Observable<User> {
    let url = `${this.dataUrl}/${id}/`;
    return this.http.get<User>(url, 
      {         
        headers: new HttpHeaders({
          'Content-Type':  'application/json',        
          'Authorization': 'Token ' + sessionStorage.getItem('userToken') 
        })
      }
    ).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  
  deactivateUser (user: User): Observable<{}> {
    return this.http.post(this.apiUrl1, user, 
      {         
        headers: new HttpHeaders({
          'Content-Type':  'application/json',        
          'Authorization': 'Token ' + sessionStorage.getItem('userToken') 
        })
      }
    ).pipe(
        tap(result => {
          //console.log('deactivateUser ',result['status']);
          //console.log('deactivateUser ',result['username']);
          this.log(`deactivated user id=${user.username}`);
          if(user.username==sessionStorage.getItem('userName')){
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('userName');
            this.log(`deactivated user = login user >> exist managing page`);
          }
        }),
        catchError(this.handleError('deactivateUser'))
      );
  }

  activateUser (user: User): Observable<{}> {
    return this.http.post(this.apiUrl2, user,  
      {         
        headers: new HttpHeaders({
          'Content-Type':  'application/json',        
          'Authorization': 'Token ' + sessionStorage.getItem('userToken') 
        })
      }
    ).pipe(
        tap(_ => this.log(`activated user id=${user.username}`)),
        catchError(this.handleError('activateUser'))
      );
  }

  private log(message: string) {
    this.apimessageService.add(`UserDetailService: ${message}`);
  }
  
}

