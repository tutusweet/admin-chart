<template class="top-view">
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <TotalSale :reportdata="reportdata" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <TotalOrder :reportdata="reportdata" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <TodayUser :reportdata="reportdata"/>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <TotalUser :reportdata="reportdata"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getReportdata } from "@/request"
import TodayUser from "./TodayUser.vue"
import TotalOrder from "./TotalOrder.vue"
import TotalSale from "./TotalSale.vue"
import TotalUser from "./TotalUser.vue"
export default {
  components: {
    TotalSale,
    TotalOrder,
    TodayUser,
    TotalUser,
  },
  data() {
    return {
      reportdata: {},
    }
  },
  async mounted() {
    const res = await getReportdata()
    this.reportdata = res
  },
}
</script>

<style lang="scss" scoped></style>
