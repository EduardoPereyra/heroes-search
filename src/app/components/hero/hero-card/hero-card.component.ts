import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../../types/Hero';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  @Output() editHero: EventEmitter<Hero> = new EventEmitter();
  @Output() deleteHero: EventEmitter<Hero> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  edit() {
    this.editHero.emit(this.hero);
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        confirmationText: `Are you sure you want to delete ${this.hero.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.deleteHero.emit(this.hero);
      }
    });
  }
}
