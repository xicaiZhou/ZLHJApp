<template>
  <div>
    <div class="content">
      <div>录 单</div>
      <van-grid clickable>
        <van-grid-item icon="coupon-o" text="录单" @click="toMenu" />
        <van-grid-item icon="search" text="查询" to="/search" />
      </van-grid>

      <span>贷后管理</span>
      <van-grid clickable>
        <van-grid-item icon="search" text="逾期查询" to="/overdueList" />
      </van-grid>
    </div>
    <div>
      <van-tabbar route v-model="active" @change="onChange">
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
      info: {},
      token:this.$store.state.userInfo
    };
  },
  mounted() {
      // this.$toast.success(this.$store.state.screenHeight);
      // this.$refs.tabBar.style.top = this.$store.state.screenHeight - 80  + "px";
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
      this.$router.push({
        path:'/menu'
      })
    },
    userInfo1(info) {
      this.info = info.token;
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

<style scoped>
.content {
  margin: 20px;
  padding: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: #f7f7f7;
}

</style>