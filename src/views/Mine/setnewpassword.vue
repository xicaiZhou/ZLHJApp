<template>
  <div>
    <div class="section">请为您的账号130****0099设置一个新密码</div>
    <van-cell-group>
      <van-field v-model="value2" label="设置新密码" placeholder="请输入新密码(8位以上英文+数字)" />
      <van-field v-model="value2" label="确认新密码" placeholder="请输入新密码(8位以上英文+数字)" />
    </van-cell-group>
    <div style="padding:30px">
      <van-button type="primary" size="large" color="#333333">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      value2: ""
    };
  }
};
</script>

<style scoped>
.section {
  background: #dfdfdf;
  height: 30px;
  width: 100%;
  color: #999999;
  font: 10px;
  padding-top: 15px;
  padding-left: 15px;
}
</style>