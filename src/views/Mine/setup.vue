<template>
  <div>
    <div class="section">个人信息</div>
    <van-cell-group>
      <van-field style="height:100px"
      disabled
        v-model="value1"
        label="头像"
        right-icon="smile-o"
        
        center
      />
      <van-field
        v-model="value2"
        label="用户名"
        placeholder="tanzhen01"
       
      />
    </van-cell-group>
    <div class="section">系统信息</div>
    <van-cell-group>
      <van-field
        v-model="value1"
        label="修改密码"
        disabled
        is-link
        @click="alterpasswordselect"
      />
      <van-field
        v-model="value2"
        label="缓存"
        placeholder="17.45M"
        disabled
        is-link
      />
    </van-cell-group>
    <div class="section">登录方式(只对本机有效)</div>
    <van-cell-group>
      <van-field
        v-model="value1"
        label="TouchID或FaceID"
        label-width="10em"
        disabled
        is-link
      />
      <van-field
        v-model="value2"
        label="手势"
        disabled
        is-link
      />
    </van-cell-group>
    <div style="padding:30px"><van-button type="primary" size="large" color="#333333">登出</van-button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      value1:'',
      value2:''
    };
  },
  methods: {
    alterpasswordselect() {
      this.$router.push({
         path: "/getphonecode"
      });
    }
  },
};
</script>

<style scoped>
.section {
  background: gray;
  height: 30px;
  width: 100%;
  color: white;
  font: 20px;
  padding-top: 5px;
  padding-left: 15px;
}
</style>