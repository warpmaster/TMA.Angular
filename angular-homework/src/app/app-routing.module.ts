import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsListComponent } from './cards-list/cards-list.component'

const routes: Routes = [
  { path: 'users', component: CardsListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
