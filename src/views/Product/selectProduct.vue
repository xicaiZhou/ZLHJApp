<template>
  <div style="height:100%; margin-bottom: 60px;">
    <div>
      <div>
        <div class="header">资方信息</div>
        <van-field
          required
          is-link
          readonly
          clickable
          label="选择资方:"
          placeholder="请选择资方"
          v-model="loanInfo.fcName"
          @click="showZF = true"
        />
      </div>
      <div>
        <div style="display:flex;   justify-content: space-between;">
          <div class="header">产品信息</div>
          <div
            style="color:#ffffff; height:30px;background-color:#ff9900;padding:0 10px;margin-right:10px; margin-top:10px;line-height:30px"
            @click="reimbursementPlan"
          >还款计划表</div>
        </div>
        <van-field
          required
          is-link
          readonly
          clickable
          label="产品:"
          placeholder="请选择产品"
          v-model="loanInfo.productName"
          @click="toSelectProduct"
        />
        <van-collapse v-model="showProductAdditionalInfo">
          <van-collapse-item title="产品附加费用项:" name="1">
            <div class="ProductAdditionalBody">
              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">产品附加费用</div>
                <div class="ProductAdditionalitem_right">金额（元）</div>
              </div>
            </div>

            <div
              class="ProductAdditionalBody"
              v-for="(item, index) in productDetailInfo.expenseList"
              :key="index"
            >
              <div class="ProductAdditionalitem">
                <div
                  class="ProductAdditionalitem_left van-hairline--right"
                >{{expenseType(item.expenseType)}}</div>
                <div class="ProductAdditionalitem_right">{{item.expense}}</div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-field
          required
          is-link
          readonly
          clickable
          label="贴息方案:"
          v-model="TXPlanDetail.name"
          placeholder="请选择贴息方案"
          @click="showTXPlan=true"
        />
        <van-field
          clickable
          label="厂商贴息(元):"
          placeholder="请填写厂商贴息"
          v-model="loanInfo.manufacturerAmount"
        />
        <van-field
          clickable
          label="经销商贴息(元):"
          placeholder="请填写经销商贴息"
          v-model="loanInfo.dealerAmount"
        />
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">签署《新信息确认书》：</span>
            <div class="zlhjRadio_body">
              <div
                @click="loanInfo.isSign = '1'"
                :class="loanInfo.isSign == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="loanInfo.isSign = '2'"
                :class="loanInfo.isSign == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <div class="readOnly">
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">是否打包:</span>
            <div class="zlhjRadio_body">
              <div
                @click="loanInfo.packFlag = '1'"
                :class="loanInfo.packFlag == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="loanInfo.packFlag = '2'"
                :class="loanInfo.packFlag == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <div class="readOnly">
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">是否需要安装GPS:</span>
            <div class="zlhjRadio_body">
              <div
                @click="loanInfo.hasGps = '1'"
                :class="loanInfo.hasGps == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="loanInfo.hasGps = '2'"
                :class="loanInfo.hasGps == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <van-field
          class="readOnly"
          required
          clickable
          label="项目总额(元):"
          v-model="loanInfo.totalAmount"
        />
        <van-field class="readOnly" required clickable label="租赁期限(月):" v-model="loanInfo.term" />
        <van-field required clickable label="首付金额(元):" v-model="loanInfo.downPaymentAmount" />
        <van-field
          class="readOnly"
          required
          clickable
          label="首付比例(%):"
          v-model="loanInfo.downPaymentRate"
        />
        <van-field class="readOnly" required clickable label="融资金额(元):" v-model="loanInfo.amount" />
        <van-field
          class="readOnly"
          required
          clickable
          label="净融资额(元):"
          v-model="loanInfo.netAmount"
        />
        <van-field class="readOnly" required clickable label="租赁成数(%):" v-model="loanInfo.rate" />
        <van-field
          class="readOnly"
          required
          clickable
          label="还款周期:"
          v-model="loanInfo.repaymentCycleTypeValue"
        />
        <van-field required clickable label="每期租金(元):" v-model="loanInfo.monthRent" />
      </div>
      <div>
        <div class="header">支付信息</div>
        <van-field class="readOnly" required clickable label="支付方式:" v-model="zfType"></van-field>
        <van-field
          required
          is-link
          readonly
          clickable
          @click="showAccount = true"
          label="付款账户:"
          placeholder="请选择付款账户"
          v-model="accountInfo.accountNumber"
        />
        <van-field
          class="readOnly"
          required
          clickable
          label="户名:"
          v-model="accountInfo.accountName"
        />
        <van-field
          class="readOnly"
          required
          clickable
          label="开户银行:"
          v-model="accountInfo.bankName"
        />
        <van-field
          class="readOnly"
          required
          clickable
          label="支行名称:"
          v-model="accountInfo.subbranchName"
        />
      </div>
    </div>
    <div class="subBtn">
      <van-button class="subBtn_body" block type="info" @click="toSub">保 存</van-button>
    </div>
    <div>
      <van-popup
        v-model="showZF"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="zfList"
          @confirm="selectZF"
          @cancel="showZF=false"
        />
      </van-popup>
      <van-popup
        v-model="showTXPlan"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="TXPlanList"
          @confirm="selectTXPlan"
          @cancel="showTXPlan=false"
        />
      </van-popup>
      <van-popup
        v-model="showAccount"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="accountList"
          @confirm="selectAccount"
          @cancel="showAccount=false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import {
  loanDetailAndRepaymentPlan,
  financingChannelList,
  financingChannelAccountList,
  productDetail,
  productDiscountInterest,
  productDiscountInterestDetail,
  financingChannelAccountDetail,
  calculationFinancingAmount,
  updateLoanDetail
} from "../../request/api";

