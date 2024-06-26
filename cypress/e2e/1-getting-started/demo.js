describe('Sauce Demo', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
    });
  
    it('should display the login page', () => {
      cy.get('.login_logo').should('be.visible');
      cy.get('#user-name').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#login-button').should('be.visible');
    });
  
    it('should login with valid credentials', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item').should('have.length.greaterThan', 0);
    });
  
    it('should display an error with invalid credentials', () => {
      cy.get('#user-name').type('invalid_user');
      cy.get('#password').type('invalid_password');
      cy.get('#login-button').click();
      cy.get('.error-message-container').should('be.visible');
    });
  
    it('should add an item to the cart', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item').first().find('button').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
    });
  
    it('should remove an item from the cart', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item').first().find('button').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('.cart_item').first().find('button').click();
      cy.get('.shopping_cart_badge').should('not.exist');
    });
  });
  