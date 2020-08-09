<template>
<div :class="(loanStatus >= 0 && loanStatus < 60) ? '' : 'readOnly'">
  <div style="height:100%; margin-bottom: 60px;">
    <div>
      <div class="header">贷款信息</div>
      <van-field
        class="readOnly"
        required
        readonly
        label="业务模式:"
        v-model="baseInfo.businessModel == '1' ? '租赁' : '贷款' "
      />

      <div>
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">安装GPS：</span>
          <div class="zlhjRadio_body">
            <div
              @click="baseInfo.hasGps = '1'"
              :class="baseInfo.hasGps == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >是</div>
            <div
              @click="baseInfo.hasGps = '2'"
              :class="baseInfo.hasGps == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >否</div>
          </div>
        </div>
        <div style="padding-left:10px">
          <div class="zlhjRadioLine"></div>
        </div>
      </div>
      <div>
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">产险推荐：</span>
          <div class="zlhjRadio_body">
            <div
              @click="baseInfo.isCs = '1'"
              :class="baseInfo.isCs == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >是</div>
            <div
              @click="baseInfo.isCs = '2'"
              :class="baseInfo.isCs == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >否</div>
          </div>
        </div>
        <div style="padding-left:10px">
          <div class="zlhjRadioLine"></div>
        </div>
      </div>
      <div>
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">聚家客推荐：</span>
          <div class="zlhjRadio_body">
            <div
              @click="baseInfo.isJjk = '1'"
              :class="baseInfo.isJjk == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >是</div>
            <div
              @click="baseInfo.isJjk = '2'"
              :class="baseInfo.isJjk == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >否</div>
          </div>
        </div>
        <div style="padding-left:10px">
          <div class="zlhjRadioLine"></div>
        </div>
      </div>
      <div class="headerAndBtn">
        <div class="header">费用信息</div>
        <div style="width:40px;margin-top:18px;" @click="showAddCost = true">
          <van-icon color="#ff9900" size="20px" name="add-o" />
        </div>
      </div>
      <div class="costBox">
        <div
          style="display:inline-block;margin:0 8px"
          v-for="(item, index) in cosList"
          :key="index"
        >
          <div class="costBox_item">
            <div class="costBox_item_body">
              <div>费用类型: {{getValue(item.expenseType,cosTypeList)}}</div>
              <div style="margin-top:5px">实际金额: {{item.amount}} 元</div>
            </div>
            <div v-if="item.expenseType != '1'" class="costBox_item_action">
              <van-button style="height:100%;width:100%;" type="info" @click="delectCost(item)">删除</van-button>
            </div>
            <div v-else class="costBox_item_action">
              <van-button style="height:100%;width:100%;" type="info">-</van-button>
            </div>
          </div>
        </div>
      </div>
      <div class="header">租赁信息</div>
      <van-field
        class="readOnly"
        required
        v-show="baseInfo.businessModel == '1'"
        readonly
        label="租赁模式:"
        v-model="baseInfo.leaseTypeName"
      />
      <van-field
        class="readOnly"
        v-show="baseInfo.businessModel == '1'"
        type="digit"
        label="项目总额(元):"
        v-model="totalAmount"
        placeholder="请填写项目金额"
      />
      <van-field
        class="readOnly"
        v-show="baseInfo.businessModel == '2'"
        type="digit"
        label="标的物价格(元):"
        v-model="totalAmount"
        placeholder="请填写标的物价格"
      />
      <van-field
        label="首付金额(元):"
        type="digit"
        v-model="baseInfo.downPaymentAmount"
        placeholder="请填写首付金额"
      />
      <van-field
        v-show="baseInfo.businessModel == '1'"
        class="readOnly"
        label="融资金额(元):"
        type="digit"
        placeholder="请填写融资金额"
        v-model="amount"
      />
      <van-field
        v-show="baseInfo.businessModel == '2'"
        class="readOnly"
        label="贷款金额(元):"
        type="digit"
        placeholder="请填写贷款金额"
        v-model="amount"
      />
      <van-field
        is-link
        readonly
        clickable
        v-show="baseInfo.businessModel == '2'"
        label="贷款期限(月):"
        v-model="baseInfo.term"
        placeholder="请选择贷款期限"
        @click="showTerm = true"
      />
      <van-field
        is-link
        readonly
        clickable
        v-show="baseInfo.businessModel == '1'"
        label="租赁期限(月):"
        v-model="baseInfo.term"
        placeholder="请选择租赁期限"
        @click="showTerm = true"
      />
      <van-field
        is-link
        readonly
        clickable
        label="还款方式:"
        v-model="baseInfo.repaymentMethodName"
        placeholder="请选择还款方式"
        @click="showRepaymentMethod = true"
      />
      <van-field
        is-link
        readonly
        clickable
        v-show="baseInfo.businessModel == '1'"
        label="租赁用途:"
        v-model="baseInfo.useMethodValue"
        placeholder="请选择租赁用途"
        @click="showUseMethod = true"
      />
      <van-field
        is-link
        readonly
        clickable
        v-show="baseInfo.businessModel == '2'"
        label="贷款用途:"
        v-model="baseInfo.useMethodValue"
        placeholder="请选择贷款用途"
        @click="showUseMethod = true"
      />
      <van-field
        class="readOnly"
        v-show="baseInfo.businessModel == '1'"
        label="租赁成数(%):"
        type="digit"
        v-model="rate"
        placeholder="请填写租赁成数"
      />
      <van-field
        class="readOnly"
        v-show="baseInfo.businessModel == '2'"
        label="贷款成数(%):"
        type="digit"
        v-model="rate"
        placeholder="请填写贷款成数"
      />
      <van-field
        class="readOnly"
        label="GPS金额(元):"
        type="digit"
        v-model="gpsAmount"
        placeholder="请填写首付金额"
      />
      <div class="header">录单人信息</div>
      <van-field
        class="readOnly"
        label="销售姓名:"
        v-model="baseInfo.managerName"
        placeholder="请填写销售姓名"
      />
      <van-field
        class="readOnly"
        label="销售联系方式:"
        v-model="baseInfo.managerMobileNumber"
        placeholder="请填写销售联系方式"
      />
    </div>

  </div>
      <div class="subBtn" v-show="(loanStatus >= 0 && loanStatus < 60)">
      <van-button class="subBtn_body" block type="info" @click="toSub">保 存</van-button>
    </div>
    <div>
      <van-popup
        v-model="showTerm"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="termList"
          @confirm="selectTerm"
          @cancel="showTerm=false"
        />
      </van-popup>
      <van-popup
        v-model="showRepaymentMethod"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="repaymentMethodList"
          @confirm="selectRepayment"
          @cancel="showRepaymentMethod=false"
        />
      </van-popup>
      <van-popup
        v-model="showUseMethod"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="getPickData(this.useTypeList)"
          @confirm="selectUseMethod"
          @cancel="showUseMethod=false"
        />
      </van-popup>

      <van-popup
        v-model="showAddCost"
        :style="{ height: '220px', width: '90%'}"
        get-container="body"
      >
        <div>
          <div class="showAddCost_title van-hairline--bottom">添加费用信息</div>
          <div class="showAddCost_body">
            <van-field
              readonly
              clickable
              is-link
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="费用类型:"
              v-model="addCostTypeValue"
              placeholder="请选择"
              @click="showCosType = true"
            />
            <van-field
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="实际金额:"
              type="digit"
              placeholder="请填写"
              v-model="addCostAmount"
            />
          </div>
          <div class="showAddCost_btn van-hairline--top">
            <van-button style="width:50%" @click="showAddCost = false">取消</van-button>
            <van-button style="width:50%" type="info" @click="addCostAction">保存</van-button>
          </div>
        </div>
      </van-popup>
      <van-popup
        v-model="showCosType"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="getPickData(this.cosTypeList)"
          @confirm="selectCosType"
          @cancel="showCosType=false"
        />
      </van-popup>
    </div>
