<template>
  <div>
    <div class="section">个人信息</div>
    <van-cell-group>
      <!-- <van-field style="height:100px"
      disabled
        v-model="value1"
        label="头像"
        right-icon="smile-o"
        
        center
      />-->
      <van-field  v-model="value2" label="用户名" placeholder="tanzhen01" />
    </van-cell-group>
    <div class="section">系统信息</div>
    <van-cell-group>
      <van-field v-model="value1" label="修改密码" disabled is-link @click="alterpasswordselect" />
      <van-field
        v-model="value2"
        label="缓存"
        placeholder="17.45M"
        disabled
        is-link
        @click="huancun(3)"
      />
    </van-cell-group>
    <div class="section">登录方式(只对本机有效)</div>
    <van-cell-group>
      <div class="TouchID van-hairline--bottom">
        <div>TouchID或FaceID</div>
        <van-switch style="margin-top:10px" v-model="checked" size="24px" @click="huancun(1)" />
      </div>

      <van-field v-model="value2" label="手势" disabled is-link @click="huancun(2)" />
    </van-cell-group>
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
      active: 2,
      value1: "",
      value2: "",
      checked: true
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
        path: "/getphonecode"
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
.TouchID{
  display: flex;
  padding: 0 15px;
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  justify-content: space-between;
}
</style>