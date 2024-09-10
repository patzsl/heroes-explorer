import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { HeroCardComponent } from '@shared/components/hero-card.component';
import { TitleDirective } from '@shared/directives/title.directive';
import { IHero } from '@shared/models/hero';
import { heroMock } from 'mocks/hero.mock';
import { HeroListComponent } from '../heroes-list/heroes-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeroCardComponent, TitleDirective, HeroListComponent],
  template: `
    <div
      class="hero"
      [ngStyle]="{
        background: imgLoaded
          ? 'linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0, rgba(0, 0, 0, 0.2))'
          : '#f0f0f0',
      }"
    >
      <img
        [src]="imgUrl"
        (load)="onImageLoad()"
        alt="Hero Image"
        class="hero__image"
        priority
      />
      <div class="hero__content">
        <h1 class="hero__title">{{ title }}</h1>
        <p class="hero__subtitle">{{ subtitle }}</p>
      </div>
    </div>

    <div class="container">
      <h1 app-title class="ms-2">Featured Characters</h1>
      <app-hero-list></app-hero-list>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  //   @Input({ required: true }) imgUrl: string = '';
  //   @Input({ required: true }) title: string = '';
  //   @Input({ required: true }) subtitle: string = '';

  imgLoaded = false;

  heroes: IHero[] = heroMock.data.results;

  onImageLoad(): void {
    this.imgLoaded = true;
  }

  imgUrl = 'https://cdn.marvel.com/content/1x/characters_art_mas_dsk_01.jpg';
  title = 'Marvel Characters';
  subtitle =
    'Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!';
}
