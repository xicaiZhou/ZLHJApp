<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created(){
    // window.screenHeight = res =>{
    //   this.$store.state.screenHeight = res
    // }
  }
};
</script>

<style>

.systemAppColor {
  background: #00ff00;
}
.readOnly {
  pointer-events: none;
  background-color: #f7f7f7;
}
.van-field__body input {
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.subBtn {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #fff;
}

.subBtn_body {
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  background: #ff9900;
  border: none;
}
.zlhjRadio {
  display: flex;
  font-size: 14px;
  line-height: 24px;
  color: #323233;
  padding: 10px 8px 10px 16px;
}
.zlhjRadio_title {
  width: 90px;
}
.zlhjRadio_title_norequired {
  width: 90px;
}
.zlhjRadio_title::before {
  position: absolute;
  left: 8px;
  color: #ee0a24;
  font-size: 14px;
  content: "*";
}
.zlhjRadio_body {
  display: flex;
  width: calc(100% - 90px);
  justify-content: flex-end;
}
.zlhjRadio_body_item {
  font-size: 12px;
  text-align: center;
  line-height: 27px;
  padding: 0 8px;
  height: 27px;
  background-color: #cccccc;
  color: #fff;
  margin-right: 8px;
}
.zlhjRadio_body_item_selected {
  font-size: 12px;
  text-align: center;
  line-height: 27px;
  padding: 0 8px;
  height: 27px;
  background-color: #ff9900;
  color: #fff;
  margin-right: 8px;
}
.zlhjRadioLine {
  padding-left: 10px;
  background-color: #f7f7f7;
  height: 1px;
}
.header {
  padding: 0 16px;
  font-size: 17px;
  font-weight: bold;
  color: #ff9900;
  height: 40px;
  line-height: 50px;
}
.headerAndBtn {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
}
</style>