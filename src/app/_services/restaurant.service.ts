import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { AuthenticationService } from '../_services';


const endpoint = 'http://localhost:5000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RestaurantService {

  currentUser:any;
  username:string;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
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
    query = encodeURIComponent(query);
    console.log("Encoded getRestaurant query:" + query);
    return this.http.get(endpoint + 'restaurants/' + query).pipe(map(this.extractData));
  }

  getDishes(query: string): Observable<any> {
    
    query = encodeURIComponent(query);
    
    // IF USER IS NOT LOGGED IN

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(!this.currentUser) {
      console.log("user not logged in!")
      return this.http.get(endpoint + 'dishes/?restaurant_name=' + query).pipe(map(this.extractData));
    } else {
      console.log("retrieving dishes for " + this.currentUser.username);
      return this.http.get(endpoint + 'dishes/?restaurant_name=' + query + '&username=' + this.currentUser.username).pipe(map(this.extractData));
    }

  }

  getReviewsByDish(dish_id:number): Observable<any> {
    let params = new HttpParams().set("dish_id", dish_id.toString())
    return this.http.get<any>(endpoint+'reviews/', {params})
      .pipe(
        map(
          data => {
            return data;
        })
      ) 

  }

  createReview(dish_id:number, rating:number, review:string): Observable<any> {
    return this.http.post<any>(endpoint+`reviews/`, { dish_id, rating, review })
  }

}  