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
  mounted(){
        //js与原生app交互  //原生掉JS
    window.hideHUD = res => {
      this.hideHUD();
    };
  },
  methods:{
    hideHUD(){
      this.$toast.clear()
    }
  },
  created() {
    // //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("store")) {
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state,
    //       JSON.parse(sessionStorage.getItem("store"))
    //     )
    //   );
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload", () => {
    //   sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    // });
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}

#app {
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  left: 0;
  top: 0;
  padding-bottom: 0.9rem;
}

.systemAppColor {
  background: #00ff00;
}
.readOnly {
  pointer-events: none !important;
  background-color: #f7f7f7 !important;
}
.read{
  pointer-events: auto !important;
  background-color:#fff !important;
}

.van-field__body input {
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.subBtn {
  position: fixed !important;
  left: 0 !important;
  bottom: 5px !important;
  width: 100% !important;
  background: #fff !important;
}

.subBtn_body {
  width: 90% !important;
  margin: auto !important;
  background: #385783 !important;
  border: none !important;
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
  background-color: #385783;
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
  color: #385783;
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