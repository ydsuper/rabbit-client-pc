<template>
  <AppMemberLayout>
    <div class="member-home">
      <MemberHomeOverview />
      <MemberHomePanel title="我的收藏" v-if="collection">
        <GoodsItem
          v-for="goods in collection.items"
          :key="goods.id"
          :goods="goods"
        />
      </MemberHomePanel>
      <MemberHomePanel title="我的足迹"></MemberHomePanel>
      <GoodsRelevant />
    </div>
  </AppMemberLayout>
</template>
<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import MemberHomeOverview from "@/views/member/home/components/MemberHomeOverview";
import MemberHomePanel from "@/views/member/home/components/MemberHomePanel";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import useCollection from "@/hooks/member/useCollection";
import GoodsItem from "@/views/category/components/GoodsItem";
export default {
  name: "MemberHomePage",
  components: {
    GoodsItem,
    GoodsRelevant,
    MemberHomeOverview,
    MemberHomePanel,
    AppMemberLayout,
  },
  setup() {
    const collection = useCollection();

    return { collection };
  },
};
</script>
<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>
