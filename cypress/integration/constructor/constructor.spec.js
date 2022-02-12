describe('Constructor page tests', function () {
  before(() => {
    cy.visit('http://localhost:3001');
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.intercept('POST', '**/orders').as('sendOrder');
    cy.restoreLocalStorage();
  });

  it('should open constructor page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should open and close modal with ingredient details', () => {
    cy.get('[class^=ingredient-item]').first().click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('h2 > svg').click();
    cy.contains('Соберите бургер');
  });

  it('should drag and drop ingredients to burger constructor', () => {
    cy.get('[class^=ingredient-item]').first().as('bunIngredient');
    cy.get('[class^=ingredient-item]').last().as('mainIngredient');
    cy.get('[class^=burger-constructor]').as('dropSection');

    cy.get('@bunIngredient').trigger('dragstart');
    cy.get('@dropSection').trigger('drop');
    cy.get('@mainIngredient').trigger('dragstart');
    cy.get('@dropSection').trigger('drop');
  });

  it('should make order, open and close modal with order detail', () => {
    cy.get('button').contains('Оформить заказ').click();
    cy.contains('Заказ отправляется...');
    cy.wait('@sendOrder');
    cy.contains('Идентификатор заказа').should('be.visible');
    cy.get('[class^=modal_modalContainerNoTitle] > svg').click();
    cy.contains('Соберите бургер');
  });
});
