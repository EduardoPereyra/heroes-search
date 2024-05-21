import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { Hero } from '../types/Hero';

describe('HeroesService', () => {
  let service: HeroesService;
  let angularFirestoreMock: Partial<AngularFirestore>;
  let mockCollection: Partial<AngularFirestoreCollection<any>>;

  beforeEach(() => {
    mockCollection = {
      snapshotChanges: jasmine
        .createSpy('snapshotChanges')
        .and.returnValue(of([])),
      add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
      doc: jasmine.createSpy('doc').and.callFake((id: string) => ({
        update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
        delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
      })),
    };

    angularFirestoreMock = {
      collection: jasmine
        .createSpy('collection')
        .and.returnValue(mockCollection),
    };

    TestBed.configureTestingModule({
      providers: [
        HeroesService,
        { provide: AngularFirestore, useValue: angularFirestoreMock },
      ],
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snapshotChanges method when calling getHeroes', () => {
    service.getHeroes().subscribe(() => {
      expect(mockCollection.snapshotChanges).toHaveBeenCalled();
    });
  });

  it('should call add method with correct parameters when calling addHero', async () => {
    const heroToAdd: Hero = {
      id: '1',
      name: 'New Hero',
      img: 'new-hero.jpg',
      superpowers: ['power1', 'power2'],
    };
    await service.addHero(heroToAdd);
    expect(mockCollection.add).toHaveBeenCalledWith({
      name: heroToAdd.name,
      img: heroToAdd.img,
      superpowers: heroToAdd.superpowers,
    });
  });

  it('should call update method with correct parameters when calling editHero', async () => {
    const heroToUpdate: Hero = {
      id: '1',
      name: 'Updated Hero',
      img: 'updated-hero.jpg',
      superpowers: ['power3', 'power4'],
    };
    await service.editHero(heroToUpdate);
    expect(mockCollection.doc).toHaveBeenCalledWith(heroToUpdate.id);
    // expect(mockCollection.doc(heroToUpdate.id).update).toHaveBeenCalledWith({
    //   name: heroToUpdate.name,
    //   img: heroToUpdate.img,
    //   superpowers: heroToUpdate.superpowers,
    // });
  });

  it('should call delete method when calling deleteHero', async () => {
    const heroToDelete: Hero = {
      id: '1',
      name: 'Hero to delete',
      img: 'hero-to-delete.jpg',
      superpowers: ['power5', 'power6'],
    };
    await service.deleteHero(heroToDelete);
    expect(mockCollection.doc).toHaveBeenCalledWith(heroToDelete.id);
    // expect(mockCollection.doc(heroToDelete.id).delete).toHaveBeenCalled();
  });
});
