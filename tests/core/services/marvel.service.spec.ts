/* eslint-disable @typescript-eslint/no-explicit-any */

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MarvelService } from '@core/services/marvel.service';
import { environment } from '@environments/environment';
import { IHero, IMarvelApiResponse } from '@shared/models/hero';
import { of } from 'rxjs';
import { heroMock } from '../../../src/mocks/hero.mock';

describe('MarvelService', () => {
  let service: MarvelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MarvelService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(MarvelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildUrl', () => {
    it('should build URL with default limit', () => {
      const url = (service as any).buildUrl(0);
      expect(url).toContain('apikey=');
      expect(url).toContain('limit=10');
      expect(url).toContain('offset=0');
    });

    it('should build URL with search term', () => {
      const url = (service as any).buildUrl(0, 'Spider-Man');
      expect(url).toContain('nameStartsWith=Spider-Man');
    });

    it('should build URL with custom limit', () => {
      const url = (service as any).buildUrl(0, undefined, 10);
      expect(url).toContain('limit=10');
    });
  });

  describe('cacheHeroes', () => {
    it('should cache heroes', () => {
      const heroes: IHero[] = [
        {
          id: 1,
          name: 'Hero 1',
          description: '',
          modified: '',
          thumbnail: { path: '', extension: '' },
          resourceURI: '',
          comics: { available: 0, collectionURI: '', items: [], returned: 0 },
          series: { available: 0, collectionURI: '', items: [], returned: 0 },
          stories: { available: 0, collectionURI: '', items: [], returned: 0 },
          events: { available: 0, collectionURI: '', items: [], returned: 0 },
          urls: [],
        },
        {
          id: 2,
          name: 'Hero 2',
          description: '',
          modified: '',
          thumbnail: { path: '', extension: '' },
          resourceURI: '',
          comics: { available: 0, collectionURI: '', items: [], returned: 0 },
          series: { available: 0, collectionURI: '', items: [], returned: 0 },
          stories: { available: 0, collectionURI: '', items: [], returned: 0 },
          events: { available: 0, collectionURI: '', items: [], returned: 0 },
          urls: [],
        },
      ];
      (service as any).cacheHeroes(heroes);
      expect((service as any).cachedHeroes.size).toBe(2);
    });
  });

  describe('handleError', () => {
    it('should handle error and return default result', (done) => {
      const handleError = (service as any).handleError('test', []);
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      handleError(new Error('Test error')).subscribe((result: any) => {
        expect(result).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('test falhou: Test error');
        consoleErrorSpy.mockRestore();
        done();
      });
    });
  });

  describe('loadHeroes', () => {
    it('should load heroes and update subjects', () => {
      const mockResponse: IMarvelApiResponse = heroMock;

      service.loadHeroes().subscribe((heroes) => {
        expect(heroes.length).toBe(20);
        expect(heroes[0].name).toBe('3-D Man');
        expect(heroes[1].name).toBe('A-Bomb (HAS)');
      });

      const req = httpMock.expectOne((request) =>
        request.url.startsWith(environment.API_URL),
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(service['totalPagesSubject'].value).toBe(157);
      expect(service['heroesSubject'].value.length).toBe(20);
      expect(service['cachedHeroes'].size).toBe(20);
    });
  });

  describe('setPage', () => {
    it('should update currentPageSubject and call loadHeroes', () => {
      const loadHeroesSpy = jest
        .spyOn(service, 'loadHeroes')
        .mockReturnValue(of([]));
      service.setPage(2);
      expect(service['currentPageSubject'].value).toBe(2);
      expect(loadHeroesSpy).toHaveBeenCalled();
    });
  });

  describe('setSearchTerm', () => {
    it('should update searchTermSubject, reset page, and call loadHeroes', () => {
      const loadHeroesSpy = jest
        .spyOn(service, 'loadHeroes')
        .mockReturnValue(of([]));
      service.setSearchTerm('Spider-Man');
      expect(service['searchTermSubject'].value).toBe('Spider-Man');
      expect(service['currentPageSubject'].value).toBe(1);
      expect(loadHeroesSpy).toHaveBeenCalled();
    });
  });

  describe('getHeroById', () => {
    it('should return cached hero if available', (done) => {
      const mockHero: IHero = { id: 1, name: 'Cached Hero' } as IHero;
      service['cachedHeroes'].set(1, mockHero);

      service.getHeroById(1).subscribe((hero) => {
        expect(hero).toEqual(mockHero);
        done();
      });
    });

    it('should fetch hero from API if not cached', () => {
      const mockResponse: IMarvelApiResponse = {
        ...heroMock,
        data: {
          ...heroMock.data,
          results: [{ id: 2, name: 'API Hero' } as IHero],
        },
      };

      service.getHeroById(2).subscribe((hero) => {
        expect(hero?.name).toBe('API Hero');
      });

      const req = httpMock.expectOne(
        `${environment.API_URL}/2?apikey=${environment.API_KEY}`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(service['cachedHeroes'].get(2)?.name).toBe('API Hero');
    });
  });

  describe('getCachedHeroById', () => {
    it('should return cached hero if available', () => {
      const mockHero: IHero = { id: 1, name: 'Cached Hero' } as IHero;
      service['cachedHeroes'].set(1, mockHero);

      const result = service.getCachedHeroById(1);
      expect(result).toEqual(mockHero);
    });

    it('should return undefined if hero is not cached', () => {
      const result = service.getCachedHeroById(999);
      expect(result).toBeUndefined();
    });
  });

  describe('searchHeroes', () => {
    it('should search heroes with given parameters', () => {
      const mockResponse: IMarvelApiResponse = heroMock;

      service.searchHeroes('Spider', 0, 5).subscribe((result) => {
        expect(result.heroes.length).toBe(2);
        expect(result.total).toBe(10);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url.startsWith(environment.API_URL) &&
          request.url.includes('nameStartsWith=Spider'),
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
