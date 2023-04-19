<template>
  <div class="today-user">
    <CommonCard title="今日用户交易数" :value="reportdata.userToday">
      <template #default>
        <v-chart :option="options" />
      </template>
      <template #footer>
        <span>退货率</span>
        <span class="css-1">{{ reportdata.returnRate }}%</span>
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
      options: null,
    }
  },
  methods: {
    renderChart(data) {
      this.options = {
        xAxis: {
          type: "category",
          show: false,
          data: [
            "00:00",
            "03:00",
            "05:00",
            "07:00",
            "09:00",
            "11:00",
            "13:00",
            "15:00",
            "17:00",
            "19:00",
            "21:00",
            "23:00",
          ],
        },
        yAxis: {
          show: false,
        },
        tooltip: {},
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          {
            name: "实时交易量",
            type: "bar",
            data,
            barWidth: "60%",
          },
        ],
      }
    },
  },
  watch:{
    reportdata(value){
      this.renderChart(value.orderUserTrend)
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
