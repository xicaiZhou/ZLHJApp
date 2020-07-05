<template>
  <div style="height:100%; margin-bottom: 60px;">
    <div class="content">
      <van-form @submit="onSubmit">
        <!-- 新车 -->
        <template v-if="this.loginSysUserVo.businessType == '3'">
          <div class="header">贷款信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="业务类型:"
            v-model="loginSysUserVo.businessTypeName"
            placeholder="请选择业务类型"
            @click="showBusiness = true"
          />
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
          />
          <van-field readonly label="品牌:" v-model="loginSysUserVo.modelName" placeholder="请填写品牌" />
          <van-field
            readonly
            label="车系:"
            v-model="loginSysUserVo.seriesName"
            name
            placeholder="请填写车系"
          />
          <van-field
            readonly
            label="车辆指导价(万元):"
            v-model="loginSysUserVo.guidancePrice"
            name
            placeholder="请填写车辆指导价"
          />
          <van-field readonly label="年份:" v-model="loginSysUserVo.year" name placeholder="请填写年份" />
          <van-field
            label="开票价格(元):"
            v-model="loginSysUserVo.purchasePrice"
            name
            type="digit"
            placeholder="请填写开票价格"
          />
          <van-field label="车辆颜色:" name v-model="loginSysUserVo.colour" placeholder="请填写车辆颜色" />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">是否进口车：</span>
              <div class="zlhjRadio_body">
                <div
                  @click="loginSysUserVo.importFlag = '1'"
                  :class="loginSysUserVo.importFlag == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >进口</div>
                <div
                  @click="loginSysUserVo.importFlag = '2'"
                  :class="loginSysUserVo.importFlag == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >非进口</div>
              </div>
            </div>
            <div style="padding-left:10px">
              <div class="zlhjRadioLine"></div>
            </div>
          </div>

          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">牌照类型：</span>
              <div class="zlhjRadio_body">
                <div
                  @click="loginSysUserVo.licenseType = '1'"
                  :class="loginSysUserVo.licenseType == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >私牌</div>
                <div
                  @click="loginSysUserVo.licenseType = '2'"
                  :class="loginSysUserVo.licenseType == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >公牌</div>
              </div>
            </div>
            <div style="padding-left:10px">
              <div class="zlhjRadioLine"></div>
            </div>
          </div>
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">承租人/担保人是否有驾照：</span>
              <div class="zlhjRadio_body">
                <div
                  @click="loginSysUserVo.hasDrivingLicense = '1'"
                  :class="loginSysUserVo.hasDrivingLicense == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >有</div>
                <div
                  @click="loginSysUserVo.hasDrivingLicense = '2'"
                  :class="loginSysUserVo.hasDrivingLicense == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >没有</div>
              </div>
            </div>
            <div style="padding-left:10px">
              <div class="zlhjRadioLine"></div>
            </div>
          </div>
        </template>
        <!-- 二手车 -->
        <template v-else-if="loginSysUserVo.businessType == '2'">
          <div class="header">贷款信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="业务类型:"
            v-model="loginSysUserVo.businessTypeName"
            name
            placeholder="请选择业务类型"
            @click="showBusiness = true"
          />
          <div class="header">车辆信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="品牌车型:"
            v-model="loginSysUserVo.modelName"
            placeholder="请选择品牌车型"
            @click="selectCarModel"
            :rules="[{ required: true, message: '请选择品牌车型' }]"
          />
          <van-field readonly label="品牌:" v-model="loginSysUserVo.modelName" placeholder="请填写品牌" />
          <van-field
            readonly
            label="车系:"
            v-model="loginSysUserVo.seriesName"
            name
            placeholder="请填写车系"
          />
          <van-field
            readonly
            label="车辆指导价(万元):"
            v-model="this.loginSysUserVo.guidancePrice"
            name
            placeholder="请填写车辆指导价"
          />
          <van-field readonly label="年份:" v-model="loginSysUserVo.year" name placeholder="请填写年份" />

          <van-field
            label="首次上牌时间:"
            is-link
            readonly
            clickable
            placeholder="请选择首次上牌时间"
            v-model="loginSysUserVo.firstRegistrationDate"
            @click="showDate = true"
          />
          <van-field
            v-model="loginSysUserVo.usedTime"
            readonly
            label="车龄:"
            name
            placeholder="请填写车龄"
          />
          <van-field
            label="里程数(公里):"
            type="digit"
            v-model="loginSysUserVo.mileage"
            placeholder="请填写里程数"
          />
          <van-field
            type="digit"
            v-model="loginSysUserVo.appraisalPrice"
            label="评估价格(元):"
            placeholder="请填写评估价格"
          />
          <van-field label="车架号:" v-model="loginSysUserVo.vin" placeholder="请填写车架号" />
          <van-field label="发动机号:" v-model="loginSysUserVo.engineNumber" placeholder="请填写发动机号" />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">牌照类型：</span>
              <div class="zlhjRadio_body">
                <div
                  @click="loginSysUserVo.licenseType = '1'"
                  :class="loginSysUserVo.licenseType == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >私牌</div>
                <div
                  @click="loginSysUserVo.licenseType = '2'"
                  :class="loginSysUserVo.licenseType == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >公牌</div>
              </div>
            </div>
            <div style="padding-left:10px">
              <div class="zlhjRadioLine"></div>
            </div>
          </div>
          <van-field label="牌照号:" v-model="loginSysUserVo.license" placeholder="请填写牌照号" />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">承租人/担保人是否有驾照：</span>
              <div class="zlhjRadio_body">
                <div
                  @click="loginSysUserVo.hasDrivingLicense = '1'"
                  :class="loginSysUserVo.hasDrivingLicense == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >有</div>
                <div
                  @click="loginSysUserVo.hasDrivingLicense = '2'"
                  :class="loginSysUserVo.hasDrivingLicense == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >没有</div>
              </div>
            </div>
            <div style="padding-left:10px">
              <div class="zlhjRadioLine"></div>
            </div>
          </div>
          <van-field
            v-model="loginSysUserVo.exOwnerName"
            label="原有车辆所有人姓名:"
            placeholder="原有车辆所有人姓名"
          />
          <van-field
            label="原有车辆所有人手机号:"
            placeholder="请填写原有车辆所有人手机号"
            v-model="loginSysUserVo.exOwnerMobileNumber"
          />
          <van-field
            is-link
            readonly
            clickable
            label="原有车辆所有人证件类型:"
            v-model="loginSysUserVo.exOwnerIdTypeName"
            placeholder="请选择原有车辆所有人证件类型"
            @click="selectCarModel"
          />
          <van-field
            v-model="loginSysUserVo.exOwnerIdNumber"
            label="原有车辆所有人证件号码:"
            placeholder="请填写原有车辆所有人证件号码"
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
            @click="showBusiness = true"
          />
          <div class="header">车辆信息</div>
          <van-field
            is-link
            readonly
            clickable
            label="品牌车型:"
            v-model="loginSysUserVo.modelName"
            placeholder="请选择品牌车型"
            @click="selectCarModel"
            :rules="[{ required: true, message: '请选择品牌车型' }]"
          />
          <van-field readonly label="品牌:" v-model="loginSysUserVo.modelName" placeholder="请填写品牌" />
          <van-field
            readonly
            label="车系:"
            v-model="loginSysUserVo.seriesName"
            name
            placeholder="请填写车系"
          />
          <van-field
            readonly
            label="车辆指导价(万元):"
            v-model="this.loginSysUserVo.guidancePrice"
            name
            placeholder="请填写车辆指导价"
          />
          <van-field readonly label="年份:" v-model="loginSysUserVo.year" name placeholder="请填写年份" />

          <van-field
            label="首次上牌时间:"
            is-link
            readonly
            clickable
            placeholder="请选择首次上牌时间"
            v-model="loginSysUserVo.firstRegistrationDate"
            @click="showDate = true"
          />
          <van-field
            v-model="loginSysUserVo.usedTime"
            readonly
            label="车龄:"
            name
            placeholder="请填写车龄"
          />
          <van-field
            label="里程数(公里):"
            type="digit"
            v-model="loginSysUserVo.mileage"
            placeholder="请填写里程数"
          />
          <van-field
            type="digit"
            v-model="loginSysUserVo.appraisalPrice"
            label="评估价格(元):"
            placeholder="请填写评估价格"
          />
          <van-field label="车架号:" v-model="loginSysUserVo.vin" placeholder="请填写车架号" />
          <van-field label="发动机号:" v-model="loginSysUserVo.engineNumber" placeholder="请填写发动机号" />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">牌照类型：</span>
              <div class="zlhjRadio_body">
                <div
                  @click="loginSysUserVo.licenseType = '1'"
                  :class="loginSysUserVo.licenseType == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >私牌</div>
                <div
                  @click="loginSysUserVo.licenseType = '2'"
                  :class="loginSysUserVo.licenseType == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >公牌</div>
              </div>
            </div>
            <div style="padding-left:10px">
              <div class="zlhjRadioLine"></div>
            </div>
          </div>
          <van-field label="牌照号:" v-model="loginSysUserVo.license" placeholder="请填写牌照号" />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">承租人/担保人是否有驾照：</span>
              <div class="zlhjRadio_body">
                <div
                  @click="loginSysUserVo.hasDrivingLicense = '1'"
                  :class="loginSysUserVo.hasDrivingLicense == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >有</div>
                <div
                  @click="loginSysUserVo.hasDrivingLicense = '2'"
                  :class="loginSysUserVo.hasDrivingLicense == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >没有</div>
              </div>
            </div>
            <div style="padding-left:10px">
              <div class="zlhjRadioLine"></div>
            </div>
          </div>
        </template>
      </van-form>
    </div>
    <div class="subBtn">
      <van-button
        class="subBtn_body"
        block
        type="info"
        @click="toSub"
      >保 存</van-button>
    </div>
    <van-popup
      v-model="showBusiness"
      position="bottom"
      :style="{ height: '300px', width: '100%'}"
      get-container="body"
    >
      <van-picker
        title="选择业务类型"
        show-toolbar
        :columns="businessList"
        @confirm="selectBusiness"
        @cancel="showBusiness=false"
      />
    </van-popup>

    <van-popup
      v-model="showDate"
      position="bottom"
      :style="{ height: '300px', width: '100%'}"
      get-container="body"
    >
      <van-datetime-picker
        type="date"
        :max-date="maxDate"
        @confirm="selectDate"
        @cancel="showDate = false"
      />
    </van-popup>


  </div>
