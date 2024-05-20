import { Routes } from '@angular/router';
import { HeroesListComponent } from './components/views/hero/heroes-list/heroes-list.component';
import { HeroCreateEditComponent } from './components/views/hero/hero-create-edit/hero-create-edit.component';
import { IncomingComponent } from './components/shared/incoming/incoming.component';

export const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesListComponent,
  },
  {
    path: 'create-hero',
    component: HeroCreateEditComponent,
  },
  {
    path: 'edit-hero/:id',
    component: HeroCreateEditComponent,
  },
  {
    path: 'villians',
    component: IncomingComponent,
  },
  {
    path: 'antiheroes',
    component: IncomingComponent,
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: HeroesListComponent,
  },
];
