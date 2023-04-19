<template>
  <div class="total-user">
    <CommonCard title="累计用户数" :value="reportdata.totalUser">
      <template #default>
        <v-chart :option="options"></v-chart>
      </template>
      <template #footer>
        <div class="wrapper">
          <div>
            <span>日同比</span>
            <span class="css-1">{{ reportdata.userGrowLastDay }}%</span>
            <span
              :class="reportdata.userGrowLastDay > 0 ? 'increase' : 'decrease'"
            ></span>
          </div>
          <div>
            <span>月同比</span>
            <span class="css-1">{{ reportdata.userGrowLastMonth }}%</span>
            <span
              :class="
                reportdata.userGrowLastMonth > 0 ? 'increase' : 'decrease'
              "
            ></span>
          </div>
        </div>
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
  watch:{
    reportdata(value){
      this.options = {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          type: "category",
          show: false,
        },
        series: [
          {
            name: "上月平台用户数",
            type: "bar",
            data: [value.userLastMonth],
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              color: "green",
            },
          },
          {
            name: "本日平台用户数",
            type: "bar",
            data: [value.userToday],
            stack: "总量",
            itemStyle: {
              color: "#ddd",
            },
          },
          {
            type: "custom",
            renderItem: (params, api) => {
              const endPoint = api.coord([api.value(0), 0])
              return {
                type: "group",
                children: [
                  {
                    type: "path",
                    shape: {
                      d: "M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z",
                      x: endPoint[0] - 5,
                      y: 35,
                      width: 10,
                      height: 10,
                      layout: "cover",
                    },
                    style: {
                      fill: "green",
                    },
                  },
                  {
                    type: "path",
                    shape: {
                      d: "M889.696 320.8H158.848l365.504 365.536 365.344-365.536z",
                      x: endPoint[0] - 5,
                      y: 5,
                      width: 10,
                      height: 10,
                      layout: "cover",
                    },
                    style: {
                      fill: "green",
                    },
                  },
                ],
              }
            },
            data: [value.userLastMonth],
          },
        ],
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  gap: 10px;
}
</style>
