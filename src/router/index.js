import { createRouter, createWebHashHistory } from "vue-router";
import authGuard from "./authGuard";
// import HomePage from "../views/home/HomePage.vue";

const HomePage = () => import("@/views/home/HomePage");
const TopCategoryPage = () => import("@/views/category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage");
const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage");
const LoginPage = () => import("@/views/login/LoginPage");
const LoginCallbackPage = () =>
  import("@/views/login/components/LoginCallbackPage");
const CartPage = () => import("@/views/cart/CartPage");
const CheckoutPage = () => import("@/views/pay/CheckoutPage");

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
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/login/callback",
    component: LoginCallbackPage,
  },
  { path: "/cart", component: CartPage },
  { path: "/checkout/order", component: CheckoutPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次跳转返回顶部
  scrollBehavior() {
    return { top: 0 };
  },
});

// 路由守卫——登录拦截
router.beforeEach(authGuard);

export default router;
