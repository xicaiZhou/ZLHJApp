<template>
  <div>
    <div>
      <van-tabbar route v-model="active" @change="onChange">
        <van-tabbar-item replace to="/main" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search">查询</van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>  
  </div>
</template>

<script>
export default {
data(){
    return{
        active:2
    }
}
}
</script>

<style>

</style>