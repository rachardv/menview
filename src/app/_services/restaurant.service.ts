import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
    query = encodeURIComponent(query);
    console.log("Encoded getRestaurant query:" + query);
    return this.http.get(endpoint + 'restaurants/' + query).pipe(map(this.extractData));
  }

  getDishes(query: string): Observable<any> {
    
    console.log("restaurant.service.ts running getMenu()");
    query = encodeURIComponent(query);
    console.log("Encoded query:" + query);

    // IF USER IS NOT LOGGED IN
    return this.http.get(endpoint + 'dishes/?restaurant_name=' + query).pipe(map(this.extractData));
    
    // TODO: HANDLE USER LOGGED IN, NEED TO PASS USERNAME AS PARAM TOO

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