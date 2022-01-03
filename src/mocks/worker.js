import { setupWorker, rest } from "msw";
import { BASE_URL } from "@/utils/url";
// import faker from "faker";
import faker from "faker/locale/zh_CN";

// faker.locale = "zh_CN"; //设置语音

// 1.创建一个用于做拦截请求工作的人
const worker = setupWorker(
  // 2.定义拦截请求程序
  /*
   * 通过 rest 提供的方法拦截 xxx 请求
   * 第一个参数表示要拦截的请求地址
   * 第二个参数是请求处理程序: req\res\ctx
   * */
  rest.get(`${BASE_URL}/message`, (req, res, ctx) => {
    return res(
      ctx.json(
        // 生成模拟数据
        generateMockData(5, () => ({
          name: faker.name.firstName(),
          avatar: faker.internet.avatar(),
          phone: faker.phone.phoneNumber(),
          cityName: faker.address.cityName(),
          email: faker.internet.email(),
        }))
      )
    );
  }),
  rest.get(`${BASE_URL}/member/collect`, (req, res, ctx) => {
    console.log("个人收藏req", req);
    return res(
      ctx.json({
        msg: "获取成功",
        result: {
          counts: 50,
          page: req.url.searchParams.get("page"),
          pageSize: req.url.searchParams.get("pageSize"),
          pages: 0,
          items: generateMockData(req.url.searchParams.get("pageSize"), () => ({
            id: faker.datatype.uuid(),
            name: faker.internet.userName(),
            desc: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${faker.datatype.number(
              { min: 1, max: 8 }
            )}.jpg`,
          })),
        },
      })
    );
  })
);

// 3.导出做拦截请求工作的人
export default worker;

// 4.在开发环境中启动请求拦截程序

//#region Faker 批量生成数据方法
function generateMockData(length, generate) {
  return Array.from({ length }, generate);
}
//#endregion
