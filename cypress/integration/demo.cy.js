describe('Ultimate QA Automation Practice', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the automation practice page', () => {
    cy.get('h1').should('contain', 'Contact List App');
  });

  it('should fill out and submit login', () => {
    cy.get('#email').type('nsonu398@gmail.com');
    cy.get('#password').type('Password@11');
    cy.contains('Submit').click();
    cy.contains('Add a New Contact').click();
    cy.get('#firstName').type('First Name');
    cy.get('#lastName').type('Last Name');
    cy.get('#birthdate').type('1990-01-01');
    cy.get('#email').type('abc@gmail.com');
    cy.get('#phone').type('9900990099');
    cy.get('#street1').type('Bla Bla Address');
    cy.get('#street2').type('bla bla bla address');
    cy.get('#city').type('City');
    cy.get('#stateProvince').type('State Province');
    cy.get('#postalCode').type('111111');
    cy.get('#country').type('India');
    cy.contains("Submit").click();






    // cy.get('.et_pb_contact_submit').first().click();
    // cy.get('.et-pb-contact-message').first().should('contain', 'Success');
  });

  // it('should fill out and submit the complex form', () => {
  //   cy.get('#et_pb_contact_name_1').type('Jane Doe');
  //   cy.get('#et_pb_contact_message_1').type('This is a test message.');
  //   cy.get('.et_pb_contact_submit').eq(1).click();
  //   cy.get('.et-pb-contact-message').last().should('contain', 'Success');
  // });

  // it('should navigate to other automation practice pages', () => {
  //   cy.contains('Fill out forms').click();
  //   cy.url().should('include', '/filling-out-forms/');
  //   cy.go('back');

  //   cy.contains('Fake landing page').click();
  //   cy.url().should('include', '/fake-landing-page/');
  // });
});
