import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NorthwindSwaggerService {
  constructor(
    private http: HttpClient
  ) { }

  public getCustomerDtoList(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${API_ENDPOINT}/Customers`)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto[]>('getCustomerDtoList', [])));
  }

  public putCustomerDto(id: string, data: any): Observable<CustomerDto | undefined> {
    if (!id || !data) {
      return of(undefined);
    }
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    const body = data;
    return this.http.put<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`, body, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('putCustomerDto', undefined)));
  }
}
