import { selectors } from '../support/constants';

describe('Модальное окно. Открытие и закрытие окна', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');
    cy.get(selectors.burgerIngredients.bunItem).should('be.visible');
  });

  it('Открыть модальное окно при клике на булку и закрыть при клике на "крестик"', () => {
    cy.get(selectors.burgerIngredients.bunItem).first().click();

    cy.get(selectors.modal.contentWrapper).should('be.visible').and('exist');

    cy.get(selectors.modal.close).last().click();
    cy.get(selectors.modal.contentWrapper).should('not.exist');
  });

  it('Открыть модальное окно при клике на булку и закрыть при клике на overlay', () => {
    cy.get(selectors.burgerIngredients.bunItem).first().click();

    cy.get(selectors.modal.contentWrapper).should('be.visible').and('exist');

    cy.get(selectors.modal.overlay).last().click('topLeft', { force: true });
    cy.get(selectors.modal.contentWrapper, { timeout: 5000 }).should(
      'not.exist'
    );
    cy.get(selectors.modal.overlay, { timeout: 5000 }).should('not.exist');

    cy.url().should('eq', 'http://localhost:8080/');
  });
});
