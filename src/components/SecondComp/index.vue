<template>
  <div class="second-comp">
    <el-card shadow="hover">
      <template #header>
        <el-menu
          mode="horizontal"
          :default-active="activeIndex"
          @select="handleSelect"
        >
          <el-menu-item index="1">销售额</el-menu-item>
          <el-menu-item index="2">访问量</el-menu-item>
        </el-menu>
        <div class="right">
          <el-radio-group v-model="time">
            <el-radio-button label="今日"></el-radio-button>
            <el-radio-button label="本周"></el-radio-button>
            <el-radio-button label="本月"></el-radio-button>
            <el-radio-button label="今年"></el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="pickerTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </template>
      <div class="card-content">
        <div class="left-chart">
          <v-chart :option="chartOptions"></v-chart>
        </div>
        <div class="right-list">
          <div class="list-title">排行榜</div>
          <div :class="['list-item']" v-for="data in rankedData" :key="data.no">
            <span :class="data.no < 4 ? 'top-3' : ''">{{ data.no }}</span>
            <span>{{ data.title }}</span>
            <span>{{ data.sales }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSaledata } from "@/request"
export default {
  data() {
    return {
      saledata: null,
      activeIndex: "1",
      time: "今日",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", [start, end])
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit("pick", [start, end])
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit("pick", [start, end])
            },
          },
        ],
      },
      pickerTime: "",
      rankedData:null,
      chartOptions:null
    }
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
      if(+this.activeIndex===1){
        this.rankedData = this.saledata.saleRank
        this.renderChat(this.saledata.saleFulleYearAxis,this.saledata.saleFulleYear)
      }else{
        this.rankedData = this.saledata.visitRank
        this.renderChat(this.saledata.visitFullYeadAxis,this.saledata.visitFullYear)
      }
      
    },
    renderChat(v1,v2){
      this.chartOptions =  {
        title: {
          text: "年度销售额",
          textStyle: {
            fontWeight: 600,
            fontSize: 14,
          },
        },
        grid: {
          left: 40,
        },
        xAxis: {
          type: "category",
          data: v1,
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: "dotted",
            },
          },
        },
        series: {
          type: "bar",
          barWidth: "40%",
          data: v2,
        },
        color: "skyblue",
      }
    }
  },
  async mounted() {
    const res = await getSaledata()
    this.saledata = res
    this.rankedData = this.saledata.saleRank
    this.renderChat(this.saledata.saleFulleYearAxis,this.saledata.saleFulleYear)
  },
}
</script>

<style lang="scss" scoped>
.second-comp {
  position: relative;
  margin-top: 20px;
  .el-card__header {
    .el-menu {
      padding-left: 50px;
    }
    .right {
      position: absolute;
      right: 0px;
      top: 10px;
      right: 2%;
      .el-radio-group {
        margin-right: 20px;
      }
      ::v-deep .el-date-editor {
        .el-range-separator {
          padding: 0;
        }
      }
    }
  }
  .card-content {
    display: flex;
    .left-chart {
      flex: 0 0 70%;
      height: 434px;
    }
    .right-list {
      flex: 1;
      .list-title {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
      }
      .list-item {
        margin: 20px 0px;
        display: flex;
        gap: 20px;
        span:nth-child(2) {
          flex: 1;
        }
        span:nth-child(1) {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          text-align: center;
          line-height: 20px;
        }
        .top-3 {
          background-color: rgb(9, 179, 247);
          color: #fff;
        }
      }
    }
  }
}
</style>
