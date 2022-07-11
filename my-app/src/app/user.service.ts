import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users")
    .pipe(
      map((users: any) => {
        return users.map((user: any) => { 
          return {
            name: user.name, 
            email: user.email,
            phone: user.phone,
            id: user.id,
            checked: false 
          }
        })
      })
    );
  }

}
