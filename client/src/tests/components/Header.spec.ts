import { mount } from "@cypress/vue";
import Header from "../../components/Header.vue";

describe("Header", () => {
  it("renders a message", () => {
    const msg = "Trackr";
    mount(Header);

    cy.get("h1").should("have.text", msg);
  });
});
