import { Injectable } from '@angular/core';
import { HEROES } from '../data/heroes';
import { Observable, scheduled, asyncScheduler, delay } from 'rxjs';
import { Hero } from '../types/Hero';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor() {}

  getHeroes(): Observable<Hero[]> {
    return scheduled([HEROES], asyncScheduler).pipe(delay(1500));
  }

  editHero(hero: Hero) {}

  deleteHero() {}
}
