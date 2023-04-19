<template>
  <div class="total-sale">
    <CommonCard title="累计销售额" :value="reportdata.salesToday">
      <template #default>
        <div class="chart">
          <div>
            <span>日同比</span>
            <span class="css-1">{{reportdata.salesGrowLastDay}}%</span>
            <span :class="reportdata.salesGrowLastDay>0?'increase':'decrease'"></span>
          </div>
          <div>
            <span>月同比</span>
            <span class="css-1">{{reportdata.saleSGrowLastMonth}}%</span>
            <span :class="reportdata.saleSGrowLastMonth>0?'increase':'decrease'"></span>
          </div>
        </div>
      </template>
      <template #footer>
        <span>昨日销售额</span>
        <span class="css-1">￥{{ reportdata.salesLastDay }}</span>
      </template>
    </CommonCard>
  </div>
</template>

<script>
import CommonCardMixin from "@/mixins/CommonCardMixin"
import CommonCard from "./CommonCard.vue"
export default {
  mixins: [CommonCardMixin],
  components: { CommonCard },
}
</script>

<style lang="scss" scoped>

.chart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}
// 采取样式穿透的方式 可以让这个偏移只作用于当前组件
// ::v-deep .value{
//   margin-left: -5px;
// }
</style>
