<template>
  <div>
    <div>
      <div class="header">资方信息</div>
      <van-field
        class="readOnly"
        required
        readonly
        label="选择资方:"
        placeholder="请选择资方"
        v-model="baseInfo.fcName"
      />
    </div>
    <div>
      <div class="header">征信信息</div>
      <div class="zlhjRadio" style="display:flex">
        <span class="zlhjRadio_title">征信信息：</span>
        <div class="zlhjRadio_body">
          <div
            @click="loanInfo.creditType = '1'"
            :class="loanInfo.creditType == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
          >线下授权</div>
          <div
            @click="loanInfo.creditType = '2'"
            :class="loanInfo.creditType == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
          >线上授权</div>
        </div>
      </div>
      <div>
        <van-field
          class="readOnly"
          required
          readonly
          label="姓名:"
          v-model="mainCustomerInfo.customerName"
        />
        <van-field
          class="readOnly"
          required
          readonly
          label="角色:"
          v-model="mainCustomerInfo.customerRoleName"
        />
        <van-field
          class="readOnly"
          required
          readonly
          label="类型:"
          v-model="mainCustomerInfo.customerTypeName"
        />
        <van-field
          class="readOnly"
          required
          readonly
          label="证件类型:"
          v-model="mainCustomerInfo.idTypeName"
        />
        <van-field
          class="readOnly"
          required
          readonly
          label="证件号:"
          v-model="mainCustomerInfo.idNum"
        />
        <van-field
          class="readOnly"
          required
          readonly
          label="主要联系方式:"
          v-model="mainCustomerInfo.phone"
        />
      </div>

      <!--  线下授权 -->
      <div v-if="loanInfo.creditType == '1'">
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">征信授权书：</span>
          <div class="zlhjRadio_body" style="height:30px;">
            <van-button
              v-show="loanInfo.flag == 0"
              style="color:'#fff';background:#ff9900;height:30px;"
              @click="upload(1)"
            >上传</van-button>
            <van-button
              v-show="mainCustomerInfo.authorizationUrl"
              style="color:'#fff';background:#ff9900;height:30px;"
              @click="seeFile(1)"
            >查看</van-button>
          </div>
        </div>
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">合照：</span>
          <div class="zlhjRadio_body" style="height:30px;">
            <van-button
              v-show="loanInfo.flag == 0"
              style="color:'#fff';background:#ff9900;height:30px;"
              @click="upload(2)"
            >上传</van-button>
            <van-button
              v-show="mainCustomerInfo.pictureUrl"
              style="color:'#fff';background:#ff9900;height:30px;"
              @click="seeFile(2)"
            >查看</van-button>
          </div>
        </div>
        <div>
          <div v-show="!loanInfo.preCode" style="width:90%; margin:0 auto;display:flex;height:40px">
            <van-button
              style="flex:1; color:'#fff';background:#ff9900;height:40px;"
              @click="toApply"
            >预审批申请</van-button>
            <van-button
              v-show="!loanInfo.status"
              style="flex:1; color:'#fff';background:#ff9900;height:40px;"
              @click="toSearchResult"
            >结果查询</van-button>
          </div>
        </div>
      </div>

      <!--  线上授权 -->
      <div v-else>
        <van-field
          required
          is-link
          readonly
          clickable
          label="客户评级:"
          placeholder="请选择产品"
          v-model="loanInfo.productName"
        />
        <div style=" ">
          <van-button
            style="width:90%; margin-left:5%;color:'#fff';background:#ff9900;height:40px;"
          >确认授权</van-button>
        </div>
      </div>
      <div v-show="loanInfo.flag != 0">
        <van-field class="readOnly" required readonly label="预审批结果:" v-model="loanInfo.msg" />
      </div>
    </div>

    <div v-show="loanInfo.flag > 0">
      <!-- 新车 -->
      <div v-if="car == 1">
        <div style="display:flex; justify-content: space-between;">
          <div class="header">车辆信息（新车）</div>
          <div
            style="color:#ffffff; height:30px;background-color:#ff9900;padding:0 10px;margin-right:10px; margin-top:10px;line-height:30px"
          >选择车型</div>
        </div>
        <van-field required is-link readonly clickable label="品牌车型:" placeholder="请选择品牌车型" />
        <van-field readonly required label="厂商车系:" placeholder="请填写车系" />
        <van-field readonly required label="车型:" placeholder="请填写车型" />
        <van-field required readonly label="车辆指导价(元):" />
        <van-field required readonly label="年份:" />
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">是否进口车：</span>
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
      </div>
      <!-- 二手车 -->
      <div v-else>
        <div style="display:flex; justify-content: space-between;">
          <div class="header">车辆信息（二手车）</div>
          <div
            style="color:#ffffff; height:30px;background-color:#ff9900;padding:0 10px;margin-right:10px; margin-top:10px;line-height:30px"
          >查询车型</div>
        </div>
      </div>
      <van-field required readonly label="车架号):" />
      <van-field required readonly label="品牌:" />
      <van-field required readonly label="车系:" />
      <van-field required readonly label="车型:" />
      <van-field required readonly label="年份:" />
      <van-field required readonly label="车辆指导价(元):" />
      <div class="zlhjRadio" style="display:flex">
        <span class="zlhjRadio_title">是否进口车：</span>
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
    </div>

    <div v-show="loanInfo.flag > 1">
      <div style="display:flex; justify-content: space-between;">
        <div class="header">产品信息</div>
        <div
          style="color:#ffffff; height:30px;background-color:#ff9900;padding:0 10px;margin-right:10px; margin-top:10px;line-height:30px"
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
      />
    </div>

    <div>
      <div class="header">支付信息</div>
      <van-field class="readOnly" required clickable label="支付方式:"></van-field>
      <van-field required is-link readonly clickable label="付款账户:" placeholder="请选择付款账户" />
      <van-field class="readOnly" required clickable label="户名:" />
      <van-field class="readOnly" required clickable label="开户银行:" />
      <van-field class="readOnly" required clickable label="支行名称:" />
    </div>
    <div v-show="loanInfo.flag > 1">
      <div class="header">补充信息</div>
      <van-field class="readOnly" required clickable label="承租人银行卡卡号:"></van-field>
    </div>
  </div>
