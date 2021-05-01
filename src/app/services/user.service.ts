import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserById(id) {
    return this.http.get(`http://localhost:3000/api/v1/user/${id}`);
  }
}
