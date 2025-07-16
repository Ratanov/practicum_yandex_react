import { selectors, userLogin } from '../support/constants';
import user from '../fixtures/user.json';

describe('Создание заказа. Авторизация. Dыбор ингредиентов Drag-and-drop. Отправка и проверка заказа', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/auth/login', { fixture: 'user.json' }).as(
      'login'
    );
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('#/');
    cy.visit('#/login');

    cy.get(selectors.loginForm.email).type(userLogin.email);
    cy.get(selectors.loginForm.password).type(`${userLogin.password}{enter}`);
    cy.wait('@login');

    cy.url().should('not.include', '#/login');

    cy.visit('#/');
    cy.wait('@getIngredients');

    cy.get(selectors.burgerIngredients.bunItem).should('be.visible');
  });

  it('Перенос ингредиентов, отправка и проверка результата', () => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.setCookie('accessToken', user.accessToken);
    cy.setCookie('refreshToken', user.refreshToken);

    cy.get(selectors.burgerIngredients.bunItem).first().trigger('dragstart');

    cy.get(selectors.order.dropArea).should('exist').trigger('drop');

    cy.get(selectors.order.bunTop).should('exist');
    cy.get(selectors.order.bunBottom).should('exist');

    cy.get(selectors.order.submitButton).should('be.enabled').click();

    cy.wait('@createOrder', { timeout: 10000 });

    cy.get(selectors.modal.contentWrapper, { timeout: 5000 })
      .should('be.visible')
      .and('exist');
    cy.get(selectors.order.number).should('exist').and('not.be.empty');

    cy.get(selectors.modal.close).click({ force: true });
    cy.get(selectors.modal.contentWrapper, { timeout: 5000 }).should(
      'not.exist'
    );
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
