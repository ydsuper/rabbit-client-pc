<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span class="placeholder" v-if="!location">请选择配送地址</span>
      <span class="value" v-else>{{ location }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <template v-if="list">
        <span
          class="ellipsis"
          v-for="item in list"
          :key="item.code"
          @click="selectCityData(item)"
          >{{ item.name }}</span
        >
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";

export default {
  name: "XtxCity",
  props: {
    location: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 控制下拉菜单是否显示
    const visible = ref(false);
    // 获取下拉元素
    const target = ref(null);

    // 存储城市数据
    const cityData = ref(null);
    // 显示下拉菜单
    const show = async () => {
      cityData.value = await getCityData();
      // console.log(cityData.value); //@log
      visible.value = true;
    };
    // 隐藏下拉菜单
    const hide = () => {
      visible.value = false;
      // 重置用户选择
      for (const attr in selectedCityData) {
        selectedCityData[attr] = "";
      }
    };
    // 切换下拉菜单显示隐藏
    const toggle = () => {
      visible.value ? hide() : show();
    };

    // 在下拉框元素外面点击时
    onClickOutside(target, () => {
      // 隐藏下拉框
      hide();
    });

    //#region 记录用户选择的城市数据
    const selectedCityData = reactive({
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      provinceName: "",
      cityName: "",
      countyName: "",
      location: "",
    });
    //#endregion

    //#region 用户选择城市数据
    const selectCityData = (data) => {
      // 存储省级数据
      if (data.level === 0) {
        selectedCityData.provinceCode = data.code;
        selectedCityData.provinceName = data.name;
      }
      // 存储市级数据
      else if (data.level === 1) {
        selectedCityData.cityCode = data.code;
        selectedCityData.cityName = data.name;
      } else {
        // 存储县区级数据
        selectedCityData.countyCode = data.code;
        selectedCityData.countyName = data.name;
        selectedCityData.location = `${selectedCityData.provinceName} ${selectedCityData.cityName} ${selectedCityData.countyName}`;
      }
      console.log("select", selectedCityData);
    };
    //#endregion

    //#region 城市数据（计算属性）
    const list = computed(() => {
      let list = cityData.value;
      if (selectedCityData.provinceCode) {
        list = list.find(
          (province) => province.code === selectedCityData.provinceCode
        ).areaList;
      }
      if (selectedCityData.cityCode) {
        list = list.find(
          (city) => city.code === selectedCityData.cityCode
        ).areaList;
      }
      if (selectedCityData.countyCode) {
        // 将数据传递给父组件
        emit("onCityChanged", { ...selectedCityData });
        // 重置数据选择
        list = cityData.value;
        // 隐藏弹框
        hide();
      }
      return list;
    });
    //#endregion

    return {
      visible,
      target,
      toggle,
      selectedCityData,
      selectCityData,
      list,
    };
  },
};

// 在 window 对象中缓存城市数据
window.cityData = null;

async function getCityData() {
  if (window.cityData) return window.cityData;
  const response = await axios.get(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  return (window.cityData = response.data);
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
