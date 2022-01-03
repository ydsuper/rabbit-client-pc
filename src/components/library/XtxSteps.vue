<template>
  <div class="xtx-steps">
    <div class="xtx-steps-item active" v-for="i in 5" :key="i">
      <div class="step">
        <span>{{ i }}</span>
      </div>
      <div class="title">提交订单</div>
      <div class="desc">2021-12-28 09:09:09</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "XtxSteps",
  props: {
    active: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { slots }) {
    // 获取插槽内容
    const steps = slots.default && slots.default();
    // console.log("xtxsteps", steps); //@log
    // 存储组件实例数组
    const result = [];

    steps.forEach((item) => {
      console.log(typeof item.type);
      if (typeof item.type === "symbol") {
        item.children.forEach((child) => result.push(child));
      } else {
        result.push(item);
      }
    });

    return () => (
      <div className="xtx-steps">
        {result.map((item, i) => (
          <div
            key={i}
            className={`xtx-steps-item ${
              i + 1 <= props.active ? "active" : ""
            }`}
          >
            <div className="step">
              <span>{i + 1}</span>
            </div>
            <div className="title">{item.props.title}</div>
            <div className="desc">{item.props.desc}</div>
          </div>
        ))}
      </div>
    );
  },
};
</script>
<style lang="less">
.xtx-steps {
  display: flex;
  text-align: center;
  padding: 20px;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff;
        }
        &::before,
        &::after {
          background: @xtxColor;
        }
      }
      .title {
        color: @xtxColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
