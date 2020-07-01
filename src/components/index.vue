<template>
  <div>
    <van-nav-bar title="中联惠捷" />

    <div style="margin:30px">
      <h4 style="color:red">临时功能展示，上线后无此界面</h4>
      <van-button style="margin-top:25px" round block type="info" @click="one">初筛结果查询</van-button>
      <van-button style="margin-top:25px" round block type="info" @click="two">pdf列表</van-button>
      <van-button style="margin-top:25px" round block type="info" @click="four">demo</van-button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
   //初筛结果查询
   one(){
     this.$router.push(
      {
        path:'/search',
        query:{
          userId:'101'
        }
      })
   },
   two(){
     this.$router.push(
       {
         path:'manualList'
      })
   },

      four(){
     this.$router.push({path:"main"})
   }
  }
};
</script>

<style>
</style>
