import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import FileVersions from "../views/FileVersions.vue";
import File from "../components/File.vue";

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

export default router;
