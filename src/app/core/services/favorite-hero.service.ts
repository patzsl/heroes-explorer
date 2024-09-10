import { Injectable } from '@angular/core';
import { IHero } from '@shared/models/hero';
import { BehaviorSubject, fromEvent, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { MarvelService } from './marvel.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteHeroService {
  private favoriteHeroIdSubject = new BehaviorSubject<number | null>(null);

  constructor(private marvelService: MarvelService) {
    this.initFavoriteHeroObservable();
  }

  private initFavoriteHeroObservable(): void {
    fromEvent(window, 'storage')
      .pipe(
        startWith(null),
        map(() => localStorage.getItem('favoriteHeroId')),
        distinctUntilChanged(),
        map((id) => (id ? Number(id) : null)),
      )
      .subscribe((id) => this.favoriteHeroIdSubject.next(id));
  }

  getFavoriteHeroId(): Observable<number | null> {
    return this.favoriteHeroIdSubject.asObservable();
  }

  getFavoriteHero(): Observable<IHero | null> {
    return this.getFavoriteHeroId().pipe(
      switchMap((heroId) => {
        if (!heroId) {
          return of(null);
        }
        const cachedHero = this.marvelService.getCachedHeroById(heroId);
        return cachedHero
          ? of(cachedHero)
          : this.marvelService.getHeroById(heroId);
      }),
    );
  }

  setFavoriteHeroId(heroId: number | null): void {
    if (heroId === this.favoriteHeroIdSubject.value) {
      localStorage.removeItem('favoriteHeroId');
      this.favoriteHeroIdSubject.next(null);
    } else {
      localStorage.setItem('favoriteHeroId', heroId?.toString() ?? '');
      this.favoriteHeroIdSubject.next(heroId);
    }
  }
}