</template>

<script>
import {CarInfo} from "../../request/api"
import { dateFormat, dataYear } from "../../utils/formatter";
export default {
  data() {
    return {
      type: 1, //1-新车 2-二手车 3-车抵贷
      showDate: false,
      showIdType: false,
      maxDate: new Date(),
      radio: 1,
      showBusiness: false,
      businessList: ["车抵贷", "二手车", "新车"],
      loginSysUserVo: {
        loanNumber: "", //申请编号
        businessType: "2", //业务类型 1-车抵贷，2-二手车,3-新车
        businessTypeName: "", //自己加的 界面初始化和手动修改业务类型时需要手动修改
        dealerId: "", //经销商ID
        dealerName: "", //经销商名称
        seriesId:'', //车系ID
        seriesName:'', // 车系名字
        modelId: "", //车型ID
        modelName: "", //品牌车型
        year: "", // 年份
        otherModel: "", //自定义车型
        vin: "", //车架号
        engineNumber: "", //发动机号
        license: "", //车牌号
        mileage: "", //里程数
        colour: "", //颜色
        purchasePrice: "", //购买价格（开票价格）
        guidancePrice: "", //指导价格
        appraisalPrice: "", //评估价格
        firstRegistrationDate: "", //首次上牌日期
        usedTime: "", //使用年限
        exOwnerName: "", //原车辆所有人姓名
        exOwnerIdType: "", //原车辆所有人证件类型
        exOwnerIdTypeName: "", // 自己加的   原车辆所有人证件类型名
        exOwnerIdNumber: "", //原车辆所有人证件号
        exOwnerMobileNumber: "", //原车辆所有人手机
        licenseType: "", //车牌类型 1:私牌 2:公牌
        importFlag: "", //进口标志 1:进口 2:非进口
        hasDrivingLicense: "", //是否有驾照 1:有 2:没有
      }
    };
  },
  watch: {
    "$store.state.exhibition": {
      deep: true,
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.loginSysUserVo.dealerId = newValue.id;
        this.loginSysUserVo.dealerName = newValue.name;
      }
    },
    "$store.state.carInfo": {
      deep: true,
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.loginSysUserVo.modelId = newValue.id;
        this.loginSysUserVo.modelName = newValue.name;
        this.loginSysUserVo.guidancePrice = newValue.guidancePrice;
        this.loginSysUserVo.seriesId = newValue.seriesId;
        this.loginSysUserVo.seriesName = newValue.seriesName;
        this.loginSysUserVo.year = newValue.year;
      }
    }
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
    // 选择上牌时间
    selectDate(value) {
      this.loginSysUserVo.firstRegistrationDate = dateFormat(
        value,
        "yyyy-MM-dd"
      );
      this.loginSysUserVo.usedTime = dataYear(value);
      this.showDate = false;
    },
    // 选择业务大类
    selectBusiness(val) {
      this.showBusiness = false;
      this.loginSysUserVo.businessTypeName = val;
      if (val === "新车") {
        this.loginSysUserVo.businessType = "3";
      } else if (val === "二手车") {
        this.loginSysUserVo.businessType = "2";
      } else {
        this.loginSysUserVo.businessType = "1";
      }
    },
    selectExhibition() {
      this.$router.push({
        path: "/exhibitionList"
      });
    },
    /// 选择车型
    selectCarModel() {
      this.$router.push({
        path: "/carModels"
      });
    },
    toSub() {
      this.$router.back();
    }
  },
  mounted() {},
  //修改form的keepAlive值为false时，再次进入页面会重新请求数据，即刷新页面
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  }
};
</script>

<style>
.content {
  background: none;
  height: 80%;
  overflow-y: scroll;
}


</style>