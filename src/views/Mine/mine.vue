<template>
  <div>
    <div class="bgView">
       <van-image round style="margin-top:50px;margin-left:30px;"
        width="5rem" height="5rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div style="display: inline;">
          <div class="name">{{this.$store.state.userInfo.loginSysUserVo.username}}</div>
          <div class="departmentName">{{this.$store.state.userInfo.loginSysUserVo.departmentName}}</div>
        </div>
    </div>
    <van-cell-group>
      <van-field
        label="操作手册"
        disabled="true"
        is-link
      />
      <van-field
        label="设置"
        disabled="true"
        is-link
        @click="setupselect"
      />
      <van-field
        label="版本号"
        placeholder="1.0.0"
        disabled="true"
        is-link
      />
  </van-cell-group>
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
export default {
  data() {
    return {
      active: 2,
    };
  },
  methods: {
    setupselect() {
      this.$router.push({
         path: "/setup"
      });
    },
    onChange(){

    }
  },
};
</script>

<style scoped>
.bgView {
  background: #ff9900;
  display: flex;
  height: 150px;
  width: 100%;
  
}
.name {
  color: black;
  font: 30px;
  height: 30px;
  margin-top: 60px;
  margin-left: 20px;
  font-size: 22px;
  font-weight: 500;
}
.departmentName{
  color: #333333;
  font: 30px;
  height: 30px;
  margin-left: 20px;
  font-size: 15px;
  font-weight: 500;
}
</style>