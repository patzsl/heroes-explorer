import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteHeroService } from '@core/services/favorite-hero.service';
import { IHero } from '@models/hero';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-hero-card',
  imports: [RouterModule, CommonModule],
  template: `
    <div class="card">
      <a class="card-link" [routerLink]="['/heroes', hero.id]">
        <div class="card-thumb--frame">
          <figure class="img__wrapper">
            <img
              [src]="hero.thumbnail.path + '.' + hero.thumbnail.extension"
              [alt]="hero.name"
              class="responsive-img"
            />
          </figure>
        </div>
        <div class="card-body is-sliding">
          <p class="card-body__headline">{{ hero.name }}</p>
          <div class="card-footer">
            <p class="card-footer__secondary-text">
              {{ hero.description | slice: 0 : 50
              }}{{ hero.description.length > 50 ? '...' : '' }}
            </p>
            <p class="card-footer__micro-description"></p>
          </div>
        </div>
      </a>
      <button
        class="favorite-button"
        (click)="toggleFavorite()"
        [class.favorite]="isFavorite"
      >
        <span class="favorite-icon">{{ isFavorite ? '❤️' : '🤍' }}</span>
      </button>
    </div>
  `,
  styles: [
    `
      *,
      :after,
      :before {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .card {
        margin: 6px 0 4px;
        box-sizing: border-box;
        position: relative;
        color: #fff;
        max-width: 100%;
        transition: color 0.3s;
        max-width: 192px;
        border: none;
        &::after {
          border-color: transparent #fff transparent transparent;
          border-style: solid;
          border-width: 12px 12px 0 0;
          bottom: 0;
          content: '';
          position: absolute;
          right: 0;
          top: auto;
          z-index: 40;
        }
        &:hover {
          .card-body::before {
            transform: translate3d(0, 100%, 0);
          }
          figure img {
            transform: scale3d(1.05, 1.05, 1);
          }
        }
        .favorite-button {
          border: none;
          background: none;
          font-size: 1.6rem;
          position: absolute;
          right: 0;
          &:hover {
            cursor: pointer;
            transform: scale(1.1);
          }
        }
        a.card-link {
          text-decoration: none;
          .card-thumb {
            &--frame {
              background: #e62429;
              margin: 0;
              overflow: hidden;
              padding: 0;
            }
          }
          .card-body {
            padding: 16px 24px 17px 20px;
            overflow: hidden;
            position: relative;
            line-height: 1;
            -moz-osx-font-smoothing: grayscale;
            background: none;
            border: none;
            color: inherit;
            height: 145px;
            padding: 16px 24px 17px 16px;
            position: relative;
            vertical-align: middle;
            z-index: 30;
            &::before {
              background: #e62429;
              bottom: 100%;
              content: '';
              height: 100%;
              left: 0;
              position: absolute;
              transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
              transition: transform 0.3s;
              width: 100%;
              z-index: -1;
            }
            &.is-sliding {
              background: #151515;
              color: #e62429;
              transition: color 0.3s;
              &:hover {
                &::before {
                  transform: translate3d(0, 100%, 0);
                }
              }
              .card-body__headline {
                color: #fff;
                font:
                  400 16px / 1.1 RobotoCondensed Bold,
                  Trebuchet MS,
                  Helvetica,
                  Arial,
                  sans-serif;
                letter-spacing: 1px;
                text-transform: uppercase;
              }
              &::before {
                background: #e62429;
                bottom: 100%;
                content: '';
                height: 100%;
                left: 0;
                position: absolute;
                transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
                transition: transform 0.3s;
                width: 100%;
                z-index: -1;
              }
            }
            .card-footer {
              bottom: 17px;
              position: absolute;
              padding-right: 10px;
              text-align: left;
              &__secondary-text {
                color: #bbb;
                letter-spacing: 1px;
                text-transform: uppercase;
                transform: translate3d(0) scale(1);
                transition: all 0.17s ease-in-out;
                font:
                  400 12px / 1 RobotoCondensed Bold,
                  Trebuchet MS,
                  Helvetica,
                  Arial,
                  sans-serif;
              }
              &__micro-description {
                color: #767676;
                text-transform: uppercase;
                letter-spacing: 1px;
                text-transform: uppercase;
                transform: translate3d(0) scale(1);
                transition: all 0.17s ease-in-out;
              }
            }
          }
        }
      }

      @media (max-width: 575px) {
        .card {
          max-width: 100% !important;
        }
        figure.img__wrapper {
          height: auto !important;
        }
      }

      @media (min-width: 601px) {
        .card .card-thumb--frame .img__wrapper {
          height: 210px;
        }
      }

      .card .card-thumb--frame .img__wrapper {
        position: relative;
        overflow: hidden;
        height: 170px;
      }

      figure.img__wrapper {
        margin: 0;
        padding: 0;
        overflow: hidden;
        &::after {
          height: 4px;
          content: '';
          background-color: #e62429;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        img {
          transform: scaleX(1);
          transition: all 0.2s linear;
          overflow: hidden;
          object-position: top center;
          display: block;
          margin: 0;
          object-fit: cover;
          object-position: center center;
          padding: 0;
          width: 100%;
          height: 100%;
          &.responsive-img {
            width: 100%; // Faz a imagem ocupar toda a largura
            height: auto; // Mantém a proporção da imagem
          }
          &::after {
            position: absolute;
            content: '';
            display: block;
            background-color: #151515;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    `,
  ],
  standalone: true,
})
export class HeroCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) hero!: IHero;
  isFavorite = false;
  private subscription: Subscription | undefined;

  constructor(private favoriteHeroService: FavoriteHeroService) {}

  ngOnInit(): void {
    this.subscription = this.favoriteHeroService
      .getFavoriteHeroId()
      .subscribe((favoriteHeroId) => {
        this.isFavorite = favoriteHeroId === this.hero.id;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoriteHeroService.setFavoriteHeroId(null);
    } else {
      this.favoriteHeroService.setFavoriteHeroId(this.hero.id);
    }
  }
}
