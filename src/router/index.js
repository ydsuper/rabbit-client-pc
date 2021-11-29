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
const GoodsDetailPage = () =>
  import(
    /*webpackChunkName: 'GoodsDetailPage'*/ "@/views/goods/GoodsDetailPage"
  );

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/category/:id",
    component: TopCategoryPage,
  },
  {
    path: "/category/sub/:id",
    component: SubCategoryPage,
  },
  {
    path: "/goods/:id",
    component: GoodsDetailPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次跳转返回顶部
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
