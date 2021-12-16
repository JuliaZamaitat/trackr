import { mount } from "@cypress/vue";
import Modal from "../../components/Modal.vue";

describe("Modal", () => {
  it("renders the modal correctly", () => {
    mount(Modal);
    cy.get(".modal-header").should("have.text", "default header");
    cy.get(".modal-body").should("have.text", "default body");
    cy.get(".modal-default-button").should("have.text", " OK ");
    cy.get(".modal-default-button-cancel").should("have.text", " Abbrechen ");
  });
});
