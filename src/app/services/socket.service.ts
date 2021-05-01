import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor() {}

  private myWebSocket: WebSocketSubject<any>;

  public connect(url) {
    this.myWebSocket = webSocket(url);
  }

  public getMessages() {
    return this.myWebSocket.asObservable();
  }
  public disconnect() {
    this.myWebSocket.complete();
  }

  public sendMessages(message) {
    this.myWebSocket.next({ ...message });
  }
}
