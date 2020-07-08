<template>
  <div>
    <div class="section">
      为确保是您本人操作，请完成以下办证
      <br />短信验证码已经发送至您的手机130****0099
    </div>
    <van-field v-model="sms" center clearable label="手机验证码" placeholder="请输入验证码">
      <template #button>
        <van-button size="small" type="primary">获取验证码</van-button>
      </template>
    </van-field>
    <div style="padding:30px">
      <van-button type="primary" size="large" color="#333333" @click="next">下一步</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      sms: ""
    };
  },
  methods: {
    next() {
      this.$router.push({
        path: "/setnewpassword"
      });
    }
  }
};
</script>

<style scoped>
.section {
  background: #dfdfdf;
  height: 75px;
  color: #999999;
  font: 10px;
  padding-top: 15px;
  padding-left: 15px;
}
</style>