</template>

<script>
import { getValue } from "../../utils/utils.js";
import {
  BusinessInfo,
  loanHeadPazl,
  getMainCustomerInfo,
  creditApply,
} from "../../request/api.js";
export default {
  data() {
    return {
      car: 2,
      mainCustomerInfo: {
        customerId: 0, //客户id
        authorizationUrl: "", //征信授权书地址
        customerName: "", //	客户姓名/企业名称
        customerRole: "", //	角色(1-主借款人 2-配偶 3-担保人 4-共借人 6-共借人与配偶)
        customerRoleName: "", // 自己加的
        pictureUrl: "", //	合照地址
        authorizationCode: "", //	征信授权书唯一码
        customerType: "", //	客户类型(1=自然人，2=法人)
        customerTypeName: "", // 自己加的
        idType: "", //	证件类型
        idTypeName: "",
        pictureCode: "", //	合照唯一码
        idNum: "", //	证件号码
        phone: "", //	联系电话
        customerLevel: "", //	评定等级 A,B,C,D
        preCode: "", //	预审编号
      },
      loanInfo: {
        loanNumber: "",
        creditType: "", //授权方式 1-线下，2-线上
        state: "", //状态 1-有效，2-无效
        preCode: "", //预审编号
        customerLevel: "", //评定等级 A,B,C,D
        status: "", //预审状态
        reason: "", //退回理由
        msg: "", //自己加的
        flag: "", //节点 0-待授权,1-待确认车型，2-待确认产品，3-待补充信息，4-完成
      },
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
        useMethodValue: "", // 自己加的
      },
    };
  },

  // 在进入页面时先判断是否是从详情页面返回
  beforeRouterEnter(to, from, next) {
    if (to.path === "/detail") {
      this.$route.meta.isBack = true;
    }
    next();
  },
  activated() {
    // 如果不是从详情页面返回，则重新加载数据
    if (!this.$route.meta.isBack) {
      //加载页面数据
      BusinessInfo({ loanNumber: this.$store.state.loanNumber }).then((res) => {
        console.log("BusinessInfo:", res.data.data);
        this.baseInfo = res.data.data;
      });
      loadpazl();
    }
    // 从新设置页面得路由元信息
    this.$route.meta.isBack = false;
  },
  mounted() {},
  methods: {
    upload(val) {},
    seeFile(val) {},
    //预审批申请
    toApply() {
      creditApply({
        loanNumber: this.$store.state.loanNumber,
        customerId: this.mainCustomerInfo.customerId,
      }).then((res) => {
        if (res.data.success) {
        } else {
          this.$toast.fail("预审批申请失败！");
        }
      });
    },
    //结果查询
    toSearchResult() {},
    loadpazl() {
      loanHeadPazl({ loanNumber: this.$store.state.loanNumber }).then((res) => {
        console.log("HeadPazlInfo:", res.data.data);
        this.loanInfo = res.data.data;
        if (this.loanInfo.creditType) {
          //获取主借人信息
          getMainCustomerInfo({
            loanNumber: this.$store.state.loanNumber,
          }).then((res) => {
            console.log("mainCustomerInfo:", res.data.data);
            if (res.data.data.length > 0) {
              this.mainCustomerInfo = res.data.data[0];
              this.mainCustomerInfo.customerRoleName = getValue(
                15,
                this.mainCustomerInfo.customerRole
              );
              this.mainCustomerInfo.customerTypeName = getValue(
                6,
                this.mainCustomerInfo.customerType
              );
              this.mainCustomerInfo.idTypeName = getValue(
                2,
                this.mainCustomerInfo.idType
              );
            }
          });
        }
        var title = "";
        title += getValue("16", this.loanInfo.status);
        if (this.loanInfo.reason) {
          title += " " + this.loanInfo.reason;
        }
        if (this.loanInfo.customerLevel) {
          title += " 客户评级：" + this.loanInfo.customerLevel;
        }
        this.loanInfo.msg = title;
      });
    },
  },
};
</script>

<style>
</style>