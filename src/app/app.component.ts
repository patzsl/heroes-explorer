import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FavoriteHeroComponent } from '@shared/components/favorite-hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FavoriteHeroComponent],
  template: `
    <app-favorite-hero></app-favorite-hero>
    <div class="main-content" [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  styles: [
    `
      .main-content {
        position: relative;
        overflow: hidden;
      }
    `,
  ],
  animations: [
    trigger('routeAnimations', [
      transition('preLoading => heroList', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0.9,
        }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet): string | undefined {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
