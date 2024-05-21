import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RouterOutlet, provideRouter, withRouterConfig } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, NavbarComponent, RouterOutlet, AppComponent],
      providers: [provideRouter([], withRouterConfig({}))],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'heroes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('heroes');
  });

  it('should render NavbarComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-navbar')).not.toBeNull();
  });

  it('should render FooterComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });

  it('should contain a RouterOutlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).not.toBeNull();
  });
});
