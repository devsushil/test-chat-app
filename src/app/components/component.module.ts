import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SideBar } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SearchBar } from './search-bar/search-bar.component';
import { User } from './user/user.component';
import { Message } from './message/message.component';
@NgModule({
  declarations: [SideBar, HeaderComponent, SearchBar, User, Message],
  imports: [CommonModule],
  exports: [SideBar, HeaderComponent, SearchBar, User, Message],
  providers: [],
})
export class ComponentModule {}
