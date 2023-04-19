<template>
  <div class="third-comp">
    <div class="left">
      <el-card shadow="hover">
        <template #header>
          <div class="css-2">关键词搜索</div>
        </template>
        <div class="main">
          <div class="charts">
            <div class="left-chart">
              <div class="title">搜索用户量</div>
              <div class="number mt-10">{{ searchUser }}</div>
              <v-chart :option="chart1Option"></v-chart>
            </div>
            <div class="right-chart">
              <div class="title">搜索量</div>
              <div class="number mt-10">{{ searchNumber }}</div>
              <v-chart :option="chart2Option"></v-chart>
            </div>
          </div>
          <div class="table">
            <el-table :data="tableData">
              <el-table-column prop="rank" label="排名" width="60">
              </el-table-column>
              <el-table-column prop="keyWord" label="关键词" align="center">
              </el-table-column>
              <el-table-column
                prop="totalSearch"
                label="总搜索量"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="totalUser"
                label="搜索用户数"
                align="center"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              layout="prev,pager,next"
              :total="totalData.length"
              :page-size="pageSize"
              background
              @current-change="currenChange"
            />
          </div>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template #header>
          <div class="title css-2">分类销售排行</div>
          <el-radio-group v-model="radio" @input="handleRadio">
            <el-radio-button label="品类"></el-radio-button>
            <el-radio-button label="商品"></el-radio-button>
          </el-radio-group>
        </template>
        <div class="pie-chart">
          <v-chart :option="pieChartOption"></v-chart>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getKeyworddata, getCategorydata } from "@/request"
export default {
  data() {
    return {
      chart1Option: {},
      chart2Option: {},
      tableData: [],
      totalData: [], //后端获取的总数据
      radio: "品类",
      pieChartOption: {},
      currentPage: 1, //当前页数
      pageSize: 6,
      categoryData: [],
    }
  },
  async mounted() {
    //获取关键词数据
    const res = await getKeyworddata()
    this.totalData = res
    this.tableData = this.totalData.slice(0, this.pageSize)
    this.initPieOption()
    const chart1Data = this.totalData
      .map((item) => item.totalUser)
      .slice(0, 10)
      .reverse()
    this.renderChart1(chart1Data)
    const chart2Data = this.totalData
      .map((item) => item.totalSearch)
      .slice(0, 10)
      .reverse()
    this.renderChart2(chart2Data)
    //获取分类排行数据
    const _res = await getCategorydata()
    this.categoryData = _res
    this.initPieOption(this.categoryData.data1)
  },
  methods: {
    currenChange(page) {
      this.currentPage = page
      this.tableData = this.totalData.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      )
    },
    handleRadio(radioLable) {
      if (radioLable === "品类") {
        this.initPieOption(this.categoryData.data1)
      }
      if (radioLable === "商品") {
        this.initPieOption(this.categoryData.data2)
      }
    },
    initPieOption(data) {
      let totalData
      if (data) {
        console.log(data)
        data.map((v) => {
          v.name = v.title + "|" + v.value
        })
        totalData = data.reduce((p, c) => {
          return p + c.value
        }, 0)
      }
      const options = {
        title: [
          {
            text: "品类分布",
            textStyle: {
              fontSize: 14,
              color: "#666",
            },
            left: 20,
            top: 20,
          },
          {
            text: "累计订单量",
            subtext: totalData,
            x: "40%",
            y: "45% ",
            textAlign: "center",
            textStyle: {
              fontSize: 14,
              color: "#999",
            },
            subtextStyle: {
              fontSize: 28,
              color: "#333",
            },
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            const res =
              params.seriesName +
              "<br/>" +
              params.marker +
              params.data.title +
              "<br/>" +
              params.marker +
              "销售额:" +
              params.data.value

            return res
          },
        },
        series: [
          {
            name: "品类分布",
            type: "pie",
            data,
            label: {
              show: true,
              position: "outside",
              formatter: (params) => {
                return `${params.data.title}`
              },
            },
            center: ["40%", "50%"],
            radius: ["45%", "60%"],
            itemStyle: {
              borderWidth: 8,
              borderColor: "#fff",
            },
          },
        ],
        legend: {
          type: "scroll", //可以滚动
          orient: "vertical",
          left: "80%",
          top: "top",
          height: 200,
          textStyle: {
            color: "#888",
          },
        },
      }
      this.pieChartOption = options
    },
    renderChart1(data) {
      this.chart1Option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          show: false,
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        series: {
          type: "line",
          areaStyle: {
            color: "skyblue",
          },
          data,
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
        },
      }
    },
    renderChart2(data) {
      this.chart2Option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          show: false,
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        series: {
          type: "line",
          areaStyle: {
            color: "skyblue",
          },
          data,
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
        },
      }
    },
  },
  computed: {
    searchUser() {
      return this.totalData.reduce((p, c) => {
        return p + c.totalUser
      }, 0)
    },
    searchNumber() {
      return this.totalData.reduce((p, c) => {
        return p + c.totalSearch
      }, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.third-comp {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  & > div {
    flex: 1;
  }
  ::v-deep .el-card .el-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
  }
  .left {
    .main {
      padding: 20px;
      .charts {
        display: flex;
        gap: 20px;
        // height: 452px;
        & > div {
          flex: 1;
          .echarts {
            height: 50px;
          }
          .title {
            font-size: 14px;
            color: #727171;
          }
          .number {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
    }
    .table {
      .el-pagination {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .right {
    ::v-deep .el-card {
      height: 100%;
      .el-card__body {
        height: 558px;
      }
    }
    .pie-chart {
      height: 100%;
    }
    ::v-deep .el-card .el-card__header {
      position: relative;
      .el-radio-group {
        position: absolute;
        right: 2%;
        top: 10%;
      }
    }
  }
}
</style>
<style>
/* 用作div文本的加粗 */
div.css-2 {
  font-weight: 600;
}
</style>
