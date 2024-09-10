import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IHero } from '@shared/models/hero';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FavoriteHeroService } from '../../core/services/favorite-hero.service';

@Component({
  selector: 'app-favorite-hero',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <ng-container *ngIf="favoriteHero$ | async as favoriteHero">
      <div
        class="favorite-hero-container"
        (mouseenter)="expand()"
        (mouseleave)="collapseIfNotClicked()"
        (click)="toggleExpand($event)"
      >
        <div class="favorite-hero-pill" [class.expanded]="isExpanded">
          @if (favoriteHero && !isExpanded) {
            <div class="favorite-hero-mini">
              <img
                [src]="
                  favoriteHero.thumbnail.path +
                  '.' +
                  favoriteHero.thumbnail.extension
                "
                [alt]="favoriteHero.name"
              />
              <span>Herói Favorito</span>
            </div>
          }
          @if (favoriteHero && isExpanded) {
            <div class="favorite-hero-expanded">
              <img
                [src]="
                  favoriteHero.thumbnail.path +
                  '.' +
                  favoriteHero.thumbnail.extension
                "
                [alt]="favoriteHero.name"
              />
              <div class="favorite-hero__info">
                <h3>{{ favoriteHero.name }}</h3>
                <p>Herói Favorito</p>
              </div>
            </div>
          }
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .favorite-hero-container {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        width: 90%;
        max-width: 300px;
      }
      .favorite-hero-pill {
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        border-radius: 50px;
        padding: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        overflow: hidden;
      }
      .favorite-hero-pill.expanded {
        border-radius: 12px;
        padding: 15px;
      }
      .favorite-hero-mini {
        display: flex;
        align-items: center;
        padding: 5px 10px;
      }
      .favorite-hero-mini img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .favorite-hero-mini span {
        color: white;
        font-size: 14px;
      }
      .favorite-hero-expanded {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
      }
      .favorite-hero-expanded img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 15px;
        margin-bottom: 0;
      }
      .favorite-hero__info {
        color: white;
        text-align: left;
        flex: 1;
      }
      .favorite-hero__info h3 {
        margin: 0;
        font-size: 1.4em;
      }
      .favorite-hero__info p {
        margin: 5px 0 0;
        font-size: 0.9em;
      }
      @media (min-width: 768px) {
        .favorite-hero-container {
          width: auto;
          max-width: 400px;
          left: 50%;
          transform: translateX(-50%);
        }
        .favorite-hero-expanded img {
          width: 80px;
          height: 80px;
          margin-bottom: 0;
        }
        .favorite-hero__info {
          text-align: left;
          flex: 1;
        }
        .favorite-hero__info h3 {
          font-size: 1.4em;
        }
      }
      @media (min-width: 1024px) {
        .favorite-hero-container {
          max-width: 450px;
        }
        .favorite-hero-expanded img {
          width: 100px;
          height: 100px;
        }
        .favorite-hero__info h3 {
          font-size: 1.6em;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteHeroComponent implements OnInit, OnDestroy {
  favoriteHero$: Observable<IHero | null>;
  isExpanded = false;
  isClicked = false;
  private subscription: Subscription = new Subscription();

  constructor(private favoriteHeroService: FavoriteHeroService) {
    this.favoriteHero$ = this.favoriteHeroService
      .getFavoriteHeroId()
      .pipe(switchMap(() => this.favoriteHeroService.getFavoriteHero()));
  }

  ngOnInit() {
    this.subscription = this.favoriteHero$.subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  expand() {
    this.isExpanded = true;
  }

  collapseIfNotClicked() {
    if (!this.isClicked) {
      this.isExpanded = false;
    }
  }

  toggleExpand(event: MouseEvent) {
    event.stopPropagation();
    this.isClicked = !this.isClicked;
    this.isExpanded = this.isClicked;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const favoriteHeroElement = (event.target as HTMLElement).closest(
      '.favorite-hero-container',
    );
    if (!favoriteHeroElement) {
      this.isExpanded = false;
      this.isClicked = false;
    }
  }
}
