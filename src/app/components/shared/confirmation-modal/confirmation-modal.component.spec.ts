import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmationModalComponent,
  ConfirmationModalData,
} from './confirmation-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmationModalComponent>>;

  const dialogData: ConfirmationModalData = {
    confirmationText: 'Are you sure you want to delete this item?',
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogActions,
        MatDialogClose,
        CommonModule,
        NoopAnimationsModule,
        ConfirmationModalComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<ConfirmationModalComponent>
    >;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the confirmation text', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-dialog-title').textContent).toContain(
      dialogData.confirmationText
    );
  });

  it('should close the dialog when onNoClick is called', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog with true when Yes button is clicked', () => {
    const yesButton = fixture.nativeElement.querySelector('button.yes-button');
    yesButton.click();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with nothing when Cancel button is clicked', () => {
    const noButton = fixture.nativeElement.querySelector(
      'button.cancel-button'
    );
    noButton.click();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });
});
