import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../components/component.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
];
@NgModule({
  declarations: [HomePage],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    ComponentModule,
  ],
  providers: [],
  bootstrap: [],
})
export class PagesModule {}
