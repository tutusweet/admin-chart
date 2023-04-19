<template>
  <div class="map-comp">
    <div class="left">
      <BmapScatter></BmapScatter>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template #header>
          <h2>订单同比增长</h2>
        </template>
        <template>
          <LiquiedFill></LiquiedFill>
        </template>
      </el-card>
      <el-card shadow="hover">
        <template #header>
          <h2>热门搜索</h2>
        </template>
        <template> 
          <WordCloud></WordCloud>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import BmapScatter from "./BmapScatter.vue"
import LiquiedFill from "./LiquiedFill.vue"
import WordCloud from "./WordCloud.vue";

export default {
  components: { BmapScatter, LiquiedFill, WordCloud },
}
</script>

<style lang="scss" scoped>
.map-comp {
  display: flex;
  margin-top: 20px;
  gap:20px;
  justify-content: space-between;
  .left {
    flex: 0 0 78%;
    height: 600px;
    position: relative;
  }
  .right {
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-card {
      height: 280px;
      h2{
        font-weight: 600;
      }
      ::v-deep .el-card__header {
        padding: 18px 20px;
        border-bottom: 1px solid #ebeef5;
      }
      ::v-deep .el-card__body{
        height: 227px;
      }
    }
  }
}
</style>
