import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../user';
import { HttpErrorHandler, HandleError } from '../../api-interactor/http-error-handler.service';
import { environment } from '../../../environments/environment';
import { ApimessageService } from '../../message/apimessage/apimessage.service';


@Injectable({
  providedIn: 'root'
})
export class UserQueryService {
  private apiUrl = environment.apihost + 'account_read_all/' ;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private apimessageService : ApimessageService,
    ) {
    this.handleError = httpErrorHandler.createHandleError('UserQueryService');
  }
  ngOnInit() {}

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>( this.apiUrl, 
        {         
          headers: new HttpHeaders({
            'Content-Type':  'application/json',        
            'Authorization': 'Token ' + sessionStorage.getItem('userToken') 
          })
        }
      ).pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  private log(message: string) {
    this.apimessageService.add(`UserQueryService: ${message}`);
  }

}

