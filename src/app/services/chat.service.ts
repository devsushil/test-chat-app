import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  public getConverstaionByUser(id) {
    return this.http.get(`http://localhost:3000/api/v1/conversations/${id}`);
  }

  public sendMessage(data) {
    return this.http.post(`http://localhost:3000/api/v1/message`, { ...data });
  }
}
