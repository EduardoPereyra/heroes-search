import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a logo with routerLink to /heroes', () => {
    const logoElement = fixture.debugElement.query(By.css('.logo'));
    expect(logoElement).toBeTruthy();
    expect(logoElement.attributes['routerLink']).toBe('/heroes');
  });

  it('should have navigation links with correct routerLink attributes', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('nav ul li'));
    const expectedLinks = ['/heroes', '/villians', '/antiheroes'];

    expect(navLinks.length).toBe(3);
    navLinks.forEach((link, index) => {
      expect(link.attributes['routerLink']).toBe(expectedLinks[index]);
    });
  });
});
