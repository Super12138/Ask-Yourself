import NotFoundPage from "@/pages/NotFoundPage.vue";
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    { path: "/", component: () => import("@/pages/main/MainPage.vue") },
    { path: "/test/:name", component: () => import("@/pages/test/TestPage.vue") },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routes,
});

export default router;