export default {
  data() {
    return {
      showProductAdditionalInfo: ["1"],
      zfList: [],
      fcList: [],
      accountList: [],
      account: [],
      TXPlan: [],
      TXPlanList: [],
      showZF: false,
      showTXPlan: false,
      showAccount: false,
      zfType: "受托",
      productDetailInfo: {
        expenseList: [],
        executeRate: 0, // 执行利率
        expenseTotalAmount: 0, //费用总额
        packFlag: "" //是否打包 是否打包 1-是，2-否
      },
      accountInfo: {
        id: 0,
        fcId: 0, //资方ID
        bankId: 0, //所属银行ID
        bankName: "", // 所属银行名称
        subbranchId: 0, //所属支行ID
        subbranchName: "", //所属支行名称
        provinceId: "", //所在省
        cityId: "", //所在市
        accountNumber: "", //账户
        accountName: "", //户名
        state: "" // 状态 1-有效，2-无效
      },
      TXPlanDetail: {
        id: 0, //贴息id
        productId: 0, // 产品ID
        name: "", //贴息名称
        manufacturerFlag: "", //是否厂商贴息 1-是，2-否
        manufacturerModel: "", //厂商贴息方式 1-固定金额贴息，2-按比率贴息
        manufacturerAmount: 0, //厂商贴息金额
        manufacturerRate: 0, //厂商贴息比例
        dealerFlag: "", //是否经销商贴息 1-是，2-否
        dealerModel: "", //经销商贴息方式 1-固定金额贴息，2-按比率贴息
        dealerAmount: 0, //经销商贴息金额
        dealerRate: 0, //经销商贴息比例
        state: "" //状态 1-有效，2-无效
      },
      loanInfo: {
        loanNumber: "",
        businessModel: "", // 业务类型 1-租赁，2-贷款
        leaseType: "", //租赁模式 1-直租，2-回租
        hasGps: "", //是否安装GPS 1-是，2-否
        isCs: "", //是否产险推荐 1-是，2-否
        isJjk: "", //是否聚家客推荐 1-是，2-否
        totalAmount: 0, //融资总额
        downPaymentAmount: 0, //首付金额
        amount: 0, //融资金额
        term: 0, //融资期限
        repaymentMethod: "", //还款方式 1-等额本息，2-等额本金，3-等本等息
        useMethod: "", //融资用途 数据字典-贷款用途
        rate: 0, //融资成数
        downPaymentRate: 0, //首付比例
        netAmount: 0, //净融资金额
        repaymentCycleType: "", //还款周期 1-按月
        repaymentCycleTypeValue: "按月",
        monthRent: 0, //每月租金
        gpsAmount: 0, //GPS金额
        carAmount: 0, //车辆费用
        productName: "", //产品名称
        productId: 0, //产品ID
        packFlag: "", //是否打包 1-是，2-否
        fcId: 0, //资方ID
        fcName: "", //资方名称
        executeRate: 0, //执行利率(%)
        capitalCost: 0, //资金成本(%)
        pdiId: 0, //贴息方案ID
        manufacturerAmount: 0, //厂商贴息金额
        dealerAmount: 0, //经销商贴息金额
        fcaId: 0, //资方账号ID
        paymentMethod: "", //还款方式
        isSign: "" //是否签署《新信息确认书》 1-是，2-否
      }
    };
  },
  watch: {
    "$store.state.productItem": {
      deep: false,
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.loanInfo.productName = newValue.name;
        this.loanInfo.productId = newValue.id;
        this.getProductDetail(this.loanInfo.productId, true);
      }
    }
  },
  methods: {
    reimbursementPlan() {
      this.$router.push({
        name: "reimbursementPlan",
        params: {
          amount: this.loanInfo.amount,
          term: this.loanInfo.term,
          rate: this.loanInfo.executeRate,
          repaymentMethod: this.loanInfo.repaymentMethod
        }
      });
    },
    toSelectProduct() {
      if (this.loanInfo.fcId) {
        this.$router.push({
          name: "productList",
          params: {
            financingChannelId: this.loanInfo.fcId
          }
        });
      }else{
        this.$toast.fail("请选择资方");
        return
      }
    },
    toSub() {
      if (this.loanInfo.fcId == null || this.loanInfo.fcId == 0) {
        this.$toast.fail("请选择资方");
        return;
      }
      if (this.loanInfo.productId == null || this.loanInfo.productId == 0) {
        this.$toast.fail("请选择产品");
        return;
      }
      if (isEmpty(this.loanInfo.isSign)) {
        this.$toast.fail("请选择是否签署《新信息确认书》");
        return;
      }
      if (isEmpty(this.loanInfo.isSign)) {
        this.$toast.fail("请选择是否签署《新信息确认书》");
        return;
      }
      if (
        this.loanInfo.downPaymentAmount == null ||
        this.loanInfo.downPaymentAmount == 0
      ) {
        this.$toast.fail("请填写首付金额");
        return;
      }
      if (this.loanInfo.fcaId == null || this.loanInfo.fcaId == 0) {
        this.$toast.fail("请选择付款账号");
        return;
      }
      const toast = this.$toast.loading({
        duration: 0,
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      let param = {
        loanNumber: this.$store.state.loanNumber,
        downPaymentAmount: this.loanInfo.downPaymentAmount,
        repaymentCycleType: this.loanInfo.repaymentCycleType,
        productId: this.loanInfo.productId,
        fcId: this.loanInfo.fcId,
        fcName: this.loanInfo.fcName,
        pdiId: this.loanInfo.pdiId,
        manufacturerAmount: this.loanInfo.manufacturerAmount,
        dealerAmount: this.loanInfo.dealerAmount,
        fcaId: this.loanInfo.fcaId,
        paymentMethod: this.loanInfo.paymentMethod,
        isSign: this.loanInfo.isSign
      };
      updateLoanDetail(param).then(res => {
        toast.clear();
        this.$router.back();
      });
    },
    expenseType(type) {
      var str = "";
      switch (parseInt(type)) {
        case 10:
          str += "保证金";
          break;
        case 20:
          str += "服务费(意外险)";
          break;
        case 21:
          str += "服务费2";
          break;
        case 22:
          str += "服务费";
          break;
        case 30:
          str += "GPS固定成本";
          break;
        case 40:
          str += "信息服务费";
          break;
        case 90:
          str += "其他费用";
          break;
      }
      return str;
    },
    selectTXPlan(value) {
      let id = 0;
      for (let index in this.TXPlan) {
        if (this.TXPlan[index].name == value) {
          id = this.TXPlan[index].id;
          break;
        }
      }
      this.showTXPlan = false;
      this.getTXPlanDetail(id);
    },
    // 贴息详情
    getTXPlanDetail(id) {
      productDiscountInterestDetail({ id: id }).then(res => {
        console.log("贴息详情", res);
        this.TXPlanDetail = res.data.data;
        let amount = this.loanInfo.amount;
        if (this.TXPlanDetail.manufacturerFlag == "1") {
          if (this.TXPlanDetail.manufacturerModel == "1") {
            this.loanInfo.manufacturerAmount = this.TXPlanDetail.manufacturerAmount;
          } else {
            this.loanInfo.manufacturerAmount = (
              (this.TXPlanDetail.manufacturerRate * amount) /
              100
            ).toFixed(2);
          }
        } else {
          this.loanInfo.manufacturerAmount = 0;
        }

        if (this.TXPlanDetail.dealerFlag == 1) {
          if (this.TXPlanDetail.dealerModel == "1") {
            this.loanInfo.dealerAmount = this.TXPlanDetail.dealerAmount;
          } else {
            this.loanInfo.dealerAmount = (
              (this.TXPlanDetail.dealerRate * amount) /
              100
            ).toFixed(2);
          }
        } else {
          this.loanInfo.dealerAmount = 0;
        }

        this.loanInfo.pdiId = res.data.data.id;
      });
    },
    // 选择资方
    selectZF(val) {
      for (let index in this.fcList) {
        if (this.fcList[index].name == val) {
          this.loanInfo.fcId = this.fcList[index].id; //资方ID
          this.loanInfo.fcName = val; //资方名称
          break;
        }
      }
      // 清空支付信息
      this.accountInfo = {};
      // 重新获取支付账号列表
      this.getFinancingChannelAccountList();
      this.showZF = false;
    },
    // 选择付款账号
    selectAccount(item) {
      for (let index in this.account) {
        if (this.account[index].accountNumber == val) {
          this.loanInfo.fcId = this.fcList[account].accountNumber; //资方ID
          this.loanInfo.fcName = val; //资方名称
          break;
        }
      }
    },
    // 获取界面数据
    getLoanDetailAndRepaymentPlan() {
      loanDetailAndRepaymentPlan({
        loanNumber: this.$store.state.loanNumber
      }).then(res => {
        console.log(res);
        this.loanInfo = res.data.data;
        this.loanInfo.repaymentCycleType = "1";
        this.loanInfo.repaymentCycleTypeValue = "按月";
        if (this.loanInfo.productId) {
          this.getProductDetail(this.loanInfo.productId, false);
          this.getProductDiscountInterest();
        }
        if (this.loanInfo.pdiId) {
          this.getTXPlanDetail(this.loanInfo.pdiId);
        }
        //获取账户列表
        if (this.loanInfo.fcId) {
          this.getFinancingChannelAccountList();
        }

        if (this.loanInfo.fcaId) {
          this.getFinancingChannelAccountDetail(this.loanInfo.fcaId);
        }
      });
    },
    // 获取产品贴息方案
    getProductDiscountInterest() {
      productDiscountInterest({ productId: this.loanInfo.productId }).then(
        res => {
          console.log("贴息方案：", res);
          this.TXPlan = res.data.data;
          this.TXPlanList = [];
          for (let index in this.TXPlan) {
            this.TXPlanList.push(this.TXPlan[index].name);
          }
        }
      );
    },
    // 获取产品详情
    getProductDetail(id, type) {
      var param = {
        productId: id,
        amount: this.loanInfo.amount,
        loanNumber: this.$store.state.loanNumber
      };
      productDetail(param).then(res => {
        console.log("产品详情：", res);
        this.productDetailInfo = res.data.data;
        if (type) {
          // 选择产品
          // 计算金额
          this.loanInfo.pdiId = 0;
          this.loanInfo.manufacturerAmount = 0;
          this.loanInfo.dealerAmount = 0;
          this.loanInfo.executeRate = this.productDetailInfo.executeRate;
          this.loanInfo.packFlag = this.productDetailInfo.packFlag;
          // 从新获取贴息方案
          this.getProductDiscountInterest();
          //计算金额
          this.getCalculationFinancingAmount();
        }
      });
    },
    // 资方列表
    getFinancingChannelList() {
      financingChannelList().then(res => {
        console.log("资方列表：", res);
        this.fcList = res.data.data;
        for (let index in this.fcList) {
          this.zfList.push(this.fcList[index].name);
        }
      });
    },
    // 获取账号列表
    getFinancingChannelAccountList() {
      if (this.loanInfo.fcId == 0 || this.loanInfo.fcId == null) {
        this.$toast.fail("请先选择资方");
        return;
      }
      financingChannelAccountList({
        financingChannelId: this.loanInfo.fcId
      }).then(res => {
        this.accountList = [];
        console.log("付款账户列表：", res);
        this.account = res.data.data;
        for (let index in this.account) {
          this.accountList.push(this.fcList[index].name);
        }
      });
    },
    //账号详情
    getFinancingChannelAccountDetail(id) {
      financingChannelAccountDetail({ id: id }).then(res => {
        console.log("账号详情", res);
        this.accountInfo = res.data.data;
      });
    },
    //计算金额
    getCalculationFinancingAmount() {
      let param = {
        productId: this.loanInfo.productId,
        downPaymentAmount: this.loanInfo.downPaymentAmount,
        loanNumber: this.$store.state.loanNumber
      };
      calculationFinancingAmount(param).then(res => {
        console.log("计算金额：", res);
        this.loanInfo.amount = res.data.data.amount;
        this.loanInfo.downPaymentRate = res.data.data.downPaymentRate;
        this.loanInfo.netAmount = res.data.data.netAmount;
        this.loanInfo.monthRent = res.data.data.monthRent;
      });
    }
  },

  mounted() {
    this.getLoanDetailAndRepaymentPlan();
    this.getFinancingChannelList();
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  }
};
</script>

<style scoped>
.ProductAdditionalBody {
  width: 90%;
  margin: 0 auto;
  border-style: solid;
  border-color: #d5d5d5;
  border-width: 1px;
}
.ProductAdditionalitem {
  display: flex;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.ProductAdditionalitem_left {
  width: 50%;
}
.ProductAdditionalitem_right {
  width: 50%;
}
</style>