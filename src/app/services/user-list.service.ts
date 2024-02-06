import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  API_URL: string = 'https://random-data-api.com/api/v2/users?size=100';

  users : any
  constructor(private httpClient: HttpClient) { }

  getUsers(size?:number): Observable<any> {
     this.users = this.httpClient.get<any[]>(`https://random-data-api.com/api/v2/users?size=${size}`).pipe(
      map((users: any[]) => users.map(user => ({
        ...user,
        image: `https://robohash.org/${user.first_name}.png`,
      })))
    );
    return this.users
  }

  loadMoreUsers(size: number): Observable<any> {
    return this.httpClient.get<any[]>(`https://random-data-api.com/api/v2/users?size=${size}`).pipe(
      map((users: any[]) => users.map(user => ({
        ...user,
        image: `https://robohash.org/${user.first_name}.png`,
      }))),
      tap(newUsers => {
        this.users = Array.isArray(this.users) ? this.users : [];
        this.users = [...this.users, ...newUsers];
      })
    );
  }
}
