import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { SanitizerService } from '../utils/sanitizer.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  BASE_URL: string;

  constructor(private http: HttpClient, private sanitizerService: SanitizerService) {
    this.BASE_URL = `${environment.apiUrl}/invoice`; 
  }

  getAll(query={}): Observable<any> {
    let params = new HttpParams();
    params = this.sanitizerService.getQueryParams(params, query);
    return this.http.get(this.BASE_URL, {params: params})
  }

  create(data): Observable<any> {
    return this.http.post(this.BASE_URL, data);
  }

  delete(id): Observable<any> {
    const deleteURL = `${this.BASE_URL}/${id}`;
    return this.http.delete(deleteURL);
  }

  deleteAll(): Observable<any> {
    const deleteAllURI = `${environment.apiUrl}/invoices`;
    return this.http.delete(deleteAllURI);
  }

}