</div>

</template>

<script>
import {
  BusinessInfo,
  CostList,
  CalculateCost,
  addCost,
  delCost,
  saveBussinessInfo,
  codeList
} from "../../request/api";
export default {
  data() {
    return {
      loanStatus:this.$store.state.loanStatus,
      addCostAmount: "",
      addCostType: "",
      addCostTypeValue: "",
      addCostId: 0,
      showTerm: false,
      isHaveGPS: false, // 自己加的用来判断只能添加一个GPS费用类型
      showAddCost: false,
      showRepaymentMethod: false,
      showUseMethod: false,
      showCosType: false,
      cosTypeList: [],
      useTypeList: [],
      termList: ["12", "24", "36"],
      repaymentMethodList: ["等额本息", "等额本金", "等本等息"],
      totalAmount: 0, // 项目总额
      carAmount: 0,
      rate: 0, //融资成数
      gpsAmount: 0, //GPS金额

      baseInfo: {
        loanNumber: "", // 贷款申请编号
        managerName: "", //客户经理名称
        managerMobileNumber: "", //客户经理手机
        carPrice: 0, //车辆价格
        businessModel: "1", //业务模式 1-租赁，2-贷款
        leaseType: "2", //租赁模式 1-直租，2-回租
        leaseTypeName: "回租", //自己写的
        carPrice: "", //车辆价格
        hasGps: "", //是否安装GPS 1-是，2-否
        isCs: "", //是否产险推荐 1-是，2-否
        isJjk: "", // 是否聚家客推荐 1-是，2-否
        downPaymentAmount: 0, //首付金额
        term: 0, //融资期限
        repaymentMethod: "", //还款方式 1-等额本息，2-等额本金，3-等本等息
        repaymentMethodName: "", //还款方式 1-等额本息，2-等额本金，3-等本等息
        useMethod: "", //融资用途 数据字典-贷款用途
        useMethodValue: "" // 自己加的
      },
      amount: 0, //融资金额
      cosList: [] //费用信息列表
    };
  },
  watch: {
    "baseInfo.downPaymentAmount": {
      deep: true,
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.calculateCost();
      }
    },
    showAddCost: {
      deep: true,
      handler: function(newValue, oldValue) {
        if (!newValue) {
          this.addCostId = 0;
          this.addCostType = "";
          this.addCostAmount = "";
          this.addCostTypeValue = "";
        }
      }
    }
  },
  methods: {
    getPickData(list) {
      var data = [];
      for (let index in list) {
        data.push(list[index].codeValue);
      }
      return data;
    },
    // 添加费用类型
    addCostAction() {
      if (
        (this.addCostType == "6" || this.addCostType == "7") &&
        this.isHaveGPS
      ) {
        this.$toast.fail("已经存在GPS款项！");
        this.addCostType = "";
        this.addCostTypeValue = "";
        this.addCostAmount = "";
        return;
      }
      const toast = this.$toast.loading({
        duration: 0,
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      let param = Object.assign({
        id: this.addCostId,
        loanNumber: this.$store.state.loanNumber,
        expenseType: this.addCostType,
        amount: this.addCostAmount
      });

      if (this.addCostType == "" || this.addCostAmount == "") {
        this.$toast.fail("请将必填项填写完整");
        return;
      }
      console.log("保存费用：", param);
      addCost(param).then(res => {
        toast.clear();
        this.getCostList();
      });
      this.showAddCost = false;
    },
    // 删除费用
    delectCost(item) {
      const toast = this.$toast.loading({
        duration: 0,
        message: "删除中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      let param = Object.assign({
        id: item.id
      });
      delCost(param).then(res => {
        toast.clear();
        this.getCostList();
      });
    },
    // 选择费用类型
    selectCosType(val) {
      this.addCostTypeValue = val;
      this.addCostType = this.getKey(val, this.cosTypeList);
      this.showCosType = false;
    },
    getKey(str, list) {
      var id = 0;
      for (let index in list) {
        if (str == list[index].codeValue) {
          id = list[index].codeKey;
          break;
        }
      }
      return id;
    },
    getValue(id, list) {
      var str = 0;
      if (id == 1 && list == this.cosTypeList) {
        return "车辆款";
      }
      for (let index in list) {
        if (id == list[index].codeKey) {
          str = list[index].codeValue;
          break;
        }
      }
      return str;
    },
    // 选择分期
    selectTerm(val) {
      this.baseInfo.term = val;
      this.showTerm = false;
    },
    selectRepayment(val) {
      console.log(val);
      // 1-等额本息，2-等额本金，3-等本等息
      this.baseInfo.repaymentMethodName = val;
      if (val == "等额本息") {
        this.baseInfo.repaymentMethod = "1";
      } else if (val == "等额本金") {
        this.baseInfo.repaymentMethod = "2";
      } else {
        this.baseInfo.repaymentMethod = "3";
      }
      this.showRepaymentMethod = false;
    },
    selectUseMethod(val) {
      this.baseInfo.useMethodValue = val;
      this.baseInfo.useMethod = this.getKey(val, this.useTypeList);
      this.showUseMethod = false;
    },
    toSub() {
      console.log(this.baseInfo.leaseType);
      const toast = this.$toast.loading({
        duration: 0,
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      if (this.baseInfo.businessModel == "1") {
        this.baseInfo.leaseType = "2";
      } else {
        this.baseInfo.leaseType = "1";
      }

      let param = Object.assign({
        loanNumber: this.$store.state.loanNumber,
        businessModel: this.baseInfo.businessModel,
        leaseType: this.baseInfo.leaseType,
        hasGps: this.baseInfo.hasGps,
        isCs: this.baseInfo.isCs,
        isJjk: this.baseInfo.isJjk,
        totalAmount: this.totalAmount,
        downPaymentAmount: this.baseInfo.downPaymentAmount,
        amount: this.amount,
        term: this.baseInfo.term,
        repaymentMethod: this.baseInfo.repaymentMethod,
        useMethod: this.baseInfo.useMethod,
        rate: this.rate,
        gpsAmount: this.gpsAmount
      });
      console.log(param);
      if (
        this.baseInfo.businessModel == "" ||
        (this.baseInfo.businessModel == "1" &&
          this.baseInfo.leaseType == null) ||
        this.baseInfo.hasGps == null ||
        this.baseInfo.isCs == null ||
        this.baseInfo.isJjk == null ||
        this.totalAmount == 0 ||
        this.baseInfo.downPaymentAmount == 0 ||
        this.amount == 0 ||
        this.baseInfo.term == 0 ||
        this.rate == 0 ||
        this.baseInfo.repaymentMethod == null ||
        this.baseInfo.useMethod == null
      ) {
        this.$toast.fail("请将必填项填写完整");
        return;
      }
      saveBussinessInfo(param).then(res => {
        toast.clear();
        this.$router.back();
      });
    },
    calculateCost() {

      let param = Object.assign({
        term: this.baseInfo.term,
        rate: this.rate,
        repaymentMethod: this.baseInfo.repaymentMethod,
        downPaymentAmount: !this.baseInfo.downPaymentAmount ? 0 : this.baseInfo.downPaymentAmount,
        loanNumber: this.$store.state.loanNumber
      });
      console.log(param);
      CalculateCost(param).then(res => {
        console.log(res);
        this.totalAmount = res.data.data.totalAmount;
        this.amount = res.data.data.amount;
        this.gpsAmount = res.data.data.gpsAmount;
        this.rate = res.data.data.rate;
      });
    },
    getBusinessInfo() {
      BusinessInfo({ loanNumber: this.$store.state.loanNumber }).then(res => {
        console.log("BusinessInfo", res);
        this.baseInfo = res.data.data;
        // 1-等额本息，2-等额本金，3-等本等息
        if (this.baseInfo.repaymentMethod == "1") {
          this.baseInfo.repaymentMethodName = "等额本息";
        } else if (this.baseInfo.repaymentMethod == "2") {
          this.baseInfo.repaymentMethodName = "等额本金";
        } else if (this.baseInfo.repaymentMethod == "3") {
          this.baseInfo.repaymentMethodName = "等本等息";
        }
        if (this.baseInfo.downPaymentAmount == null) {
          this.baseInfo.downPaymentAmount = 0;
        }
        if (this.baseInfo.useMethod) {
          this.baseInfo.useMethodValue = this.getValue(
            this.baseInfo.useMethod,
            this.useTypeList
          );
        }

        this.baseInfo.businessModel = "1";
        // if (this.baseInfo.leaseType == "1") {
        //   this.baseInfo.leaseTypeName = "直租";
        // } else {
        this.baseInfo.leaseTypeName = "回租";
        // }
        this.getCostList();
      });
    },
    // 费用列表
    getCostList() {
      CostList({ loanNumber: this.$store.state.loanNumber }).then(res => {
        console.log(res);
        this.cosList = res.data.data;

        // 判断是否存在GPS 如果存在则不允许添加GPS费用
        for (let index in this.cosList) {
          if (
            this.cosList[index].expenseType == "6" ||
            this.cosList[index].expenseType == "7"
          ) {
            this.isHaveGPS = true;
          } else {
            this.isHaveGPS = false;
          }
        }

        this.calculateCost();
      });
    },
    // 获取码值列表
    getCode() {
      // 获取费用类型
      codeList({ codeType: "expenseType" }).then(res => {
        this.cosTypeList = res.data.data;
        codeList({ codeType: "useType" }).then(res => {
          this.useTypeList = res.data.data;
          this.getBusinessInfo();
        });
      });
    }
  },
  mounted() {
    // 获取码值
    this.getCode();
  }
};
</script>

<style scoped>
.costBox {
  width: 90%;
  margin: auto;
  box-sizing: border-box;
  overflow: scroll;
  white-space: nowrap;
}
::-webkit-scrollbar {
  width: 0px;
}
.costBox_item {
  font-size: 12px;
  min-width: 130px;
  border: 1px solid #ebedf0;
  box-shadow: 0px 5px 5px #ebedf0;
}
.costBox_item_body {
  color: #333333;
  padding: 10px;
  height: 35px;
}

.costBox_item_action {
  display: flex;
  height: 30px;
}
.showAddCost_title {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  font-weight: bold;
  box-shadow: 0px 1px 1px #ebedf0;
}
.showAddCost_body {
  font-size: 14px;
  font-weight: bold;
  padding: 0 5%;
}
.showAddCost_btn {
  display: flex;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>