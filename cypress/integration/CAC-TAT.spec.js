/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {     
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() { //com longos textos, função delay pode cortar o tempo de escrita
        const longText = 'testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... testando, 1,2,3... '
        
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Fidelis')
        cy.get('#email').type('leofidelis@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe ensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function() {     
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Fidelis')
        cy.get('#email').type('leofidelis@email,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com um valor não-numérico', function(){
        cy.get('#phone')
            .type('abcdef')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Fidelis')
        cy.get('#email').type('leofidelis@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos de nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Leonardo')
          .should('have.value', 'Leonardo')
          .clear()
          .should('have.value', '')
          cy.get('#lastName')
          .type('Fidelis')
          .should('have.value', 'Fidelis')
          .clear()
          .should('have.value', '')
          cy.get('#email')
          .type('leofidelis@email.com')
          .should('have.value', 'leofidelis@email.com')
          .clear()
          .should('have.value', '')
          cy.get('#phone')
          .type('123456')
          .should('have.value', '123456')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('envia formulário com sucesso  usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Testar o click do botão com a função contains', function(){
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Fidelis')
        cy.get('#email').type('leofidelis@email.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (.value)', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('Marca ambos os checkboxes e depois desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('seleciona o arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acesa a página de política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      
      cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página de política de privacidade de forma independente', function(){
      cy.visit('./src/privacy.html')

      cy.contains('Talking About Testing').should('be.visible')

    })

  })