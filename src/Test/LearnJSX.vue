<!-- 此模板会被下方 JSX 替换 -->
<template>
  <div>
    <h1>Learn JSX</h1>
  </div>
</template>

<script>
import { ref } from "vue";
// 导入 子组件
import LearnJSXChild from "@/Test/LearnJSXChild";

export default {
  name: "LearnJSX",
  setup() {
    // 测试 JSX 中的数据绑定
    const person = ref({ name: "张三", age: 18 });
    // 测试 JSX 事件绑定
    const onChangePerson = () => {
      person.value = { name: "李四", age: 20 };
    };
    // 测试 JSX 类名绑定
    const activeClassName = "active";
    // 测试 JSX 遍历语法
    const hobbies = ["AAA", "BBB", "CCC"];
    // 测试 JSX
    const eleJSX = <p>This is JSX Ele</p>;
    // 测试 JSX 双向数据绑定
    const text = ref("");
    const onChangeIpt = (e) => {
      console.log(e.target.value);
      text.value = e.target.value;
    };
    const onChangeJS = () => {
      text.value = "修改 Text By JS";
    };
    // 测试 JSX 父子传递
    // 见下方 <LearnJSXChild />

    // return JSX
    return function () {
      return (
        <div>
          <h1>Hello Vue JSX（Learn JSX）</h1>
          <p>
            一：{person.value.name}-{person.value.age}
          </p>
          <button onClick={onChangePerson}>点击修改</button>

          <hr />
          <p className={activeClassName}>类名绑定</p>

          <hr />
          <ul>
            <span>循环遍历：</span>
            {hobbies.map((item) => (
              <li>{item}</li>
            ))}
          </ul>

          <hr />
          {eleJSX}

          <hr />
          <input
            type="text"
            placeholder="测试双向数据绑定"
            value={text.value}
            onInput={onChangeIpt}
          />
          <button onClick={onChangeJS}>修改Ipt</button>

          <hr />
          <button
            onClick={() =>
              this.$message({ type: "success", text: "测试this - 成功" })
            }
          >
            测试 this
          </button>

          <hr />
          <LearnJSXChild msg={person.value} onChangePerson={onChangePerson}>
            我是 LearnJSXChild 默认插槽内容
          </LearnJSXChild>
        </div>
      );
    };
  },
};
</script>

<style scoped>
.active {
  color: red;
}
</style>
