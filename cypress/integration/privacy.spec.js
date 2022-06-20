Cypress._.times(5, function(){  //essa função repete o teste pelo numero de vezes q vc pedir, vem do lodash
    it('testa a página de política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
  
        cy.contains('Talking About Testing').should('be.visible')
  
      })
})