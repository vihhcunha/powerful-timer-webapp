import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { Response, ErrorResponse } from "src/app/models/response";

@Injectable({
  providedIn: "root"
})
export class BaseService {
  public _baseUrl: string | undefined;

  get headersAnonymous(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  protected extractData<Type>(response: Response<Type>): Type{
    return response.object;
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}`);
      if (error.status == 400) {
        console.error('body was: ', error.error.object);
        var errors = error.error.object as ErrorResponse[];
        return throwError(() => errors.map(u => u.message).join('\n'));
      }
    }
    return throwError(() => 'Algo deu errado. Por favor, tente novamente mais tarde! =(');
  }
}
