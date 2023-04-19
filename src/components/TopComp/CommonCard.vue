<template>
  <div class="common-card">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div class="chart">
      <slot></slot>
    </div>
    <div class="line" />
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  color: #777;
  letter-spacing: 1px;
}
.value {
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;

}
.chart {
  height: 50px;
  margin-top: 10px;
}
.line {
  margin-top: 18px;
  border-top: 1px solid #ddd;
}
.footer {
  margin-top: 10px;
}
</style>
<style lang="scss">
//css-1用作span文本的加粗
span.css-1 {
  margin-left: 8px;
  font-weight: 550;
}
span {
  font-size: 14px !important;
  color: #464545;
  &.increase {
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 4px;
    border-color: transparent transparent green transparent;
    border-style: solid;
    margin-left: 10px;
    transform: translateY(-50%);
  }
  &.decrease {
    display: inline-block;
    width: 0;
    padding: 0;
    border-width: 4px;
    border-color: red transparent transparent transparent;
    border-style: solid;
    margin-left: 10px;
  }
}
</style>
