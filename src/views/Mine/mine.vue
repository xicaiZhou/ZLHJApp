<template>
  <div>
    <div class="bgView">
       <van-image round style="margin-top:75px;margin-left:30px;" width="6rem" height="6rem" fit="contain" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
       <div class="name">用户名</div>
    </div>
    <van-cell-group>
      <van-field
        v-model="value1"
        label="车惠贷推广码"
        left-icon="smile-o"
        placeholder="12344"
        disabled="true"
        is-link
      />
      <van-field
        v-model="value2"
        label="微信绑定"
        left-icon="music-o"
        placeholder="已绑定"
        disabled="true"
        is-link
      />
      <van-field
        v-model="value2"
        label="操作手册"
        left-icon="music-o"
        disabled="true"
        is-link
      />
      <van-field
        v-model="value2"
        label="设置"
        left-icon="music-o"
        disabled="true"
        is-link
        @click="setupselect"
      />
      <van-field
        v-model="value2"
        label="版本号"
        left-icon="music-o"
        placeholder="1.0.0"
        disabled="true"
        is-link
      />
  </van-cell-group>

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
  data() {
    return {
      active: 2
    };
  },
  methods: {
    setupselect() {
      this.$router.push({
         path: "/setup"
      });
    }
  },
};
</script>

<style scoped>
.bgView {
  background: rgb(255, 145, 0);
  display: flex;
  height: 200px;
  width: 100%;
}
.name {
  color: black;
  font: 30px;
  height: 30px;
  margin-top: 110px;
  margin-left: 20px;
}
</style>