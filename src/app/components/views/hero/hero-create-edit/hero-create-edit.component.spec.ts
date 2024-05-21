import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HeroCreateEditComponent } from './hero-create-edit.component';
import { Hero } from '../../../../types/Hero';
import { HeroesService } from '../../../../services/heroes.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroCreateEditComponent', () => {
  let component: HeroCreateEditComponent;
  let fixture: ComponentFixture<HeroCreateEditComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  const mockHero: Hero = {
    id: '1',
    name: 'Hero One',
    superpowers: ['Flying'],
    img: '',
  };

  beforeEach(async () => {
    const heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
      'getHeroes',
      'editHero',
      'addHero',
    ]);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'openSnackBar',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HeroCreateEditComponent,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCreateEditComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(
      HeroesService
    ) as jasmine.SpyObj<HeroesService>;
    snackbarService = TestBed.inject(
      SnackbarService
    ) as jasmine.SpyObj<SnackbarService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with hero data if editing', fakeAsync(() => {
    heroesService.getHeroes.and.returnValue(of([mockHero]));
    fixture.detectChanges();
    tick();

    expect(component.hero).toEqual(mockHero);
    expect(component.heroImage).toBe(mockHero.img);
    expect(component.editing).toBe(true);
  }));

  it('should add a superpower', () => {
    component.superpower = 'Invisibility';
    component.addSuperpower();
    expect(component.hero.superpowers).toContain('Invisibility');
    expect(component.superpower).toBe('');
  });

  it('should remove a superpower', () => {
    component.hero.superpowers = ['Flying', 'Invisibility'];
    component.removeSuperpower(1);
    expect(component.hero.superpowers).toEqual(['Flying']);
  });

  it('should navigate back to heroes list on cancel', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should save a new hero and show success message', fakeAsync(() => {
    heroesService.addHero.and.returnValue(Promise.resolve());
    component.hero.name = 'New Hero';
    component.save();
    tick();

    expect(heroesService.addHero).toHaveBeenCalledWith(component.hero);
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
      'Created successfully'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/heroes']);
  }));

  it('should show error message if saving new hero fails', fakeAsync(() => {
    heroesService.addHero.and.returnValue(Promise.reject());
    component.hero.name = 'New Hero';
    component.save();
    tick();

    expect(heroesService.addHero).toHaveBeenCalledWith(component.hero);
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
      'Error while creating'
    );
  }));

  it('should save an edited hero and show success message', fakeAsync(() => {
    heroesService.getHeroes.and.returnValue(of([mockHero]));
    heroesService.editHero.and.returnValue(Promise.resolve());
    fixture.detectChanges();
    tick();

    component.save();
    tick();

    expect(heroesService.editHero).toHaveBeenCalledWith(component.hero);
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
      'Edited successfully'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/heroes']);
  }));

  it('should show error message if editing hero fails', fakeAsync(() => {
    heroesService.getHeroes.and.returnValue(of([mockHero]));
    heroesService.editHero.and.returnValue(Promise.reject());
    fixture.detectChanges();
    tick();

    component.save();
    tick();

    expect(heroesService.editHero).toHaveBeenCalledWith(component.hero);
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
      'Error while editing'
    );
  }));
});
