import { useRoute } from "vue-router";
import { ref } from "vue";
import { getOrderInfoById } from "@/api/order";
import useCountDown from "@/hooks/useCountDown";
import dayjs from "dayjs";
import { BASE_URL, PAY_CALLBACK } from "@/utils/url";

export default function usePay() {
  // 路由信息对象
  const route = useRoute();
  // 订单信息
  const info = ref(null);

  // 获取倒计时
  const { count, start } = useCountDown();

  // 根据订单id获取订单信息
  getOrderInfoById(route.query.orderId).then((data) => {
    info.value = data.result;

    // 开启订单倒计时
    start(data.result.countdown);
  });

  //#region 支付宝支付
  /*
   * 基地址：BASE_URL
   * 支付后的回调地址：PAY_CALLBACK
   * */
  // 回调地址需要进行编码，否则回调地址中的 # 号后面的内容将支付宝
  // const redirectUrl = PAY_CALLBACK;
  const redirectUrl = encodeURIComponent(PAY_CALLBACK);
  // 支付宝支付地址
  const payUrl = `${BASE_URL}/pay/aliPay?orderId=${route.query.orderId}&redirect=${redirectUrl}`;
  // 是否正在支付
  const isPaying = ref(false);
  //#endregion

  return { info, count, dayjs, payUrl, isPaying };
}
