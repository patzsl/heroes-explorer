import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { HeroCardComponent } from '@shared/components/hero-card.component';
import { IHero } from '@shared/models/hero';
import { heroMock } from 'mocks/hero.mock';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeroCardComponent],
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

    <div class="container row row-cols-1 row-cols-md-5 g-3 mx-auto">
      @for (hero of heroes; track hero.id) {
        <app-hero-card [hero]="hero"></app-hero-card>
      }
    </div>
  `,
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  //   @Input() imgUrl: string = '';
  //   @Input() title: string = '';
  //   @Input() subtitle: string = '';

  imgLoaded = false;

  heroes: IHero[] = heroMock.data.results;

  onImageLoad() {
    this.imgLoaded = true;
  }

  imgUrl = 'https://cdn.marvel.com/content/1x/characters_art_mas_dsk_01.jpg';
  title = 'Marvel Characters';
  subtitle =
    'Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!';
}
