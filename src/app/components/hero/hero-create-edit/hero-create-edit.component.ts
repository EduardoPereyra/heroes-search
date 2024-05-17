import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Hero } from '../../../types/Hero';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero-create-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './hero-create-edit.component.html',
  styleUrl: './hero-create-edit.component.scss',
})
export class HeroCreateEditComponent implements OnInit {
  hero: Hero = {
    id: '',
    name: '',
    superpowers: [],
    img: '',
  };
  heroId: string = '';
  superpower: string = '';
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get('id');
    if (heroId) {
      this.heroesService.getHeroes().subscribe((heroes) => {
        const heroData = heroes.find((hero) => hero.id === heroId);
        this.editing = true;
        if (heroData) {
          this.hero = heroData;
        }
      });
    } else {
    }
  }

  removeSuperpower(index: number): void {
    this.hero?.superpowers.splice(index, 1);
  }

  addSuperpower(): void {
    this.hero?.superpowers.push(this.superpower);
    this.superpower = '';
  }

  cancel(): void {
    this.router.navigate(['/heroes']);
  }

  save(): void {
    if (this.editing) {
      this.heroesService.editHero(this.hero);
      this.openSnackBar('Edited successfully');
    } else {
      this.heroesService.addHero(this.hero);
      this.openSnackBar('Created successfully');
    }
    this.router.navigate(['/heroes']);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
