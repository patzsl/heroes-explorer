import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteHeroService } from '@core/services/favorite-hero.service';
import { FavoriteHeroComponent } from '@shared/components/favorite-hero.component';
import { IHero } from '@shared/models/hero';
import { of } from 'rxjs';

describe('FavoriteHeroComponent', () => {
  let component: FavoriteHeroComponent;
  let fixture: ComponentFixture<FavoriteHeroComponent>;

  const mockHero: IHero = {
    id: 1,
    name: 'Spider-Man',
    description: 'Friendly neighborhood Spider-Man',
    modified: '',
    thumbnail: { path: 'path/to/spiderman', extension: 'jpg' },
    resourceURI: '',
    comics: { available: 0, collectionURI: '', items: [], returned: 0 },
    series: { available: 0, collectionURI: '', items: [], returned: 0 },
    stories: { available: 0, collectionURI: '', items: [], returned: 0 },
    events: { available: 0, collectionURI: '', items: [], returned: 0 },
    urls: [],
  };

  beforeEach(async () => {
    const spy = {
      getFavoriteHeroId: jest.fn().mockReturnValue(of(1)),
      getFavoriteHero: jest.fn().mockReturnValue(of(mockHero)),
    };

    await TestBed.configureTestingModule({
      imports: [FavoriteHeroComponent],
      providers: [{ provide: FavoriteHeroService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display favorite hero', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.favorite-hero-mini img').src).toContain(
      'path/to/spiderman.jpg',
    );
    expect(
      compiled.querySelector('.favorite-hero-mini span').textContent,
    ).toContain('Herói Favorito');
  });

  it('should expand on mouse enter', () => {
    component.expand();
    expect(component.isExpanded).toBe(true);
  });

  it('should collapse if not clicked on mouse leave', () => {
    component.isClicked = false;
    component.collapseIfNotClicked();
    expect(component.isExpanded).toBe(false);
  });

  it('should toggle expand on click', () => {
    const event = new MouseEvent('click');
    component.toggleExpand(event);
    expect(component.isClicked).toBe(true);
    expect(component.isExpanded).toBe(true);
  });

  it('should collapse on document click outside component', () => {
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: { closest: () => null } });
    document.dispatchEvent(event);
    expect(component.isExpanded).toBe(false);
    expect(component.isClicked).toBe(false);
  });
});
