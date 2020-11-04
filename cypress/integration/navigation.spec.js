describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday").click().should("have.class", "day-list__item--selected");
  }) 

  // it("should book an interview", () => {

  //   // Visits the root of our web server
  //   cy.visit("/");
  //   // Clicks on the "Add" button in the second appointment
  //   cy.get('.appointment__add-button').click()
  //   // Enters their name
  //   cy.get('[data-testid=student-name-input]').type("Alexander Scaini")
  //   // Chooses an interviewer
  //   cy.get(':nth-child(1) > .interviewers__item-image').click()
  //   // Clicks the save button
  //   cy.get('.button--confirm').click()
  //   // Sees the booked appointment
  //   cy.contains('[data-testid=appointment]', "Alexander Scaini")

  // })

  // it("Should edit and interview", () => {


  //   // Visits the root of our web server
  //   cy.visit("/");
  //   // Clicks the edit button for the existing appointment
  //   cy.get('[alt=Edit]').first().click( {force: true });
  //   // Changes the name and interviewer
  //   cy.get('[data-testid=student-name-input]').clear().type("Rob Loblaw")
  //   cy.get(':nth-child(2) > .interviewers__item-image').click()
  //   // Clicks the save button
  //   cy.get('.button--confirm').click()
  //   // Sees the edit to the appointment
  //   cy.contains('[data-testid=appointment]', "Rob Loblaw", "Tori Malcolm")

  // })

  // xit("Should cancel and interview", () => {


  //   // Visits the root of our web server
  //   cy.visit("/");
  //   // Clicks the delete button for the existing appointment
  //   cy.get('[alt=Delete]').first().click( {force: true });
  //   // Clicks the confirm button
  //   cy.get('.appointment__actions > :nth-child(2)').click()
  //   // Sees that the appointment slot is empty

  // })
});


