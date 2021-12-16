import { mount } from "@vue/test-utils";
import { expect } from "@jest/globals";

import Modal from "../../components/Modal.vue";

test("layout default slot", () => {
  const wrapper = mount(Modal, {
    slots: {
      header: "Mein Header",
    },
  });
  expect(wrapper.text()).toContain("Mein Header");
});
