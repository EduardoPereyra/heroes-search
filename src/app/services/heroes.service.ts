import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Hero } from '../types/Hero';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  documentName = 'heroes';
  dbCollection: AngularFirestoreCollection<unknown>;

  constructor(private db: AngularFirestore) {
    this.dbCollection = this.db.collection(this.documentName);
  }

  getHeroes(): Observable<Hero[]> {
    return this.dbCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      )
    );
  }

  addHero(hero: Hero): Promise<any> {
    return this.dbCollection.add({
      name: hero.name,
      img: hero.img,
      superpowers: hero.superpowers,
    });
  }

  editHero(hero: Hero): Promise<void> {
    return this.dbCollection.doc(hero.id).update({
      name: hero.name,
      img: hero.img,
      superpowers: hero.superpowers,
    });
  }

  deleteHero(hero: Hero): Promise<void> {
    return this.dbCollection.doc(hero.id).delete();
  }
}
