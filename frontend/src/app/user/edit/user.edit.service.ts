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
export class UserEditService {
  private handleError: HandleError;
  apiUrl = environment.apihost + 'account_update/';

  constructor(
    httpErrorHandler: HttpErrorHandler,
    private http: HttpClient,
    private apimessageService : ApimessageService,
    ) {
    this.handleError = httpErrorHandler.createHandleError('UserEditService');
  }

  ngOnInit() {}

  replaceUser (user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, 
      {         
        headers: new HttpHeaders({
          'Content-Type':  'application/json',        
          'Authorization': 'Token ' + sessionStorage.getItem('userToken') 
        })
      }
    ).pipe(
        tap(_ => this.log(`updated user id=${user.username}`)),
        catchError(this.handleError('replaceUser', user))
      );
  }

  private log(message: string) {
    this.apimessageService.add(`UserEditService: ${message}`);
  }

}
