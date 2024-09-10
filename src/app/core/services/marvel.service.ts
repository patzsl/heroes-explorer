import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IHero, IMarvelApiResponse } from '@shared/models/hero';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private readonly heroesSubject = new BehaviorSubject<IHero[]>([]);
  private readonly currentPageSubject = new BehaviorSubject<number>(1);
  private readonly totalPagesSubject = new BehaviorSubject<number>(0);
  private readonly searchTermSubject = new BehaviorSubject<string>('');
  private readonly cachedHeroes = new Map<number, IHero>();

  readonly heroes$ = this.heroesSubject.asObservable();
  readonly currentPage$ = this.currentPageSubject.asObservable();
  readonly totalPages$ = this.totalPagesSubject.asObservable();

  private readonly API_URL = environment.API_URL;
  private readonly API_KEY = environment.API_KEY;
  private readonly LIMIT = 10;

  constructor(private http: HttpClient) {}

  loadHeroes(): Observable<IHero[]> {
    const offset = (this.currentPageSubject.value - 1) * this.LIMIT;
    const searchTerm = this.searchTermSubject.value;
    const url = this.buildUrl(offset, searchTerm);

    return this.http.get<IMarvelApiResponse>(url).pipe(
      map((response) => {
        this.totalPagesSubject.next(
          Math.ceil(response.data.total / this.LIMIT),
        );
        return response.data.results;
      }),
      tap((heroes) => {
        this.heroesSubject.next(heroes);
        this.cacheHeroes(heroes);
      }),
      catchError(this.handleError<IHero[]>('loadHeroes', [])),
    );
  }

  setPage(page: number): void {
    this.currentPageSubject.next(page);
    this.loadHeroes().subscribe();
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
    this.currentPageSubject.next(1);
    this.loadHeroes().subscribe();
  }

  getHeroById(id: number): Observable<IHero | null> {
    const cachedHero = this.cachedHeroes.get(id);
    if (cachedHero) {
      return of(cachedHero);
    }

    const url = `${this.API_URL}/${id}?apikey=${this.API_KEY}`;
    return this.http.get<IMarvelApiResponse>(url).pipe(
      map((response) => response.data.results[0] || null),
      tap((hero) => {
        if (hero) {
          this.cachedHeroes.set(hero.id, hero);
        }
      }),
      catchError(this.handleError<IHero | null>('getHeroById', null)),
    );
  }

  getCachedHeroById(id: number): IHero | undefined {
    return this.cachedHeroes.get(id);
  }

  searchHeroes(
    term: string,
    offset: number,
    limit: number,
  ): Observable<{ heroes: IHero[]; total: number }> {
    const url = this.buildUrl(offset, term, limit);
    return this.http.get<IMarvelApiResponse>(url).pipe(
      map((response) => ({
        heroes: response.data.results,
        total: response.data.total,
      })),
      catchError(
        this.handleError<{ heroes: IHero[]; total: number }>('searchHeroes', {
          heroes: [],
          total: 0,
        }),
      ),
    );
  }

  private buildUrl(
    offset: number,
    searchTerm?: string,
    limit: number = this.LIMIT,
  ): string {
    let url = `${this.API_URL}?apikey=${this.API_KEY}&limit=${limit}&offset=${offset}`;
    if (searchTerm) {
      url += `&nameStartsWith=${encodeURIComponent(searchTerm)}`;
    }
    return url;
  }

  private cacheHeroes(heroes: IHero[]): void {
    heroes.forEach((hero) => this.cachedHeroes.set(hero.id, hero));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}
