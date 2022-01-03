<template>
  <div>
    <h1>Learn JSX Child</h1>
  </div>
</template>

<script>
export default {
  name: "LearnJSXChild",
  props: ["msg", "onChangePerson"],
  setup(props) {
    return function () {
      return (
        <>
          <h1>我是 LearnJSXChild 组件（子组件）</h1>
          <div>
            {props.msg.name} - {props.msg.age}
          </div>
          <button onClick={props.onChangePerson}>父子按钮</button>
          <div>{this.$slots.default()}</div>
        </>
      );
    };
  },
};
</script>

<style scoped></style>
