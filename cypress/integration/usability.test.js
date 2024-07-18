describe('Cadastro de Clientes e Advogados', () => {
    it('Deve cadastrar um novo cliente', () => {
      cy.visit('http://localhost:3000/clientes');
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="phone"]').type('123456789');
      cy.get('input[name="caseNumber"]').type('ABC123');
      cy.get('button[type="submit"]').click();
      cy.contains('Cliente cadastrado com sucesso!');
    });
  
    it('Deve cadastrar um novo advogado', () => {
      cy.visit('http://localhost:3000/advogados');
      cy.get('input[name="name"]').type('Jane Smith');
      cy.get('input[name="phone"]').type('987654321');
      cy.get('button[type="submit"]').click();
      cy.contains('Advogado cadastrado com sucesso!');
    });
  });
  