<template>
  <div>
    <button @click="network1">接口测试</button>
    <textarea name="a" id="asd" cols="30" rows="10"> {{ content }} </textarea>
  </div>
</template>

<script>
import { network } from "../../request/api";
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    network1() {
      var params = Object.assign(
        {
          param: {
            userID: "110"
          }
        },
        { APITYPE: "select" },
        { uid: "songchunlei01" },
        { actType: "4" },
        { versionName: "1.8.0" },
        { ORG_CODE: "ZLHJHelp" },
        { sourceDevice: "1" },
        { SERVICE_SN: "70945120200609522229" },
        { SERVICE_NAME: "APP_CREATEORDER" },
        { CORE_SERVICENAME: "search.carouselData.info" }
      );
      console.log(params)
      network(params).then(res=>{
        //   console.log(res)
      })
    }
  }
};
</script>

<style>
</style>