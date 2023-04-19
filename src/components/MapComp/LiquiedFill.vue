<template>
  <v-chart :option="option" class="chart"></v-chart>
</template>

<script>
import "echarts-liquidfill" 
import { getReportdata } from "@/request"
function getColor(value){
    return value>0.6?'green':'red'
}
export default {
  data() {
    return {
      option: {},
    }
  },
 async mounted() {
    const res = await getReportdata()
    const data = (+res.salesGrowLastDay/100).toFixed(2)
    this.renderChart(data)
  },
  methods:{
    renderChart(data){
      this.option = {
      series: [
        {
          type: "liquidFill",
          data: [data],
          color:[getColor(data)],
          radius: "80%",
          amplitude: "4%",
          outline: {
            borderDistance: 2,
            // show:false
            itemStyle: {
              borderWidth: 2,
            },
          },
          itemStyle: {
            shadowBlur: 0,
          },
        },
      ],
    }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 100%;
}
</style>
