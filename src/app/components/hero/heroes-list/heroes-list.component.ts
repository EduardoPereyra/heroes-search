import { Component, OnInit } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Hero } from '../../../types/Hero';
import { CommonModule } from '@angular/common';
import { HeroesService } from '../../../services/heroes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FilterByNamePipe } from '../../../pipes/filter-by-name.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
  imports: [
    HeroCardComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LoaderComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FilterByNamePipe,
  ],
})
export class HeroesListComponent implements OnInit {
  heroes: Array<Hero> = [];
  searchByName: string = '';
  timeout: any = null;

  constructor(
    private heroesService: HeroesService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      console.log(this.heroes);
    });
  }

  openDialog(heroInfo?: Hero): void {
    if (heroInfo?.name) {
      this.router.navigate(['/edit-hero/' + heroInfo?.id]);
    } else {
      this.router.navigate(['/create-hero']);
    }
  }

  deleteHero(hero: Hero): void {
    let index = this.heroes.indexOf(hero);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      this.heroesService.deleteHero(hero);
      this.openSnackBar('Deleted successfully');
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
