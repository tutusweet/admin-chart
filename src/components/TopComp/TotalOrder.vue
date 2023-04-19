<template>
  <div class="total-sale">
    <CommonCard title="累计订单额" :value="reportdata.orderToday">
      <template #default>
        <v-chart :option="options"></v-chart>
      </template>
      <template #footer>
        <span>昨日销售额</span>
        <span class="css-1">￥ {{ reportdata.orderLastDay }}</span>
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
  data() {
    return {
      options: null
    }
  },
  methods:{
    renderChart(data){
      this.options ={
        xAxis: {
          type: "category",
          show: false,
          boundaryGap: false,
        },
        yAxis: {
          show: false,
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          {
            type: "line",
            data,
            smooth: true,
            areaStyle: {
              color: "purple",
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              opacity: 0,
            },
          },
        ],
    }
    }
  },
  watch:{
    reportdata(value){
      this.renderChart(value.orderTrend)
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 14px;
  color: #464545;
}
</style>
