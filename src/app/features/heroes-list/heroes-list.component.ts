import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarvelService } from '@core/services/marvel.service';
import { PaginationComponent } from '@features/pagination.component';

import { HeroCardComponent } from '@shared/components/hero-card.component';
import { IHero } from '@shared/models/hero';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  imports: [AsyncPipe, HeroCardComponent, PaginationComponent],
  template: `
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 mx-auto mb-5"
    >
      @for (hero of heroes$ | async; track hero.id) {
        <app-hero-card [hero]="hero"></app-hero-card>
      }
    </div>
    <div class="my-4">
      <app-pagination
        [currentPage]="(currentPage$ | async) ?? 1"
        [totalPages]="(totalPages$ | async) ?? 1"
        (pageChange)="onPageChange($event)"
      ></app-pagination>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<IHero[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;

  constructor(private marvelService: MarvelService) {
    this.heroes$ = this.marvelService.heroes$;
    this.currentPage$ = this.marvelService.currentPage$;
    this.totalPages$ = this.marvelService.totalPages$;
  }

  ngOnInit(): void {
    this.marvelService.loadHeroes().subscribe();
  }

  onPageChange(page: number): void {
    this.marvelService.setPage(page);
  }
}
