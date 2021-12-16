/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from "@vue/test-utils";
import { expect } from "@jest/globals";
import vueRouter from "vue-router";

import UploadButton from "../../components/UploadButton.vue";

const $store = {
  namespaced: true,
  dispatch: jest.fn(),
};

test("No Action is dispatched to the store if there is no uploaded file", async () => {
  const wrapper = mount(UploadButton, {
    global: {
      mocks: {
        $store,
      },
    },
    props: {
      id: "2",
    },
  });
  expect(wrapper.html()).toContain("Upload File");
  const fileInput = await wrapper.find("#file-upload");
  fileInput.trigger("change");
  expect($store.dispatch).not.toHaveBeenCalled();
});
