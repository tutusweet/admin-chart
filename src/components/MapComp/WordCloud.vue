<template>
  <v-chart :option="option"></v-chart>
</template>

<script>
import "echarts-wordcloud"
import { getKeyworddata } from "@/request"
export default {
  data() {
    return {
      option: {},
    }
  },
  async mounted() {
     let res = await getKeyworddata()
     res = res.slice(0,6).map(v=>({
      name:v.keyWord,
      value:v.totalSearch
     }))
     this.renderChart(res)
  },
  methods:{
    renderChart(data){
      this.option = {
      tooltip: {
        triggle: "item",
      },
      series: [
        {
          type: "wordCloud",
          shape: "cardioid ",
          width: '100%',
          height: '100%',
          emphasis: {
            focus: "self",
            textStyle: {
              textShadowBlur: 5,
              textShadowColor: "#333",
            },
          },
          data,
          textStyle: {
            color: function () {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(",") +
                ")"
              )
            },
          },
        },
      ],
    }
    }
  }
}
</script>

<style lang="scss" scoped></style>
