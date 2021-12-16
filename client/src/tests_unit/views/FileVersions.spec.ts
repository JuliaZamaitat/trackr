/* eslint-disable @typescript-eslint/no-empty-function */
import { shallowMount } from "@vue/test-utils";
import { expect } from "@jest/globals";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import File from "../../components/File.vue";
import Home from "../../views/Home.vue";
import FileVersions from "../../views/FileVersions.vue";

const $store = {
  namespaced: true,
  getters: {
    "fileversions/fileVersions": () => {
      return [
        {
          title: "Meine Versionen",
          files: [
            { title: "Mein File", createdAt: Date.now(), content: "Inhalt" },
          ],
        },
      ];
    },
  },
  commit: jest.fn(),
  dispatch: jest.fn(),
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/files",
    name: "FileVersions",
    component: FileVersions,
  },
  {
    path: "/files/:id",
    name: "File",
    component: File,
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

test("It shows all fileVersions with a router-link that the component has", async () => {
  const wrapper = shallowMount(FileVersions, {
    global: {
      mocks: {
        $store,
      },
      plugins: [router],
    },
    computed: {
      fileVersions: () => {
        return [
          {
            _id: "23",
            title: "Meine Versionen",
            files: [
              {
                title: "Mein File",
                createdAt: Date.now(),
                content: "Inhalt",
              },
            ],
          },
        ];
      },
    },
  });
  await router.isReady();

  expect(wrapper.html()).toContain("Your File Collection");
  expect(wrapper.html()).toContain("</router-link-stub>");
  expect(wrapper.html()).toContain("Meine Versionen");
});
