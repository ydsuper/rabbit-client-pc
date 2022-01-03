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
const PayPage = () => import("@/views/pay/PayPage");
const PayResultPage = () => import("@/views/pay/PayResultPage");
const MemberHomePage = () => import("@/views/member/home/MemberHomePage");
const OrderListPage = () => import("@/views/member/order/OrderListPage");
const OrderDetailPage = () => import("@/views/member/order/OrderDetailPage");
const OrderView = () => import("@/views/member/order/OrderView");

// 定义路由列表
const routes = [
  { path: "/", component: HomePage },
  { path: "/category/:id", component: TopCategoryPage },
  { path: "/category/sub/:id", component: SubCategoryPage },
  { path: "/goods/:id", component: GoodsDetailPage },
  { path: "/login", component: LoginPage },
  { path: "/login/callback", component: LoginCallbackPage },
  { path: "/cart", component: CartPage },
  { path: "/checkout/order", component: CheckoutPage },
  { path: "/checkout/pay", component: PayPage },
  { path: "/pay/callback", component: PayResultPage },
  { path: "/member/home", component: MemberHomePage },
  {
    path: "/member/order",
    component: OrderView,
    children: [
      { path: "", component: OrderListPage },
      { path: ":id", component: OrderDetailPage },
    ],
  },
  // { path: "/member/order/:id", component: OrderDetailPage },
  /* 404 */
  {
    path: "/notfound",
    component: () => import("@/views/NotFound"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/notfound",
  },
];

// 创建并生成路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次跳转返回顶部
  scrollBehavior() {
    return { top: 0 };
  },
  // 定义【模糊匹配】和【精确匹配】激活类名
  linkActiveClass: "fuzzy-active",
  linkExactActiveClass: "exact-active",
});

// 路由守卫——登录拦截
router.beforeEach(authGuard);

export default router;
