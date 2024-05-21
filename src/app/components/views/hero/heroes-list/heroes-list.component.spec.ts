import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import { Hero } from '../../../../types/Hero';
import { HeroesService } from '../../../../services/heroes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let router: jasmine.SpyObj<Router>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  const mockHeroes: Hero[] = [
    { id: '1', name: 'Hero One', superpowers: ['Flying'], img: '' },
    { id: '2', name: 'Hero Two', superpowers: ['Strength'], img: '' },
  ];

  beforeEach(async () => {
    const heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
      'getHeroes',
      'deleteHero',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'openSnackBar',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HeroesListComponent,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(
      HeroesService
    ) as jasmine.SpyObj<HeroesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackbarService = TestBed.inject(
      SnackbarService
    ) as jasmine.SpyObj<SnackbarService>;

    heroesService.getHeroes.and.returnValue(of(mockHeroes));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a list of heroes', () => {
    fixture.detectChanges();
    expect(component.heroes.length).toBe(2);
    expect(component.heroes).toEqual(mockHeroes);
  });

  it('should navigate to the edit hero page when openDialog is called with hero info', () => {
    const hero = mockHeroes[0];
    component.openDialog(hero);
    expect(router.navigate).toHaveBeenCalledWith(['/edit-hero/' + hero.id]);
  });

  it('should navigate to the create hero page when openDialog is called without hero info', () => {
    component.openDialog();
    expect(router.navigate).toHaveBeenCalledWith(['/create-hero']);
  });

  it('should delete a hero and show a success message', fakeAsync(() => {
    heroesService.deleteHero.and.returnValue(Promise.resolve());
    fixture.detectChanges();

    const heroToDelete = mockHeroes[1];
    component.deleteHero(heroToDelete);
    tick();

    expect(heroesService.deleteHero).toHaveBeenCalledWith(heroToDelete);
    expect(component.heroes.length).toBe(1);
    expect(component.heroes).toEqual([mockHeroes[0]]);
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
      'Deleted successfully'
    );
  }));

  it('should show an error message if hero deletion fails', fakeAsync(() => {
    heroesService.deleteHero.and.returnValue(Promise.reject());
    fixture.detectChanges();

    const heroToDelete = mockHeroes[1];
    component.deleteHero(heroToDelete);
    tick();

    expect(heroesService.deleteHero).toHaveBeenCalledWith(heroToDelete);
    expect(component.heroes.length).toBe(2);
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
      'Error while deleting'
    );
  }));
});
