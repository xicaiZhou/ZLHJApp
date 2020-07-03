<template>
  <div style="height:100%; margin-bottom: 60px;">
    <div>
      <div class="header">贷款信息</div>
      <div>
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">业务模式：</span>
          <div class="zlhjRadio_body">
            <div
              @click="businessModel = '1'"
              :class="businessModel == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >租赁</div>
            <div
              @click="businessModel = '2'"
              :class="businessModel == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >贷款</div>
          </div>
        </div>
        <div style="padding-left:10px">
          <div class="zlhjRadioLine"></div>
        </div>
      </div>
      <van-field v-show="businessModel == 1" readonly label="租赁模式:" v-model="huizu" />
      <div>
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">安装GPS：</span>
          <div class="zlhjRadio_body">
            <div
              @click="hasGps = '1'"
              :class="hasGps == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >是</div>
            <div
              @click="hasGps = '2'"
              :class="hasGps == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
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
              @click="isCs = '1'"
              :class="isCs == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >是</div>
            <div
              @click="isCs = '2'"
              :class="isCs == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
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
              @click="isJjk = '1'"
              :class="isJjk == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
            >是</div>
            <div
              @click="isJjk = '2'"
              :class="isJjk == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
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
          style="display:inline-block;margin:0 2px"
          v-for="(item, index) in cosList"
          :key="index"
        >
          <div class="costBox_item">
            <div class="costBox_item_body">
              <div>费用类型:{{item.type}}</div>
              <div>实际金额:{{item.amount}}</div>
            </div>
            <div class="costBox_item_action">
              <van-button style="height:100%;width:50%">编辑</van-button>
              <van-button style="height:100%;width:50%" type="info">删除</van-button>
            </div>
          </div>
        </div>
      </div>
      <van-field
        v-show="businessModel == 1"
        type="digit"
        label="项目总额(元):"
        v-model="totalAmount"
        placeholder="请填写项目金额"
      />
      <van-field
        v-show="businessModel == 2"
        type="digit"
        label="标的物价格(元):"
        v-model="totalAmount"
        placeholder="请填写标的物价格"
      />
      <van-field label="首付金额(元):" type="digit" v-model="downPaymentAmount" placeholder="请填写首付金额" />
      <van-field
        v-show="businessModel == 1"
        label="融资金额(元):"
        type="digit"
        v-model="downPaymentAmount"
        placeholder="请填写融资金额"
      />
      <van-field
        v-show="businessModel == 2"
        label="贷款金额(元):"
        type="digit"
        v-model="downPaymentAmount"
        placeholder="请填写贷款金额"
      />
      <van-field
        is-link
        readonly
        clickable
        v-show="businessModel == 2"
        label="贷款期限(月):"
        v-model="term"
        placeholder="请选择贷款期限"
        @click="showTerm = true"
      />
      <van-field
        is-link
        readonly
        clickable
        v-show="businessModel == 1"
        label="租赁期限(月):"
        v-model="term"
        placeholder="请选择租赁期限"
        @click="showTerm = true"
      />
      <van-field
        is-link
        readonly
        clickable
        label="还款方式:"
        v-model="repaymentMethodName"
        placeholder="请选择还款方式"
        @click="showRepaymentMethod = true"
      />
      <van-field
        is-link
        readonly
        clickable
        v-show="businessModel == 1"
        label="租赁用途:"
        v-model="useMethod"
        placeholder="请选择租赁用途"
        @click="showUseMethod = true"
      />
      <van-field
        is-link
        readonly
        clickable
        v-show="businessModel == 2"
        label="贷款用途:"
        v-model="useMethod"
        placeholder="请选择贷款用途"
        @click="showUseMethod = true"
      />
      <van-field
        v-show="businessModel == 1"
        label="租赁成数(%):"
        type="digit"
        v-model="rate"
        placeholder="请填写租赁成数"
      />
      <van-field
        v-show="businessModel == 2"
        label="贷款成数(%):"
        type="digit"
        v-model="rate"
        placeholder="请填写贷款成数"
      />
      <van-field label="GPS金额(元):" type="digit" v-model="gpsAmount" placeholder="请填写首付金额" />
      <div class="header">录单人信息</div>
      <van-field label="销售姓名:" v-model="gpsAmount" placeholder="请填写销售姓名" />
      <van-field label="销售联系方式:" v-model="gpsAmount" placeholder="请填写销售联系方式" />
    </div>
    <div class="subBtn">
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
          :columns="repaymentMethodList"
          @confirm="selectUseMethod"
          @cancel="showUseMethod=false"
        />
      </van-popup>

      <van-popup
        v-model="showAddCost"
        :style="{ height: '200px', width: '80%'}"
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
              v-model="addCostType"
              placeholder="请选择"
              @click="showCosType = true"
            />
            <van-field
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="实际金额:"
              placeholder="请填写"
              @click="addCostAmount"
            />
          </div>
          <div class="showAddCost_btn van-hairline--top">
            <van-button style="width:50%" @click="showAddCost = false">取消</van-button>

            <van-button style="width:50%" type="info" @click="addCost">保存</van-button>
          </div>
        </div>
      </van-popup>
      <van-popup
        v-model="showAddCost"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="cosTypeList"
          @confirm="selectCosType"
          @cancel="showAddCost=false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import {BusinessInfo} from '../../request/api'
