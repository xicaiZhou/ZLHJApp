<template>
  <div>
    <div class="section">请为您的账号{{name}}设置一个新密码</div>
    <van-cell-group>
      <van-field v-model="oldPassword" label="输入旧密码" placeholder="请输入新密码" />
      <van-field v-model="newPassword" label="设置新密码" placeholder="请输入新密码" />
      <van-field v-model="confirmPassword" label="确认新密码" placeholder="请输入新密码" />
    </van-cell-group>
    <div style="padding:30px">
      <van-button type="primary" size="large" color="#385783" @click="update">确认</van-button>
    </div>
  </div>
</template>

<script>
import { updatePassword } from "../../request/api";
import { bridge } from "../../utils/bridge";

export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      name: this.$store.state.userInfo.loginSysUserVo.username
    };
  },
  methods: {
    update() {
      if (this.oldPassword == "") {
        this.$toast.fail("请输入旧密码");
        return;
      }
      if (this.newPassword == "") {
        this.$toast.fail("请输入新密码");
        return;
      }
      if (this.confirmPassword == "") {
        this.$toast.fail("请确认密码");
        return;
      }

      if (this.oldPassword != this.$store.state.systemInfo.password) {
        this.$toast.fail("旧密码错误");
        return;
      }
      if (this.newPassword != this.confirmPassword) {
        this.$toast.fail("新密码与确认密码不一致");
        return;
      }
      let params = {
        userId: this.$store.state.userInfo.loginSysUserVo.id ? this.$store.state.userInfo.loginSysUserVo.id : this.$store.state.userInfo.loginSysUserVo.Id,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      }
      updatePassword(params).then(res => {
        this.$toast.success("修改密码成功！")
        bridge(4);
      });
    },

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