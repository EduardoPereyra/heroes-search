import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Hero } from '../../../../types/Hero';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../../../services/heroes.service';
import { SnackbarService } from '../../../../services/snackbar.service';

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
  heroImage: string = '';
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get('id');
    if (heroId) {
      this.heroesService.getHeroes().subscribe((heroes) => {
        const heroData = heroes.find((hero) => hero.id === heroId);
        this.editing = true;
        if (heroData) {
          this.hero = heroData;
          this.heroImage = heroData.img;
        }
      });
    } else {
    }
  }

  removeSuperpower(index: number): void {
    this.hero?.superpowers.splice(index, 1);
  }

  addSuperpower(): void {
    if (this.superpower) {
      this.hero?.superpowers.push(this.superpower);
      this.superpower = '';
    }
  }

  cancel(): void {
    this.router.navigate(['/heroes']);
  }

  save(): void {
    if (this.hero.name) {
      this.hero.img = this.heroImage;
      if (this.editing) {
        this.heroesService
          .editHero(this.hero)
          .then(() => {
            this.snackbarService.openSnackBar('Edited successfully');
          })
          .catch(() => {
            this.snackbarService.openSnackBar('Error while editing');
          });
      } else {
        this.heroesService
          .addHero(this.hero)
          .then(() => {
            this.snackbarService.openSnackBar('Created successfully');
          })
          .catch(() => {
            this.snackbarService.openSnackBar('Error while creating');
          });
      }
      this.router.navigate(['/heroes']);
    }
  }
}