export default {
  data() {
    return {
      addCostAmount: "",
      addCostType: "",
      showTerm: false,
      showAddCost: false,
      showRepaymentMethod: false,
      showUseMethod: false,
      showCosType: false,
      cosTypeList: [],
      termList: ["12", "24", "36"],
      repaymentMethodList: ["等额本息", "等额本金", "等本等息"],
      loanNumber: "", // 贷款申请编号
      managerName: "", //客户经理名称
      managerMobileNumber: "", //客户经理手机
      carPrice: "", //车辆价格
      totalAmount: "", // 融资总额
      businessModel: "1", //业务模式 1-租赁，2-贷款
      amount: "", //融资金额
      leaseType: "", //租赁模式 1-直租，2-回租
      huizu: "回租",
      carAmount: "", //车辆费用
      hasGps: "", //是否安装GPS 1-是，2-否
      isCs: "", //是否产险推荐 1-是，2-否
      isJjk: "", // 是否聚家客推荐 1-是，2-否
      downPaymentAmount: "", //首付金额
      rate: "", //融资成数
      term: "", //融资期限
      gpsAmount: "", //GPS金额
      repaymentMethod: "", //还款方式 1-等额本息，2-等额本金，3-等本等息
      repaymentMethodName: "", //还款方式 1-等额本息，2-等额本金，3-等本等息
      useMethod: "", //融资用途 数据字典-贷款用途
      cosList: [
        { type: "车辆款", amount: "20000" },
        { type: "车辆款", amount: "2000022222" },
        { type: "车辆款", amount: "20000" }
      ]
    };
  },
  methods: {
    addCost() {
      cosList.push({ type: this.addCostType, amount: this.addCostAmount });
      this.showAddCost = false;
    },
    selectCosType(val) {
      this.addCostType = val;
      this.showCosType = false;
    },
    selectTerm(val) {
      this.term = val;
      this.showTerm = false;
    },
    selectRepayment(val) {
      console.log(val);
      this.repaymentMethodName = val;
      if (val == "等额本息") {
        this.repaymentMethod = "1";
      } else if (val == "等额本息") {
        this.repaymentMethod = "2";
      } else {
        this.repaymentMethod = "3";
      }
      this.showRepaymentMethod = false;
    },
    selectUseMethod(val) {
      this.useMethod = "1";
      this.showUseMethod = false;
    },
    toSub() {
      this.$router.back();
    }
  },
  mounted(){
      var params = Object.assign({loanNumber:"20200701144824242"});
      console.log(params);
      BusinessInfo(params).then(res=>{
          console.log(res);
      })
  }
};
</script>

<style scoped>
.costBox {
  width: 90%;
  margin: auto;
  height: 105px;
  box-sizing: border-box;
  overflow: scroll;
  white-space: nowrap;
  margin-top: 10px;
}
::-webkit-scrollbar {
  width: 0px;
}
.costBox_item {
  font-size: 12px;
  min-width: 100px;
  border: 1px solid #ebedf0;
  box-shadow: 0px 5px 5px #ebedf0;
}
.costBox_item_body {
  color: #333333;
  padding: 10px;
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
  padding: 0 10%;
}
.showAddCost_btn {
  display: flex;
  width: 100%;
  margin-top: 8px;
}
</style>