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

export class UserInsertService {
  private handleError: HandleError;
  apiUrl = environment.apihost + 'account_create/' ;

  constructor(
    httpErrorHandler: HttpErrorHandler,
    private http: HttpClient,
    private apimessageService : ApimessageService,
    ) {
    this.handleError = httpErrorHandler.createHandleError('UserInsertService');
  }

  ngOnInit() {}

  insertUser (user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, 
      {         
        headers: new HttpHeaders({
          'Content-Type':  'application/json',        
          'Authorization': 'Token ' + sessionStorage.getItem('userToken') 
        })
      }
    ).pipe(
        tap((newItem: User) => this.log(`added user w/ id=${newItem.username}`)),
        catchError(this.handleError('insertUser', user))
      );
  }

  private log(message: string) {
    this.apimessageService.add(`UserInsertService: ${message}`);
  }

}
