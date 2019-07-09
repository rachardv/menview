import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {

    private apiUrl:string;  //will remove later.  should be global

    constructor(private http: HttpClient) {

        this.apiUrl = JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
     }



    getAll() {
        return this.http.get<any[]>(this.apiUrl+`/users`);
    }

    register(user) {
        return this.http.post(this.apiUrl+`/users/register`, user);
    }
 
    delete(id) {
        return this.http.delete(this.apiUrl+`/users/${id}`);
    }
}