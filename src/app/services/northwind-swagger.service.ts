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
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjcxZTIwNGVmLWVkMGEtNGYyZi1hYTdlLThhOTI2NTQzMmY2MyIsInN1YiI6InRlc3QiLCJlbWFpbCI6InRlc3QiLCJqdGkiOiI4M2E0MGI2MC1lZmVkLTQ5ZGEtYWYxYi1mNTQ4MTUxZjc4ODgiLCJuYmYiOjE3NTU3ODgzMDIsImV4cCI6MTc1NTc4ODYwMiwiaWF0IjoxNzU1Nzg4MzAyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.lCyxBtprBOz35xQz0lGJngLP8lP8Q2sJYLujE16UBe5c4JP4M8m_QgQ6PWsxtq29FmNcfSmIPKyqEq-x5X7PfQ',
      },
    };
    const body = data;
    return this.http.put<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`, body, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('putCustomerDto', undefined)));
  }
}
