import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SanitizerService {

  constructor() { }

  getQueryParams(httpParams: HttpParams, params): HttpParams {
    for(let key of Object.keys(params)) {
      httpParams = httpParams.set(key, params[key]);
    }
    return httpParams;
  }

}
