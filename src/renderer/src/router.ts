import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/index.vue";
import Asset from "@/views/asset/index.vue";
import Category from "@/views/category/index.vue";
import User from "@/views/user/index.vue";
import Report from "@/views/report/index.vue";
import Maintenance from "@/views/maintenance/index.vue";
import Support from "@/views/support/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/asset",
    name: "Asset",
    component: Asset,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    component: Maintenance,
  },
  {
    path: "/support",
    name: "Support",
    component: Support,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
