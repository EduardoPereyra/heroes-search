import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [SnackbarService, { provide: MatSnackBar, useValue: spy }],
    });
    service = TestBed.inject(SnackbarService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar open method with correct parameters', () => {
    const message = 'Test message';
    service.openSnackBar(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000,
      panelClass: 'success-dialog',
    });
  });
});
