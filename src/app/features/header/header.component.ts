import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SearchComponent } from '@features/search.component';
import { HeroCardComponent } from '@shared/components/hero-card.component';
import { TitleDirective } from '@shared/directives/title.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeroCardComponent, TitleDirective, SearchComponent],
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
  `,
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input({ required: true }) imgUrl = '';
  @Input({ required: true }) title = '';
  @Input({ required: true }) subtitle = '';

  imgLoaded = false;

  onImageLoad(): void {
    this.imgLoaded = true;
  }
}
