import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { Hero } from '../../../../types/Hero';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmationModalComponent>>;

  const mockHero: Hero = {
    id: '1',
    name: 'Hero One',
    superpowers: ['Flying'],
    img: '',
  };

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    await TestBed.configureTestingModule({
      imports: [
        HeroCardComponent,
        MatCardModule,
        MatButtonModule,
        CommonModule,
        MatIconModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<ConfirmationModalComponent, boolean>
    >;

    component.hero = mockHero;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editHero event when edit is called', () => {
    spyOn(component.editHero, 'emit');
    component.edit();
    expect(component.editHero.emit).toHaveBeenCalledWith(mockHero);
  });

  it('should open confirmation dialog and emit deleteHero event when confirmed', () => {
    dialog.open.and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of(true));
    spyOn(component.deleteHero, 'emit');

    component.confirmDelete();
    expect(dialog.open).toHaveBeenCalledWith(ConfirmationModalComponent, {
      data: {
        confirmationText: `Are you sure you want to delete ${mockHero.name}?`,
      },
    });
    expect(component.deleteHero.emit).toHaveBeenCalledWith(mockHero);
  });

  it('should not emit deleteHero event when deletion is not confirmed', () => {
    dialog.open.and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of(false));
    spyOn(component.deleteHero, 'emit');

    component.confirmDelete();
    expect(dialog.open).toHaveBeenCalledWith(ConfirmationModalComponent, {
      data: {
        confirmationText: `Are you sure you want to delete ${mockHero.name}?`,
      },
    });
    expect(component.deleteHero.emit).not.toHaveBeenCalled();
  });
});
