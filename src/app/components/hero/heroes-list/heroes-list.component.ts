import { Component, OnInit, mergeApplicationConfig } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Hero } from '../../../types/Hero';
import { CommonModule } from '@angular/common';
import { HeroesService } from '../../../services/heroes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { MatDialog } from '@angular/material/dialog';
import { HeroModalComponent } from '../hero-modal/hero-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FilterByNamePipe } from '../../../pipes/filter-by-name.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.heroesService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }

  openDialog(heroInfo?: Hero): void {
    let hero = heroInfo?.name ? Object.assign({}, heroInfo) : undefined;
    const dialogRef = this.dialog.open(HeroModalComponent, {
      data: { ...hero },
    });

    dialogRef.afterClosed().subscribe((hero) => {
      if (hero && hero.name) {
        if (hero.id) {
          let herEditedIndex = this.heroes.findIndex(
            (elem) => elem.id === hero.id
          );
          this.heroes[herEditedIndex] = hero;
          this.openSnackBar('Edited successfully');
        } else {
          hero.id = this.heroes.length + 1;
          this.heroes.push(hero);
          this.openSnackBar('Created successfully');
        }
      }
    });
  }
  deleteHero(hero: Hero): void {
    let index = this.heroes.indexOf(hero);
    if (index !== -1) {
      this.heroes.splice(index, 1);
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
