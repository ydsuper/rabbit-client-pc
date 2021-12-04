import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getCommentInfo, getCommentList } from "@/api/goods";
import { ref, watch } from "vue";

export default function useGoodsComment() {
  const route = useRoute();
  const commentInfo = ref(null);
  const currentTagTitle = ref("全部评论");
  const commentList = ref(null);

  //#region 获取商品评论信息数据
  const getGoodsCommentInfo = (id) => {
    getCommentInfo(id).then((res) => {
      res.result.tags.unshift(
        {
          title: "全部评论",
          tagCount: res.result.evaluateCount,
        },
        {
          title: "有图",
          tagCount: res.result.hasPictureCount,
        }
      );
      commentInfo.value = res.result;
    });
  };
  getGoodsCommentInfo(route.params.id);
  //#endregion

  //#region 获取评论分页数据
  const getGoodsCommentList = (id) => {
    getCommentList(id).then((res) => {
      commentList.value = res.result;
    });
  };
  getGoodsCommentList(route.params.id);
  //#endregion

  // 路由更新数据
  onBeforeRouteUpdate((to) => {
    getGoodsCommentInfo(to.params.id);
    getGoodsCommentList(route.params.id);
  });

  //#region 格式化数据
  // 格式化用户昵称
  const formatNickname = (nickname) => {
    return nickname[0] + "****" + nickname.substr(-1);
  };
  // 格式化商品属性信息
  const formatAttrs = (specs) => {
    return specs.map((item) => `${item.name}:${item.nameValue}`).join(" ");
  };
  //#endregion

  //#region 收集用户的筛选条件和排序条件
  const reqParams = ref({
    page: 1,
    pageSize: 10,
    hasPicture: null,
    tag: "",
    // praiseCount 最热, createTime 最新
    sortField: "",
  });

  const updateReqParams = (params) => {
    console.log("updateReqParams:", params); //@log
    // 用户选择评论标签
    if (params.tag) {
      reqParams.value = {
        ...reqParams.value,
        hasPicture: params.tag === "有图",
        tag: params.tag === "全部评论" ? "" : params.tag,
      };
      // // 如果用户选择的是有图
      // if (params.tag === "有图") {
      //   reqParams.value.hasPicture = true;
      // } else {
      //   reqParams.value.hasPicture = false;
      //   // 如果用户选择的是全部
      //   if (params.tag === "全部评论") {
      //     reqParams.value.tag = "";
      //   } else {
      //     reqParams.value.tag = params.tag;
      //   }
      // }
    } else {
      // 排序选项
      reqParams.value = { ...reqParams.value, ...params };
    }
    // 筛选条件变化后重置页码
    reqParams.value.page = params.page || 1;
  };

  // 监听请求参数变化
  watch(
    reqParams,
    () => {
      console.log("updateeeeeeeeeeeeee");
      getGoodsCommentList(route.params.id);
    },
    {
      deep: true,
    }
  );
  //#endregion

  return {
    commentInfo,
    currentTagTitle,
    commentList,
    formatNickname,
    formatAttrs,
    reqParams,
    updateReqParams,
  };
}
