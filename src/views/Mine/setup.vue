<template>
  <div>
    <div class="section">个人信息</div>
    <van-cell-group>
      <div class="header1 van-hairline--bottom">
        <div>头像</div>
        <div>
          <van-image
            round
            style="margin-top:10px;margin-left:30px;"
            width="3rem"
            height="3rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </div>

      <van-field v-model="value2" label="用户名" placeholder="tanzhen01" />
    </van-cell-group>
    <div class="section">系统信息</div>
    <van-cell-group>
      <van-field v-model="value1" label="修改密码" disabled is-link @click="alterpasswordselect" />
      <van-field v-model="value2" label="缓存" placeholder="17.45M" disabled is-link />
    </van-cell-group>
    <div class="section">登录方式(只对本机有效)</div>
    <van-cell-group>
      <van-field v-model="value1" label="TouchID或FaceID" label-width="10em" disabled is-link />
      <van-field v-model="value2" label="手势" disabled is-link />
    </van-cell-group>
    <div class="subBtn">
      <van-button class="subBtn_body" block type="info" @click="toSub">登 出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      value1: "",
      value2: ""
    };
  },
  methods: {
    alterpasswordselect() {
      this.$router.push({
        path: "/getphonecode"
      });
    },
    toSub() {}
  }
};
</script>

<style scoped>
.section {
  background: #ff9900;
  height: 30px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  line-height: 28px;
  padding-left: 15px;
}
.header1 {
  height: 60px;
  display: flex;
  padding: 0 20px;
  line-height: 60px;
  justify-content: space-between;
}
</style>