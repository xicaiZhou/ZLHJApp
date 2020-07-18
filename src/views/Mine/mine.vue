<template>
  <div>
    <div class="bgView">
       <van-image round style="margin-top:50px;margin-left:30px;"
        width="5rem" height="5rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg" />
       <div class="name">用户名</div>
    </div>
    <van-cell-group>
      <!-- <van-field
        v-model="value2"
        label="微信绑定"
        left-icon="music-o"
        placeholder="已绑定"
        disabled="true"
        is-link
      /> -->
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
      value2:'',
      value1:''
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
  margin-top: 90px;
  margin-left: 20px;
}
</style>