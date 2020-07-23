<template>
  <div>
    <div class="title">新车正审材料提交</div>
    <div class="listItem" v-for="(item,index) in listData" :key="index" @click="toDetail(item)">
      <div class="itemL">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="20" />
        <div style="margin-left:4px">{{item.name}}</div>
      </div>
      <div class="itemR" v-if="item.state <= loanStatus" >
        <van-icon name="checked" color="#ff9900"  size="22" />
        <div style="margin-left:10px;">已完成</div>
      </div>
      <div class="itemR" v-else>
        <van-icon name="info-o" size="20" />
        <div style="margin-left:10px">未开始</div>
      </div>
    </div>
    <div class="tips">提交审核后，审核人员会根据您提交的材料反馈审核结果，请耐心等待！</div>
    <div v-show="loanStatus <= 50" class="subBtn" ref="subBtn">
      <van-button
        style="width:100%;background:#ff9900;border:none"
        block
        type="info"
        @click="toSub"
      >提交正审</van-button>
    </div>
  </div>
</template>

<script>
import { submitStartTask, CarInfo } from "../../request/api";
export default {
  data() {
    return {
      loanStatus: 0,
      listData: [
        {
          name: "经销商信息",
          state: 10
        },
        {
          name: "融资业务信息",
          state: 20
        },
        {
          name: "个人信息",
          state: 30
        },
        {
          name: "产品选择",
          state: 40
        },
        {
          name: "文件上传",
          state: 50
        }
      ]
    };
  },
  mounted() {

    if (this.$store.state.loanNumber) {
      CarInfo({ loanNumber: this.$store.state.loanNumber }).then(res => {
        this.$store.state.loanStatus = res.data.data.loanStatus;
        this.loanStatus = res.data.data.loanStatus;
      });
    }
    this.$nextTick(() => {
      // this.$refs.subBtn.style.top = this.$store.state.screenHeight - 50 + "px";
    });
  },

  methods: {
    toDetail(val) {
      if (val.name === "经销商信息") {
        this.$router.push({
          path: "/carInfo"
        });
      } else if (val.name === "融资业务信息") {
        if ( this.loanStatus + 10 < val.state){
          this.$toast.fail("请先录入经销商信息")
          return
        }
        this.$router.push({
          path: "/business"
        });
      } else if (val.name === "个人信息") {
        if ( this.loanStatus + 10 < val.state){
          this.$toast.fail("请先录入融资业务信息")
          return
        }
        this.$router.push({
          path: "/userInfo"
        });
      } else if (val.name === "产品选择") {
         if ( this.loanStatus + 10 < val.state){
          this.$toast.fail("请先录入个人信息")
          return
        }
        this.$router.push({
          path: "/selectProduct"
        });
      } else if (val.name === "文件上传") {
        if ( this.loanStatus + 10 < val.state){
          this.$toast.fail("请先录入个人信息")
          return
        }
        this.$router.push({
          path: "/uploadFile"
        });
      }
    },
    toSub() {
      // 提交订单
      submitStartTask({ loanNumber: this.$store.state.loanNumber }).then(
        res => {
          this.$router.back();
        }
      );
    }
  }
};
</script>
<style scoped>
.title {
  width: 90%;
  padding: 10px 5%;
  font-size: 16px;
  margin-top: 20px;
}
.listItem {
  background: #f0f0f0;
  border: 1px solid #ebedf0;
  width: 86%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  padding: 0 2%;
  box-shadow: 0px 5px 5px #ebedf0;
  margin-top: 15px;
}
.itemL {
  width: 50%;
  float: left;
  display: flex;
  align-items: center;
}
.itemR {
  width: 30%;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.tips {
  font-size: 12px;
  padding: 0 12%;
  text-align: center;
  margin-top: 30px;
}
.subBtn {
  position: fixed;
  width: 90%;
  height: 50px;
  left: 5%;
}
</style>