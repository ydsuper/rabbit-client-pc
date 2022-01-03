<!-- 视图见下方 JSX -->
<template>
  <div></div>
</template>

<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxTabs",
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots, emit }) {
    // 1.收集选项卡标题和选项卡内容
    const defaults = slots.default && slots.default();
    // console.log("xtxtabs", defaults); //@log
    // 2.获取选项卡标题
    // const titles = defaults.filter((item) => item.type.name === "XtxTabTitle");
    // 3.获取选项卡内容
    // const contents = defaults.filter((item) => item.type.name === "XtxTabContent");

    // 存储选项卡标题 与 内容
    const titles = [];
    const contents = [];
    // 2.收集选项卡标题和内容
    defaults.forEach((item) => {
      console.log(typeof item.type === "symbol");
      // 2.1判断item类型是不是symbol
      if (typeof item.type === "symbol") {
        // 2.1.1遍历children
        item.children.forEach((child) => {
          // 判断 child 的组件名
          if (child.type.name === "XtxTabTitle") {
            titles.push(child);
          } else {
            contents.push(child);
          }
        });
      }
      // 2.2item类型不是symbol 直接判断type.name对应哪个组件
      else {
        if (item.type.name === "XtxTabTitle") {
          titles.push(item);
        } else {
          contents.push(item);
        }
      }
    });

    // 存储当前选项卡
    const index = useVModel(props, "active", emit);
    // 处理切换选项卡
    const onTabTitleClick = (value) => {
      // console.log(value); //@log
      index.value = value;
    };

    return () => (
      <div className="xtx-tabs">
        <nav>
          {titles.map((title, i) => (
            <a
              href="javascript:"
              className={i === index.value ? "active" : ""}
              onClick={() => onTabTitleClick(i)}
            >
              {title}
            </a>
          ))}
        </nav>
        {contents.map((item, i) => (
          <div className={i === index.value ? "active" : ""}>{item}</div>
        ))}
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
  > div {
    display: none;
    &.active {
      display: block;
    }
  }
}

.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
