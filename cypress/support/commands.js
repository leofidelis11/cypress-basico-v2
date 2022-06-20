Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Fidelis')
    cy.get('#email').type('leofidelis@email.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

})