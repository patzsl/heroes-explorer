import { Component } from '@angular/core';
import { MarvelService } from '@core/services/marvel.service';
import { HeaderComponent } from '@features/header/header.component';
import { HeroListComponent } from '@features/heroes-list/heroes-list.component';
import { SearchComponent } from '@features/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SearchComponent, HeroListComponent],
  template: `
    <app-header
      [imgUrl]="imgUrl"
      [title]="title"
      [subtitle]="subtitle"
    ></app-header>
    <div class="container">
      <div class="my-4">
        <app-search (search)="onSearch($event)"></app-search>
      </div>
      <h1 app-title class="ms-2">Featured Characters</h1>
      <app-hero-list></app-hero-list>
    </div>
  `,
})
export class HomeComponent {
  imgUrl = 'https://cdn.marvel.com/content/1x/characters_art_mas_dsk_01.jpg';
  title = 'Marvel Characters';
  subtitle =
    'Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!';

  constructor(private marvelService: MarvelService) {}

  onSearch(term: string): void {
    this.marvelService.setSearchTerm(term);
  }
}
