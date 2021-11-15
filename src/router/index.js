import { createRouter, createWebHashHistory } from "vue-router";
// import HomePage from "../views/home/HomePage.vue";

const HomePage = () =>
  import(/*webpackChunkName: 'HomePage'*/ "@/views/home/HomePage");
const TopCategoryPage = () =>
  import(
    /*webpackChunkName: 'CategoryPage'*/ "@/views/category/TopCategoryPage"
  );
const SubCategoryPage = () =>
  import(
    /*webpackChunkName: 'CategoryPage'*/ "@/views/category/SubCategoryPage"
  );

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/home/:id",
    component: TopCategoryPage,
  },
  {
    path: "/home/sub/:id",
    component: SubCategoryPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
