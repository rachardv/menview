import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:5000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RestaurantService {


  constructor(
    private http: HttpClient
  ) {

  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAllRestaurants(): Observable<any> {
    console.log("restaurant.service.ts running getAllRestaurants()");
    return this.http.get(endpoint + 'restaurants/').pipe(map(this.extractData));
  }

  getRestaurant(query: string): Observable<any> {
    console.log("restaurant.service.ts running getRestaurant()");
    return this.http.get(endpoint + 'restaurants/' + query).pipe(map(this.extractData));
  }

}