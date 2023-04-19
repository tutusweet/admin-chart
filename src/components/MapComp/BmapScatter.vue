<template>
  <v-chart :option="options" class="chart"></v-chart>
</template>

<script>
//需要异步加载百度地图
import loadMap from "@/utils/loadMap"
//引入echarts中的bmap
import "echarts/extension/bmap/bmap"
// import { data, geoCoordMap } from "./data"
import { getMapdata } from "@/request"
const convertData = function (cityData, geoCoordMap) {
  const res = []
  cityData.forEach((_) => {
    const geoCoord = geoCoordMap[_.name]
    if (geoCoord) {
      res.push({
        name: _.name,
        value: geoCoord.concat(_.value),
      })
    }
  })
  return res
}
export default {
  data() {
    return {
      options: {},
      cityData: null,
    }
  },
  methods: {
    init(data) {
      this.options = {
        bmap: {
          key: "9EL8yDqL35kdtjhrxts0oF1mAo53dRqq",
          center: [108.954355, 34.346721],
          zoom: 5,
          roam: false,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3",
                },
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999",
                },
              },
            ],
          },
        },
        title: {
          text: "新中地外卖大盘",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "新中地外卖",
            coordinateSystem: "bmap",
            type: "scatter",
            data,
            encode: {
              value: 2,
            },
            symbolSize(value) {
              return value[2] / 10
            },
          },
          {
            name: "新中地外卖",
            coordinateSystem: "bmap",
            type: "effectScatter",
            data: data
              .sort((a, b) => {
                return b.value[2] - a.value[2]
              })
              .slice(0, 10),
            rippleEffect: {
              color: "purple",
              brushType: "stroke",
            },
            encode: {
              value: 2,
            },
            symbolSize(value) {
              return value[2] / 10
            },
            tooltip: {
              formatter(params) {
                return params.data.name + "销售额" + params.data.value[2]
              },
              textStyle: {
                color: "green",
              },
            },
          },
        ],
      }
    },
  },
  mounted() {
    loadMap("9EL8yDqL35kdtjhrxts0oF1mAo53dRqq").then(async () => {
      const res = await getMapdata()
      this.cityData = convertData(res.city, res.geodata)
      this.init(this.cityData)
    })
  },
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
