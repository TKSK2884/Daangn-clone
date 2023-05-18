import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JobView from "../views/JobView.vue";
import RealtyView from "../views/RealtyView.vue";
import ArticlesView from "../views/ArticlesView.vue";
import HotArticlesView from "../views/HotArticlesView.vue";
import SearchView from "../views/SearchView.vue";
import TopKeywordsView from "../views/TopKeywordsView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/kr/job",
        name: "job",
        component: JobView,
    },
    {
        path: "/kr/realty",
        name: "realty",
        component: RealtyView,
    },
    {
        path: "/articles",
        name: "articles",
        component: ArticlesView,
    },
    {
        path: "/hot_articles",
        name: "hot_articles",
        component: HotArticlesView,
    },
    {
        path: "/search",
        name: "search",
        component: SearchView,
    },
    {
        path: "/top_keywords",
        name: "top_keywords",
        component: TopKeywordsView,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
