<template>
  <div>
    <div class="top">
      <div class="header">查询条件</div>
      <div class="content">
        <div style="width:50%">融资金额：{{this.$route.params.amount}}元</div>
        <div>期限：{{this.$route.params.term}}月</div>
      </div>
      <div class="content">
        <div style="width:50%">执行利率：{{this.$route.params.rate}}%</div>
        <div>还款方式：{{getRepaymentMethodValue(this.$route.params.repaymentMethod)}}</div>
      </div>
      <div class="header">还款计划表</div>
      <div class="plan van-hairline--bottom"  style="font-size:14px">
        <div style="flex: 0.6;">期数</div>
        <div class="item">本金</div>
        <div class="item">利息</div>
        <div class="item">租金</div>
        <div class="item">服务费</div>
      </div>
    </div>
    <div style="margin-top:170px;height:100%">
      <div class="plan van-hairline--bottom" style="font-size:12px" v-for="(item, index) in planList" :key="index">
        <div style="flex: 0.6; text-align:center">{{item.term}}</div>
        <div class="item">{{item.capital}}</div>
        <div class="item">{{item.interest}}</div>
        <div class="item">{{item.monthlyFee}}</div>
        <div class="item">{{item.otherFee}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { repaymentPlan } from "../../request/api";
export default {
  data() {
    return {
      planList: []
    };
  },
  mounted() {
    console.log("还款计划表参数：", this.$route.params);
    this.getRepaymentPlan();
  },
    beforeRouteLeave(to, from, next) {
    if (to.path == "/selectProduct") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  methods: {
    getRepaymentPlan() {
      repaymentPlan(this.$route.params).then(res => {
        console.log("还款计划表：", res);
        this.planList = res.data.data;
      });
    },
    getRepaymentMethodValue(repaymentMethod) {
      //    1-等额本息，2-等额本金，3-等本等息
      switch (parseInt(repaymentMethod)) {
        case 1:
          return "等额本息";
          break;
        case 2:
          return "等额本金";
          break;
        case 3:
          return "等本等息";
          break;
        default:
          return "";
          break;
      }
    }
  }
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 170px;
  position: fixed;
  top: 0px;
  width: 100%;
  background: #ffffff;
  z-index: 10;
}
.top .content {
  padding: 0 20px;
  display: flex;
  height: 30px;
  color: #333333;
  font-size: 14px;
}
.plan {
  display: flex;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
}
.item {
  flex: 1;
  text-align: center;
}
</style>