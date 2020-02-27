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

export class UserLogoutService {
  private handleError: HandleError;
  apiUrl = environment.apihost + 'account_logout/' ;

  constructor(
    httpErrorHandler: HttpErrorHandler,
    private http: HttpClient,
    private apimessageService : ApimessageService,
    ) {
    this.handleError = httpErrorHandler.createHandleError('UserLogoutService');
  }

  ngOnInit() {}

  logoutUser (user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user,
      {         
        headers: new HttpHeaders({
          'Content-Type':  'application/json',        
          'Authorization': 'Token ' + sessionStorage.getItem('userToken') 
        })
      }
    ).pipe(
      tap( result => {
        let status = result['status'];
        if((status!=null) && (status!=undefined) && (status.length > 0) && (status.includes('done'))){
          sessionStorage.removeItem('userToken');
          sessionStorage.removeItem('userName');
          this.log(`logout user name=${user.username}`);
        }else{
          this.log(`result =${status}`);
        }
        
      } ),
      catchError(this.handleError('logout action fail:', user ))
    );
  }

  private log(message: string) {
    this.apimessageService.add(`UserLogoutService: ${message}`);
  }

}
