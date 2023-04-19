<template>
  <div class="home">
    <top-comp/>
    <second-comp/>
    <third-comp/>
    <map-comp/>
  </div>
</template>

<script>
import TopComp from '../components/TopComp'
import SecondComp from '../components/SecondComp'
import ThirdComp from '../components/ThirdComp'
import MapComp from '../components/MapComp'
export default {
  name: "AdminHome",
  components:{
    TopComp,
    SecondComp,
    ThirdComp,
    MapComp
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  // height: 100%;
  padding: 20px;
  background-color: #eee;
}
</style>
