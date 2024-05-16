import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Hero } from '../../../types/Hero';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './hero-modal.component.html',
  styleUrl: './hero-modal.component.scss',
})
export class HeroModalComponent implements OnInit {
  superpower: string = '';
  editing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<HeroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: Hero
  ) {}
  ngOnInit(): void {
    if (!this.hero.name) {
      this.hero.superpowers = [];
    } else {
      this.editing = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeSuperpower(index: number): void {
    this.hero.superpowers.splice(index, 1);
  }

  addSuperpower(): void {
    this.hero.superpowers.push(this.superpower);
    this.superpower = '';
  }
}
