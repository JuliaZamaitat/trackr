/// <reference types="Cypress" />

import { mount } from "@cypress/vue";
import UploadButton from "../../components/UploadButton.vue";
describe("UploadButton", () => {
  it("has all its elements", () => {
    const msg = "Upload File";
    mount(UploadButton, {
      props: {
        id: "123",
      },
    });

    cy.get("label").should("have.text", msg);
    cy.get("input#file-upload").should("exist");
  });

  // it("Testing file uploading", () => {
  //   mount(UploadButton, {
  //     props: {
  //       id: "123",
  //     },
  //   });
  //   cy.fixture("test.html").then((fileContent) => {
  //     cy.get("input[type=file]").attachFile(fileContent);
  //   });
  // });
});
