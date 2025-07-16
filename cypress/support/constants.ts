export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const userLogin = {
  email: 'oleg@ratanov.pro',
  password: 'test',
};

const getSelector = (tag: keyof HTMLElementTagNameMap, dataValue: string) =>
  `${tag}[data-cy='${dataValue}']`;

export const selectors = {
  burgerIngredients: {
    bunList: getSelector('ul', 'burger-ingredients-bun'),
    bunItem: getSelector('li', 'burger-ingredients-item-bun'),
  },
  modal: {
    overlay: getSelector('div', 'modal-overlay'),
    close: getSelector('button', 'modal-close'),
    contentWrapper: getSelector('div', 'modal-content-wrapper'),
  },
  order: {
    number: getSelector('h2', 'order-number'),
    submitButton: getSelector('button', 'order-submit-button'),
    dropArea: getSelector('article', 'order-drop-area'),
    bunTop: getSelector('div', 'order-bun-top'),
    bunBottom: getSelector('div', 'order-bun-bottom'),
    innerIngredients: getSelector('ul', 'order-inner-ingredients'),
  },
  loginForm: {
    email: getSelector('input', 'login-form-email'),
    password: getSelector('input', 'login-form-password'),
  },
};
