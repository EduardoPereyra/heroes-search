import { Routes } from '@angular/router';
import { HeroesListComponent } from './components/hero/heroes-list/heroes-list.component';
import { HeroCreateEditComponent } from './components/hero/hero-create-edit/hero-create-edit.component';

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
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: HeroesListComponent,
  },
];
