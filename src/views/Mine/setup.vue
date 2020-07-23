<template>
  <div>
    <div class="section">个人信息</div>
    <van-cell-group>
      <van-field
        v-model="this.$store.state.userInfo.loginSysUserVo.username"
        label="用户名"
      />
    </van-cell-group>
    <div class="section">系统信息</div>
    <van-cell-group>
      <van-field v-model="value1" label="修改密码" disabled is-link @click="alterpasswordselect" />
      <van-field
        v-model="cache"
        label="缓存"
        disabled
        is-link
        @click="huancun(3)"
      />
    </van-cell-group>
    <div class="section">登录方式(只对本机有效)</div>
    <van-cell-group>
      <div class="TouchID van-hairline--bottom">
        <div>TouchID或FaceID</div>
        <van-switch
          style="margin-top:10px"
          v-model="FaceIDChecked"
          size="24px"
          @click="huancun(1)"
        />
      </div>
      <div class="TouchID van-hairline--bottom">
        <div>手势</div>
        <van-switch
          style="margin-top:10px"
          v-model="gesturesChecked"
          size="24px"
          @click="huancun(2)"
        />
      </div>
      <van-field
        v-show="gesturesChecked"
        label="修改手势密码"
        disabled
        is-link
        @click="huancun(6)"
      />
    </van-cell-group>
    <div>{{info}}</div>
    <div style="padding:30px">
      <van-button type="primary" size="large" color="#ff9900" @click="goLogout">登 出</van-button>
    </div>
  </div>
</template>

<script>
import { bridge } from "../../utils/bridge";
import { logout } from "../../request/api";
export default {
  data() {
    return {
      info:{},
      cache: this.$store.state.systemInfo.cache,
      FaceIDChecked: this.$store.state.systemInfo.phoneIsTouchID,
      gesturesChecked: this.$store.state.systemInfo.phoneIsGesture,
    };
  },
  mounted() {
      // const toast = this.$toast.loading({
      //   duration: 0,
      //   message: "",
      //   forbidClick: true,
      //   loadingType: "spinner"
      // });
    window.systemInfo = res => {
      this.$store.commit("updateSystemInfo", res);
      this.info = this.$store.state.systemInfo
      // this.$toast.clear()
      this.cache = this.$store.state.systemInfo.cache
      this.FaceIDChecked = this.$store.state.systemInfo.phoneIsTouchID
      this.gesturesChecked = this.$store.state.systemInfo.phoneIsGesture
    };
  },
       
  methods: {
    goLogout() {
      logout({}).then(res => {
        this.huancun(4);
      });
    },
    huancun(type) {
      bridge(type);
    },
    alterpasswordselect() {
      this.$router.push({
        path: "/setnewpassword"
      });
    }
  }
};
</script>

<style scoped>
.section {
  height: 40px;
  color: #000;
  font-weight: bold;
  font: 20px;
  padding-top: 5px;
  padding-left: 15px;
  line-height: 35px;
}
.TouchID {
  display: flex;
  padding: 0 15px;
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  justify-content: space-between;
}
</style>