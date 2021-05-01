import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user;
  other_user;
  loading = true;
  rawConverstaions;
  converstaions;
  activeConversationMessages;
  currentMessage;
  scroll = false;
  constructor(
    private route: ActivatedRoute,
    private SocketService: SocketService,
    private UserService: UserService,
    private ChatService: ChatService
  ) {
    this.route.queryParams
      .pipe(
        switchMap((data) => {
          return this.getUserById(data.user_id);
        }),
        map((data: any) => {
          this.user = data.user;
          localStorage.setItem('user', JSON.stringify(data.user));
          return data.user.id;
        }),
        switchMap((user_id) => {
          return this.getConversations(user_id);
        })
      )
      .subscribe((data: any) => {
        this.SocketService.connect(`ws://localhost:3000/${this.user.id}`);
        this.rawConverstaions = data.conversations;

        this.activeConversationMessages = this.getActiveConversationMessages(
          this.rawConverstaions[0].id
        );
        this.other_user = this.getActiveConversationOtherUser(
          this.rawConverstaions[0],
          this.user.id
        );
        this.converstaions = data.conversations.map((c, i) => {
          return {
            fullname: this.getfullName(c.fullUsers),
            lastMessage: this.getLastestMessage(c.messages),
            date: this.getLatestDate(c.messages),
            active: i === 0,
            id: c.id,
          };
        });

        this.listenMessages();
        this.loading = false;
      });
  }

  listenMessages() {
    this.SocketService.getMessages().subscribe((data) => {
      this.appendMessages(data);
    });
  }

  getMe(from) {
    return from.toString() === this.user.id.toString();
  }

  sendMsg() {
    let message = {
      from: this.user.id,
      to: this.other_user.id,
      message: this.currentMessage,
      date: 'Apr 30',
    };
    this.ChatService.sendMessage(message).subscribe((data: any) => {
      this.currentMessage = '';
      this.appendMessages(message);
    });
  }

  appendMessages(message) {
    this.activeConversationMessages = [
      ...this.activeConversationMessages,
      message,
    ];
  }

  getActiveConversationMessages(id) {
    return this.rawConverstaions.map((c) => {
      if (c.id.toString() === id.toString()) {
        return c.messages;
      }
    })[0];
  }

  ngAfterViewChecked() {
    if (!this.scroll) {
      let d = document.querySelector('#chat-container');
      if (d) {
        d.scrollTop = d.scrollHeight;
      }
    }
  }

  getActiveConversationOtherUser(converstaion, user_id) {
    return converstaion.fullUsers.filter(
      (u) => u.id.toString() !== user_id.toString()
    )[0];
  }

  getfullName(users) {
    let user = users.filter(
      (u) => u.id.toString() !== this.user.id.toString()
    )[0];
    return `${user.name} ${user.surname}`;
  }

  getLastestMessage(messages) {
    return messages[0].message;
  }

  getLatestDate(messages) {
    return messages[0].date;
  }
  getUserById(user_id) {
    return this.UserService.getUserById(user_id);
  }

  getConversations(user_id) {
    return this.ChatService.getConverstaionByUser(user_id);
  }

  ngOnInit() {}
}
