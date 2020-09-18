<template>
  <div>
    <div class="content">
      <div class="mainHeader">录 单</div>
      <van-grid clickable>
        <van-grid-item icon="coupon-o" text="录单" @click="toMenu" />
        <van-grid-item icon="search" text="查询" to="/search" />
      </van-grid>

      <div class="mainHeader">贷后管理</div>
      <van-grid clickable style=" color: #385783;">
        <van-grid-item  icon="search" text="逾期查询" to="/overdueList" />
      </van-grid>

    </div>
    <div>
      <van-tabbar route v-model="active" safe-area-inset-bottom @change="onChange" active-color="#385783" inactive-color="#C7C7C7">
        <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search">查询</van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>
import { getAddress } from "../../request/api";
export default {
  data() {
    return {
      active: 0,
      info: {token:""},
      token:this.$store.state.userInfo
    };
  },
  mounted() {
      this.$store.state.loanNumber = ''
      this.$store.state.loanStatus = 0
            // this.address();

  },
  created() {
    window.userInfo = res => {
      this.userInfo1(res);
    };
  },
  methods: {
    toMenu(){
      //情况订单编号
      this.$store.state.loanNumber = ''
      this.$store.state.loanStatus = 0
      this.$router.push({
        path:'/menu'
      })
    },
    userInfo1(info) {
      this.$store.commit("updateParam", info);
      this.address();
    },
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    address() {
      getAddress().then(res => {
        this.$store.state.address = res.data.data;
        console.log("有地址");
      });
    }
  },
};
</script>
<style>
.van-tabbar-item__icon{
  font-size: 25px !important;
}
</style>
<style scoped>
.content {
  margin: 20px;
  padding: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: #f7f7f7;
}
.mainHeader{
  margin: 10px;
  font-size: 20px;
  font-weight: 800;
  color: #385783;
}

</style>