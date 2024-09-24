import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  constructor(private http: HttpClient) {
    
  }

  userLogin(): Observable<any> {
    return this.http.get('https://api.punkapi.com/v2/beers');
  }

}
