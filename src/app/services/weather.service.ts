import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { SanitizerService } from '../utils/sanitizer.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  BASE_URL: string;

  constructor(private http: HttpClient, private sanitizerService: SanitizerService) {
    this.BASE_URL = `${environment.apiUrl}/weather`; 
  }

  getWeather(query={}): Observable<any> {
    let params = new HttpParams();
    params = this.sanitizerService.getQueryParams(params, query);
    return this.http.get(this.BASE_URL, {params: params})
  }

}
