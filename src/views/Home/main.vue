<template>
  <div>
    <div class="content">
      <span>录单</span>

      <van-grid clickable>
        <van-grid-item icon="coupon-o" text="录单" to="/menu"/>
        <van-grid-item icon="search" text="查询" to="/search"/>
      </van-grid>
    </div>
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
import { getAddress } from '../../request/api'
export default {
  data() {
    return {
      active: 0
    };
  },
  mounted(){
    this.address()
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    address(){
      getAddress().then(res=>{
        this.$store.state.address = res.data.data;
      })
    }
  },

};
</script>

<style scoped>
.content {
  margin: 20px;
  padding: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: #f7f7f7;
}
</style>