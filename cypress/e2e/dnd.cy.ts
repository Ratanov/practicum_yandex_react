import { selectors } from '../support/constants';

describe('Drag-and-drop', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');
    cy.get(selectors.burgerIngredients.bunItem).should('be.visible');
  });

  it('Перенос ингредиента в заказ', () => {
    cy.get(selectors.burgerIngredients.bunItem).first().trigger('dragstart');

    cy.get(selectors.order.dropArea).should('exist');
    cy.get(selectors.order.dropArea).trigger('drop');

    cy.get(selectors.order.bunTop).should('exist');
    cy.get(selectors.order.bunBottom).should('exist');
  });
});
