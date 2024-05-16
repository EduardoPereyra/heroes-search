import { Routes } from '@angular/router';
import { HeroesListComponent } from './components/hero/heroes-list/heroes-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroesListComponent,
  },
];
