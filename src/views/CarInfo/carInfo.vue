<template>
  <div style="height:100%; margin-bottom: 60px;">
    <div class="content">
      <van-form @submit="onSubmit">
        <!-- 新车 -->
        <template v-if="type == 1">
          <div class="header">渠道信息</div>
          <van-field
          @click="selectExhibition"
            is-link
            readonly
            clickable
            v-model="loginSysUserVo.dealerName"
            label="展厅:"
            name
            placeholder="请选择展厅"
            :rules="[{ required: true, message: '请选择展厅' }]"
          />
          <div class="header">贷款信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="业务类型:"
            v-model="loginSysUserVo.businessTypeName"
            name
            placeholder="请选择业务类型"
            @click="showDate = true"
            :rules="[{ required: true, message: '请选择业务类型' }]"
          />
          <div class="header">车辆信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="品牌车型:"
            v-model="loginSysUserVo.modelName"
            name
            placeholder="请选择品牌车型"
            @click="selectCarModel"
            :rules="[{ required: true, message: '请选择品牌车型' }]"
          />

          <van-field readonly label="品牌:" name placeholder="请填写品牌" />
          <van-field readonly label="车系:" name placeholder="请填写车系" />
          <van-field readonly label="车辆指导价(元):" name placeholder="请填写品牌" />
          <van-field readonly label="年份:" name placeholder="请填写年份" />
          <van-field
            label="开票价格(元):"
            name
            placeholder="请填写开票价格"
            :rules="[{ required: true, message: '请填写开票价格' }]"
          />
          <van-field
            label="车辆颜色:"
            name
            placeholder="请填写车辆颜色"
            :rules="[{ required: true, message: '请填写车辆颜色' }]"
          />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">是否进口车：</span>
              <van-radio-group v-model="radio" icon-size="18" direction="horizontal">
                <van-radio name="1">单选框 1</van-radio>
                <van-radio name="2">单选框 2</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>

          <van-field
            is-link
            readonly
            clickable
            label="拍照类型:"
            name
            placeholder="请选择牌照类型"
            @click="showDate = true"
            :rules="[{ required: true, message: '请选择牌照类型' }]"
          />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">承租人/担保人是否有驾照：</span>
              <van-radio-group v-model="radio" icon-size="18" direction="horizontal">
                <van-radio name="1">单选框 1</van-radio>
                <van-radio name="2">单选框 2</van-radio>
              </van-radio-group>
            </div>
          </div>
        </template>
        <!-- 二手车 -->
        <template v-else-if="type == 2">
          <div class="header">贷款信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="业务类型:"
            v-model="loginSysUserVo.businessTypeName"
            name
            placeholder="请选择业务类型"
            @click="showDate = true"
            :rules="[{ required: true, message: '请选择业务类型' }]"
          />
          <div class="header">车辆信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="品牌车型:"
            v-model="loginSysUserVo.modelName"
            name
            placeholder="请选择品牌车型"
            @click="selectCarModel"
            :rules="[{ required: true, message: '请选择品牌车型' }]"
          />

          <van-field readonly label="品牌:" name placeholder="请填写品牌" />
          <van-field readonly label="车系:" name placeholder="请填写车系" />
          <van-field readonly label="车辆指导价(元):" name placeholder="请填写品牌" />
          <van-field readonly label="年份:" name placeholder="请填写年份" />

          <van-field
            label="首次上牌时间:"
            name
            placeholder="请选择首次上牌时间"
            :rules="[{ required: true, message: '请选择首次上牌时间' }]"
          />
          <van-field readonly label="车龄:" name placeholder="请填写车龄" />
          <van-field
            label="里程数(公里):"
            name
            placeholder="请填写里程数"
            :rules="[{ required: true, message: '请填写里程数' }]"
          />
          <van-field
            label="评估价格(元):"
            name
            placeholder="请填写评估价格"
            :rules="[{ required: true, message: '请填写评估价格' }]"
          />
          <van-field
            label="车架号:"
            name
            placeholder="请填写车架号"
            :rules="[{ required: true, message: '请填写车架号' }]"
          />
          <van-field
            is-link
            clickable
            label="发动机号:"
            name
            placeholder="请填写发动机号"
            @click="showDate = true"
            :rules="[{ required: true, message: '请填写发动机号' }]"
          />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">拍照类型：</span>
              <van-radio-group v-model="radio" icon-size="18" direction="horizontal">
                <van-radio name="1">私牌</van-radio>
                <van-radio name="2">工牌</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
          <van-field
            clickable
            label="拍照号:"
            name
            placeholder="请填写拍照号"
            @click="showDate = true"
            :rules="[{ required: true, message: '请填写拍照号'}]"
          />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">承租人/担保人是否有驾照：</span>
              <van-radio-group v-model="radio" icon-size="18" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
          <van-field
            clickable
            label="原有车辆所有人姓名:"
            name
            placeholder="原有车辆所有人姓名"
            @click="showDate = true"
            :rules="[{ required: true, message: '原有车辆所有人姓名'}]"
          />
          <van-field
            clickable
            label="原有车辆所有人手机号:"
            name
            placeholder="请填写原有车辆所有人手机号"
            @click="showDate = true"
            :rules="[{ required: true, message: '请填写原有车辆所有人手机号'}]"
          />
          <van-field
            is-link
            readonly
            clickable
            label="原有车辆所有人证件类型:"
            v-model="loginSysUserVo.modelName"
            name
            placeholder="请选择原有车辆所有人证件类型"
            @click="selectCarModel"
            :rules="[{ required: true, message: '请选择原有车辆所有人证件类型' }]"
          />
          <van-field
            clickable
            label="原有车辆所有人证件号码:"
            name
            placeholder="请填写原有车辆所有人证件号码"
            @click="showDate = true"
            :rules="[{ required: true, message: '请填写原有车辆所有人证件号码'}]"
          />
        </template>
        <!-- 车抵贷 -->
        <template v-else>
          <div class="header">贷款信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="业务类型:"
            v-model="loginSysUserVo.businessTypeName"
            name
            placeholder="请选择业务类型"
            @click="showDate = true"
            :rules="[{ required: true, message: '请选择业务类型' }]"
          />
          <div class="header">车辆信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="品牌车型:"
            v-model="loginSysUserVo.modelName"
            name
            placeholder="请选择品牌车型"
            @click="selectCarModel"
            :rules="[{ required: true, message: '请选择品牌车型' }]"
          />

          <van-field readonly label="品牌:" name placeholder="请填写品牌" />
          <van-field readonly label="车系:" name placeholder="请填写车系" />
          <van-field readonly label="车辆指导价(元):" name placeholder="请填写品牌" />
          <van-field readonly label="年份:" name placeholder="请填写年份" />

          <van-field
            label="首次上牌时间:"
            name
            placeholder="请选择首次上牌时间"
            :rules="[{ required: true, message: '请选择首次上牌时间' }]"
          />
          <van-field readonly label="车龄:" name placeholder="请填写车龄" />
          <van-field
            label="里程数(公里):"
            name
            placeholder="请填写里程数"
            :rules="[{ required: true, message: '请填写里程数' }]"
          />
          <van-field
            label="评估价格(元):"
            name
            placeholder="请填写评估价格"
            :rules="[{ required: true, message: '请填写评估价格' }]"
          />
          <van-field
            label="车架号:"
            name
            placeholder="请填写车架号"
            :rules="[{ required: true, message: '请填写车架号' }]"
          />
          <van-field
            is-link
            clickable
            label="发动机号:"
            name
            placeholder="请填写发动机号"
            @click="showDate = true"
            :rules="[{ required: true, message: '请填写发动机号' }]"
          />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">拍照类型：</span>
              <van-radio-group v-model="radio" icon-size="18" direction="horizontal">
                <van-radio name="1">私牌</van-radio>
                <van-radio name="2">工牌</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
          <van-field
            clickable
            label="拍照号:"
            name
            placeholder="请填写拍照号"
            @click="showDate = true"
            :rules="[{ required: true, message: '请填写拍照号'}]"
          />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">承租人/担保人是否有驾照：</span>
              <van-radio-group v-model="radio" icon-size="18" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </template>
      </van-form>
    </div>
    <div class="Bottom-Btn">
      <div class="bottomBtn">
        <van-button style="width:45%" round block type="info" >不需要</van-button>
        <van-button style="width:45%" round block type="info" >继续</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1, //1-新车 2-二手车 3-车抵贷
      showDate: "false",
      radio: 1,
      loginSysUserVo: {
        loanNumber: "", //申请编号
        businessType: "", //业务类型 1-车抵贷，2-二手车,3-新车
        businessTypeName: "", //自己加的 界面初始化和手动修改业务类型时需要手动修改
        dealerId: "", //经销商ID
        dealerName: "", //经销商名称
        modelId: "", //车型ID
        modelName: "", //品牌车型
        otherModel: "", //自定义车型
        vin: "", //车架号
        engineNumber: "", //发动机号
        license: "", //车牌号
        mileage: "", //里程数
        colour: "", //颜色
        purchasePrice: "", //购买价格
        guidancePrice: "", //指导价格
        appraisalPrice: "", //评估价格
        firstRegistrationDate: "", //首次上牌日期
        usedTime: "", //使用年限
        exOwnerName: "", //原车辆所有人姓名
        exOwnerIdType: "", //原车辆所有人证件类型
        exOwnerIdNumber: "", //原车辆所有人证件号
        exOwnerMobileNumber: "", //原车辆所有人手机
        licenseType: "", //车牌类型 1:私牌 2:公牌
        importFlag: "", //进口标志 1:进口 2:非进口
        hasDrivingLicense: "", //是否有驾照 1:有 2:没有
        businessModel: "", //业务模式 1-银行贷款，2-租金贷
        leaseType: "", //租赁模式 1-直租，2-回租
        hasGps: "", //是否安装GPS 1-是，2-否
        isCs: "", //是否产险推荐 1-是，2-否
        isJjk: "", // 是否聚家客推荐 1-是，2-否
        totalAmount: "", //融资总额
        downPaymentAmount: "", //首付金额
        amount: "", //融资金额
        term: "", //融资期限
        repaymentMethod: "", //还款方式 1-等额本息，2-等额本金，3-等本等息
        useMethod: "", //融资用途 数据字典-贷款用途
        rate: "" //融资成数
      }
    };
  },
  methods: {
    onSubmit(values) {
      const toast = this.$toast.loading({
        duration: 0,
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner"
      });
    },
    selectExhibition(){
        this.$router.push({
            path:'/exhibitionList'
        })
    },
    /// 选择车型
    selectCarModel() {
        this.$router.push({
            path:'/carModels'
        })
    }
  },
  mounted() {},
  //修改form的keepAlive值为false时，再次进入页面会重新请求数据，即刷新页面
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  }
};
</script>

<style>
.zlhjRadio {
  display: flex;
  font-size: 14px;
  line-height: 24px;
  color: #323233;
  padding: 10px 16px;
}
.zlhjRadio_title {
  width: 90px;
}
.zlhjRadioLine {
  padding-left: 10px;
  background-color: #f7f7f7;
  height: 1px;
}
.content {
  background: none;
  height: 80%;
  overflow-y: scroll;
}
.bottomBtn {
  margin: 0 20px;
  display: flex;
  height: 60px;

  justify-content: space-between;
}
.Bottom-Btn {
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  background-size: 100% 100%;
  text-align: center;
  color: #ffffff;
  /* display: none; */
}
.header {
  padding: 0 16px;
  font-size: 17px;
  font-weight: bold;
  color: #000;
  height: 40px;
  width: 100%;
  line-height: 50px;
}
</style>