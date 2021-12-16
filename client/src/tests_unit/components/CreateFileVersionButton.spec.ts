/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from "@vue/test-utils";
import { expect } from "@jest/globals";

import CreateFileVersionButton from "../../components/CreateFileVersionButton.vue";

const $store = {
  namespaced: true,
  dispatch: jest.fn(),
};

test("FileVersion gets created after clicking the button and confirming the modal", async () => {
  const wrapper = mount(CreateFileVersionButton, {
    global: {
      mocks: {
        $store,
      },
    },
  });

  expect(wrapper.html()).toContain("Create FileVersion");
  await wrapper.find(".fileversion-creation").trigger("click");
  await wrapper.find(".modal-default-button").trigger("click");
  expect($store.dispatch).toHaveBeenCalled();
});
