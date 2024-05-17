import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCreateEditComponent } from './hero-create-edit.component';

describe('HeroCreateEditComponent', () => {
  let component: HeroCreateEditComponent;
  let fixture: ComponentFixture<HeroCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCreateEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
