import { Injectable } from '@angular/core';
import { IHero } from '@shared/models/hero';
import { Observable, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MarvelService } from './marvel.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteHeroService {
  private favoriteHeroIdSubject = new ReplaySubject<number | null>(1);

  constructor(
    private marvelService: MarvelService,
    private storageService: StorageService,
  ) {
    this.initFavoriteHeroObservable();
  }

  private initFavoriteHeroObservable(): void {
    this.storageService
      .getItem$('selectedHeroId')
      .pipe(
        distinctUntilChanged(),
        switchMap((id) => of(id ? Number(id) : null)),
      )
      .subscribe((id) => this.favoriteHeroIdSubject.next(id));
  }

  getFavoriteHeroId(): Observable<number | null> {
    return this.favoriteHeroIdSubject.asObservable();
  }

  getFavoriteHero(): Observable<IHero | null> {
    return this.getFavoriteHeroId().pipe(
      switchMap((heroId) => this.getHeroById(heroId)),
    );
  }

  setFavoriteHeroId(heroId: number | null): void {
    if (heroId === null) {
      this.storageService.removeItem('selectedHeroId');
    } else {
      this.storageService.setItem('selectedHeroId', heroId.toString());
    }
    this.favoriteHeroIdSubject.next(heroId);
  }

  private getHeroById(heroId: number | null): Observable<IHero | null> {
    if (!heroId) {
      return of(null);
    }
    return this.marvelService.getHeroById(heroId);
  }
}
