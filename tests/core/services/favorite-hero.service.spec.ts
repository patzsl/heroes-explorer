import { TestBed } from '@angular/core/testing';
import { FavoriteHeroService } from '@core/services/favorite-hero.service';
import { MarvelService } from '@core/services/marvel.service';
import { StorageService } from '@core/services/storage.service';
import { of } from 'rxjs';

describe('FavoriteHeroService', () => {
  let favoriteHeroService: FavoriteHeroService;
  let storageServiceMock: jest.Mocked<StorageService>;
  let marvelServiceMock: jest.Mocked<MarvelService>;

  beforeEach(() => {
    storageServiceMock = {
      getItem$: jest.fn().mockReturnValue(of(null)),
      setItem: jest.fn().mockResolvedValue(undefined),
      removeItem: jest.fn().mockResolvedValue(undefined),
    } as jest.Mocked<StorageService>;

    marvelServiceMock = {
      getHeroById: jest.fn(),
    } as any; //eslint-disable-line

    TestBed.configureTestingModule({
      providers: [
        FavoriteHeroService,
        { provide: StorageService, useValue: storageServiceMock },
        { provide: MarvelService, useValue: marvelServiceMock },
      ],
    });

    favoriteHeroService = TestBed.inject(FavoriteHeroService);
  });

  it('should be created', () => {
    expect(favoriteHeroService).toBeTruthy();
  });

  describe('getFavoriteHeroId', () => {
    it('should return null if no favorite hero id in storage', (done) => {
      storageServiceMock.getItem$.mockReturnValue(of(null));

      favoriteHeroService.getFavoriteHeroId().subscribe((id) => {
        expect(id).toBeNull();
        expect(storageServiceMock.getItem$).toHaveBeenCalledWith(
          'selectedHeroId',
        );
        done();
      });
    });
  });

  describe('setFavoriteHeroId', () => {
    it('should set favorite hero id in storage', () => {
      favoriteHeroService.setFavoriteHeroId(1);
      expect(storageServiceMock.setItem).toHaveBeenCalledWith(
        'selectedHeroId',
        '1',
      );
    });

    it('should remove favorite hero id from storage when null', () => {
      favoriteHeroService.setFavoriteHeroId(null);
      expect(storageServiceMock.removeItem).toHaveBeenCalledWith(
        'selectedHeroId',
      );
    });
  });

  describe('getFavoriteHero', () => {
    it('should return null if no favorite hero id in storage', (done) => {
      storageServiceMock.getItem$.mockReturnValue(of(null));

      favoriteHeroService.getFavoriteHero().subscribe((hero) => {
        expect(hero).toBeNull();
        expect(storageServiceMock.getItem$).toHaveBeenCalledWith(
          'selectedHeroId',
        );
        expect(marvelServiceMock.getHeroById).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
