describe("game_works", () => {
  it("table_has_border", () => {
    cy.visit("/");

    cy.get('table:first').should('have.css', 'border-collapse', 'collapse');
  });
  it("cell_styled", () => {
    cy.visit("/");

    cy.get('td:first').should('have.css', 'height', '59px');
    cy.get('td:first').should('have.css', 'min-width', '60px');
    cy.get('td:first').should('have.css', 'text-align', 'center');
    cy.get('td:first').should('have.css', 'vertical-align', 'middle');
  });
  it("table_reacts_on_click", () => {
    cy.visit("/");

    cy.get('td:first').click();
    cy.get('td:first').should('have.css', 'background-color', 'rgb(124, 252, 0)');
    cy.get('td:first').should('have.css', 'font-family', 'helvetica');
    cy.get('td:first').should('have.css', 'font-size', '30px');
    cy.get('td:first').contains('x');

    cy.get('td').eq(2).click();
    cy.get('td').eq(2).should('have.css', 'background-color', 'rgb(250, 128, 114)');
    cy.get('td').eq(2).should('have.css', 'font-family', 'helvetica');
    cy.get('td').eq(2).should('have.css', 'font-size', '30px');
    cy.get('td').eq(2).contains('o');
  });
  it("table_turn_timeout", () => {
    cy.visit("/");

    cy.get('td:first').click();
    cy.get('td:first').should('have.css', 'background-color', 'rgb(124, 252, 0)');
    cy.get('td:first').contains('x');
    cy.wait(12*1000);
    cy.get('td').eq(2).click();
    cy.get('td').eq(2).should('have.css', 'background-color', 'rgb(124, 252, 0)');
    cy.get('td').eq(2).contains('x');
  });
});