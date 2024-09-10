import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MarvelService } from '../src/app/core/services/marvel.service';
import { HomeComponent } from '../src/app/pages/home.component';

describe('HomeComponent', () => {
  beforeEach(() => {
    cy.mount(HomeComponent, {
      providers: [MarvelService, provideHttpClient(), provideRouter([])],
    });
  });

  it('should render the component', () => {
    cy.get('app-home', { timeout: 10000 }).should('exist');
  });

  it('should display the title "Marvel Characters"', () => {
    cy.get('h1').should('contain.text', 'Marvel Characters');
  });

  it('should display the search component', () => {
    cy.get('app-search').should('exist');
  });

  it('should display pagination', () => {
    cy.get('app-pagination').should('exist');
  });

  it('should display the favorite hero', () => {
    cy.get('app-hero-card').should('exist');

    cy.get('app-hero-card').first().find('.favorite-button').click();
    cy.get('app-favorite-hero').should('exist');
  });

  it('should perform a search', () => {
    cy.get('.search-input').type('Spider-Man');
    cy.get('button[type="submit"]').click();
    cy.get('app-heroes-list').should('contain.text', 'Spider-Man');
  });

  it('should change page', () => {
    cy.get('app-pagination button').contains('2').click();
    cy.get('app-heroes-list').should('exist');
  });

  it('should display the hero list', () => {
    cy.intercept('GET', '**/characters*').as('getHeroes');

    cy.wait('@getHeroes', { timeout: 10000 });

    cy.get('app-heroes-list').scrollIntoView();
    cy.get('app-heroes-list', { timeout: 10000 }).should('be.visible');

    cy.get('app-heroes-list').within(() => {
      cy.get('.hero-card').should('have.length.gt', 0);
    });
  });
});
