import { mount } from "@cypress/vue";
import File from "../../components/File.vue";

describe("File", () => {
  it("renders a message", () => {
    const msg = "File Details von ";
    mount(File);

    cy.get("h2").should("have.text", msg);
  });
});
