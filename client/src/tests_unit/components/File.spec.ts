import { mount } from "@vue/test-utils";
import { expect } from "@jest/globals";

import File from "../../components/File.vue";

const $store = {
  namespaced: true,
  getters: {
    "fileversions/getFileVersionById": () => {
      return "2";
    },
  },
  commit: jest.fn(),
  dispatch: jest.fn(),
};

const mockRouter = {
  push: jest.fn(),
};

test("Contents of a FileVersion and a particular file are shown after click", async () => {
  const wrapper = mount(File, {
    global: {
      mocks: {
        $store,
        $router: mockRouter,
      },
    },
    data() {
      return {
        id: "2",
      };
    },
    computed: {
      fileversions() {
        return {
          title: "Test",
          files: [
            {
              title: "Mein Titel",
              createdAt: Date.now(),
              content: "Mein Content",
            },
          ],
        };
      },
    },
  });

  expect(wrapper.html()).toContain("File Details von Test");
  await wrapper.find(".file").trigger("click");
  expect(wrapper.html()).toContain("Mein Titel");
  expect(wrapper.html()).toContain("Mein Content");
});

test("The FileVersion are deleted after click on delete button", async () => {
  const wrapper = mount(File, {
    global: {
      mocks: {
        $store,
        $router: mockRouter,
      },
    },
    data() {
      return {
        id: "2",
      };
    },
    computed: {
      fileversions() {
        return { title: "Test", files: [] };
      },
    },
  });

  await wrapper.find(".deleteButton").trigger("click");
  expect($store.dispatch).toHaveBeenCalled();
  expect(mockRouter.push).toHaveBeenCalledTimes(1);
  expect(mockRouter.push).toHaveBeenCalledWith("/files");
});
