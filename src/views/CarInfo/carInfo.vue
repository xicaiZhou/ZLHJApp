<template>
  <!-- 车辆信息界面 -->
  <div>
    <div class="content" style="height:100%; margin-bottom: 60px;">
      <van-form ref="form" @submit="onSubmit">
        <div class="header">渠道信息</div>
        <van-field
          required
          @click="selectExhibition"
          is-link
          readonly
          clickable
          v-model="loginSysUserVo.dealerName"
          label="展厅:"
          name
          placeholder="请选择展厅"
        />

        <!-- 新车 -->
        <template v-if="this.loginSysUserVo.businessType == '1'">
          <div class="header">贷款信息</div>
          <van-field
            required
            is-link
            readonly
            clickable
            label="业务类型:"
            v-model="loginSysUserVo.businessTypeName"
            placeholder="请选择业务类型"
            @click="showBusiness = true"
          />

          <div class="header">车辆信息</div>
          <van-field
            required
            is-link
            readonly
            clickable
            label="品牌车型:"
            v-model="loginSysUserVo.modelName"
            name
            placeholder="请选择品牌车型"
            @click="selectCarModel"
          />
          <van-field
            readonly
            required
            label="车系:"
            v-model="loginSysUserVo.seriesName"
            name
            placeholder="请填写车系"
          />
          <van-field
            required
            readonly
            label="车辆指导价(万元):"
            v-model="loginSysUserVo.guidancePrice"
            name
            placeholder="请填写车辆指导价"
          />
          <van-field
            required
            readonly
            label="年份:"
            v-model="loginSysUserVo.year"
            name
            placeholder="请填写年份"
          />
          <van-field
            required
            label="开票价格(元):"
            v-model="loginSysUserVo.purchasePrice"
            name
            type="number"
            placeholder="请填写开票价格"
          />
          <van-field
            required
            label="车辆颜色:"
            name
            v-model="loginSysUserVo.colour"
            placeholder="请填写车辆颜色"
          />
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
            required
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
            required
            is-link
            readonly
            clickable
            label="品牌车型:"
            v-model="loginSysUserVo.modelName"
            placeholder="请选择品牌车型"
            @click="selectCarModel"
          />
          <van-field
            readonly
            required
            label="车系:"
            v-model="loginSysUserVo.seriesName"
            name
            placeholder="请填写车系"
          />
          <van-field
            readonly
            required
            label="车辆指导价(万元):"
            v-model="this.loginSysUserVo.guidancePrice"
            name
            placeholder="请填写车辆指导价"
          />
          <van-field
            required
            readonly
            label="年份:"
            v-model="loginSysUserVo.year"
            name
            placeholder="请填写年份"
          />

          <van-field
            label="首次上牌时间:"
            required
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
            required
            label="车龄:"
            name
            placeholder="请填写车龄"
          />
          <van-field
            required
            label="里程数(公里):"
            type="number"
            v-model="loginSysUserVo.mileage"
            placeholder="请填写里程数"
          />
          <van-field
            required
            type="number"
            v-model="loginSysUserVo.appraisalPrice"
            label="评估价格(元):"
            placeholder="请填写评估价格"
          />
          <van-field required label="车架号:" v-model="loginSysUserVo.vin" placeholder="请填写车架号" />
          <van-field
            required
            label="发动机号:"
            v-model="loginSysUserVo.engineNumber"
            placeholder="请填写发动机号"
          />
          <van-field
            required
            label="车辆颜色:"
            v-model="loginSysUserVo.colour"
            placeholder="请填写车辆颜色"
          />
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
          <van-field required label="牌照号:" v-model="loginSysUserVo.license" placeholder="请填写牌照号" />
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
            required
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
            required
            readonly
            clickable
            label="原有车辆所有人证件类型:"
            v-model="loginSysUserVo.exOwnerIdTypeName"
            placeholder="请选择原有车辆所有人证件类型"
            @click="showIdType = true"
          />
          <van-field
            required
            v-model="loginSysUserVo.exOwnerIdNumber"
            label="原有车辆所有人证件号码:"
            placeholder="请填写原有车辆所有人证件号码"
          />
        </template>
        <!-- 车抵贷 -->
        <template v-else>
          <div class="header">贷款信息</div>
          <van-field
            required
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
            required
            readonly
            clickable
            label="品牌车型:"
            v-model="loginSysUserVo.modelName"
            placeholder="请选择品牌车型"
            @click="selectCarModel"
          />
          <van-field
            readonly
            required
            label="车系:"
            v-model="loginSysUserVo.seriesName"
            placeholder="请填写车系"
          />
          <van-field
            readonly
            required
            label="车辆指导价(万元):"
            v-model="this.loginSysUserVo.guidancePrice"
            placeholder="请填写车辆指导价"
          />
          <van-field
            required
            readonly
            label="年份:"
            v-model="loginSysUserVo.year"
            name
            placeholder="请填写年份"
          />

          <van-field
            required
            label="首次上牌时间:"
            is-link
            readonly
            clickable
            placeholder="请选择首次上牌时间"
            v-model="loginSysUserVo.firstRegistrationDate"
            @click="showDate = true"
          />
          <van-field
            required
            v-model="loginSysUserVo.usedTime"
            readonly
            label="车龄:"
            name
            placeholder="请填写车龄"
          />
          <van-field
            required
            label="里程数(公里):"
            type="digit"
            v-model="loginSysUserVo.mileage"
            placeholder="请填写里程数"
          />
          <van-field
            required
            type="digit"
            v-model="loginSysUserVo.appraisalPrice"
            label="评估价格(元):"
            placeholder="请填写评估价格"
          />
          <van-field required label="车架号:" v-model="loginSysUserVo.vin" placeholder="请填写车架号" />
          <van-field
            required
            label="发动机号:"
            v-model="loginSysUserVo.engineNumber"
            placeholder="请填写发动机号"
          />
          <van-field
            required
            label="车辆颜色:"
            name
            v-model="loginSysUserVo.colour"
            placeholder="请填写车辆颜色"
          />
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
          <van-field required label="牌照号:" v-model="loginSysUserVo.license" placeholder="请填写牌照号" />
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
      <van-button class="subBtn_body" block type="info" @click="toSub">保 存</van-button>
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

    <van-popup
      v-model="showIdType"
      position="bottom"
      :style="{ height: '300px', width: '100%'}"
      get-container="body"
    >
      <van-picker
        title="选择证件类型"
        show-toolbar
        :columns="idTypeList"
        @confirm="selectIdType"
        @cancel="showIdType=false"
      />
    </van-popup>
  </div>
</template>

<script>
import { CarInfo, SaveCarInfo } from "../../request/api";
import { dateFormat, dataYear,selectDateFormat } from "../../utils/formatter";
import { idNumValidator, vin, isPhoneNum } from "../../utils/common";
import { getValue } from "../../utils/utils";
export default {
  data() {
    return {
      showDate: false,
      showIdType: false,
      maxDate: new Date(),
      radio: 1,
      showBusiness: false,
      businessList: ["新车", "二手车"],
      idTypeList: ["身份证", "社会统一信用代码"],
      loginSysUserVo: {
        loanNumber: "", //申请编号
        businessType: "", //业务类型 3-车抵贷，2-二手车,1-新车
        businessTypeName: "", //自己加的 界面初始化和手动修改业务类型时需要手动修改
        dealerId: "", //经销商ID
        dealerName: "", //经销商名称
        seriesId: "", //车系ID
        seriesName: "", // 车系名字
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
        hasDrivingLicense: "" //是否有驾照 1:有 2:没有
      }
    };
  },
  watch: {
    "$store.state.exhibition": {
      deep: false,
      handler: function(newValue, oldValue) {
        this.loginSysUserVo.dealerId = newValue.id;
        this.loginSysUserVo.dealerName = newValue.name;
      }
    },
    "$store.state.isload": {
      deep: false,
      handler: function(newValue, oldValue) {
        if (newValue) {
          this.getData();
        }
      }
    },
    "$store.state.carInfo": {
      deep: false,
      handler: function(newValue, oldValue) {
        this.loginSysUserVo.modelId = newValue.id;
        this.loginSysUserVo.modelName = newValue.name;
        this.loginSysUserVo.guidancePrice = newValue.guidancePrice;
        this.loginSysUserVo.seriesId = newValue.seriesId;
        this.loginSysUserVo.seriesName = newValue.seriesName;
        this.loginSysUserVo.year = newValue.year;
      }
    }
  },
  mounted() {
    if (this.$store.state.loanNumber) {
      this.getData();
    }
  },
  methods: {
    onSubmit() {
      if (!this.chechData()) {
        return;
      }
      const toast = this.$toast.loading({
        duration: 0,
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      SaveCarInfo(this.loginSysUserVo).then(res => {
        toast.clear();
        this.$store.state.loanNumber = res.data.data.loanNumber;
        this.$router.back();
      });
    },

    clear() {
        (this.loginSysUserVo.businessType = ""), //业务类型 1-车抵贷，2-二手车,3-新车
        (this.loginSysUserVo.businessTypeName = ""), //自己加的 界面初始化和手动修改业务类型时需要手动修改
        (this.loginSysUserVo.seriesId = ""), //车系ID
        (this.loginSysUserVo.seriesName = ""), // 车系名字
        (this.loginSysUserVo.modelId = ""), //车型ID
        (this.loginSysUserVo.modelName = ""), //品牌车型
        (this.loginSysUserVo.year = ""), // 年份
        (this.loginSysUserVo.otherModel = ""), //自定义车型
        (this.loginSysUserVo.vin = ""), //车架号
        (this.loginSysUserVo.engineNumber = ""), //发动机号
        (this.loginSysUserVo.license = ""), //车牌号
        (this.loginSysUserVo.mileage = ""), //里程数
        (this.loginSysUserVo.colour = ""), //颜色
        (this.loginSysUserVo.purchasePrice = ""), //购买价格（开票价格）
        (this.loginSysUserVo.guidancePrice = ""), //指导价格
        (this.loginSysUserVo.appraisalPrice = ""), //评估价格
        (this.loginSysUserVo.firstRegistrationDate = ""), //首次上牌日期
        (this.loginSysUserVo.usedTime = ""), //使用年限
        (this.loginSysUserVo.exOwnerName = ""), //原车辆所有人姓名
        (this.loginSysUserVo.exOwnerIdType = ""), //原车辆所有人证件类型
        (this.loginSysUserVo.exOwnerIdTypeName = ""), // 自己加的   原车辆所有人证件类型名
        (this.loginSysUserVo.exOwnerIdNumber = ""), //原车辆所有人证件号
        (this.loginSysUserVo.exOwnerMobileNumber = ""), //原车辆所有人手机
        (this.loginSysUserVo.licenseType = ""), //车牌类型 1:私牌 2:公牌
        (this.loginSysUserVo.importFlag = ""), //进口标志 1:进口 2:非进口
        (this.loginSysUserVo.hasDrivingLicense = ""); //是否有驾照 1:有 2:没有
    },
    chechData() {
      if (this.loginSysUserVo.businessType == "") {
        console.log("1");
        this.$toast.fail("请将必填项填写完整");

        return false;
      } else if (this.loginSysUserVo.businessType == "1") {
        if (
          this.loginSysUserVo.dealerId == "" ||
          this.loginSysUserVo.modelId == "" ||
          this.loginSysUserVo.purchasePrice == "" ||
          this.loginSysUserVo.colour == "" ||
          this.loginSysUserVo.importFlag == "" ||
          this.loginSysUserVo.licenseType == "" ||
          this.loginSysUserVo.hasDrivingLicense == ""
        ) {
          console.log("2");

          this.$toast.fail("请将必填项填写完整");

          return false;
        }
      } else if (this.loginSysUserVo.businessType == "2") {
        if (
          this.loginSysUserVo.modelId == "" ||
          this.loginSysUserVo.firstRegistrationDate == "" ||
          this.loginSysUserVo.mileage == "" ||
          this.loginSysUserVo.appraisalPrice == "" ||
          this.loginSysUserVo.vin == "" ||
          this.loginSysUserVo.engineNumber == "" ||
          this.loginSysUserVo.licenseType == "" ||
          this.loginSysUserVo.hasDrivingLicense == "" ||
          this.loginSysUserVo.exOwnerName == "" ||
          this.loginSysUserVo.exOwnerIdType == "" ||
          this.loginSysUserVo.exOwnerIdNumber == "" ||
          this.loginSysUserVo.importFlag == ""
        ) {
          console.log("3");

          this.$toast.fail("请将必填项填写完整");

          return false;
        }
        if (
          this.loginSysUserVo.exOwnerIdType == "1" &&
          !idNumValidator(this.loginSysUserVo.exOwnerIdNumber)
        ) {
          this.$toast.fail("原有车辆所有人证件号格式错误！");
          return false;
        }
        if(this.loginSysUserVo.exOwnerMobileNumber.length > 0){
        if (!isPhoneNum(this.loginSysUserVo.exOwnerMobileNumber)) {
          this.$toast.fail("原有车辆所有人手机号格式错误！");
          return false;
        }
        }

        if (!vin(this.loginSysUserVo.vin)) {
          this.$toast.fail("车架号格式错误！");
          return false;
        }
      }
      return true;
    },

    getData() {
      // 数据校验
      CarInfo({ loanNumber: this.$store.state.loanNumber }).then(res => {
        console.log("res");
        this.loginSysUserVo = res.data.data;
        if (this.loginSysUserVo.businessType == "3") {
          this.loginSysUserVo.businessTypeName = "车抵贷";
        } else if (this.loginSysUserVo.businessType == "2") {
          this.loginSysUserVo.businessTypeName = "二手车";
          // 接口返回 yyyy-MM-dd hh:mm:ss  -> yyyy-MM-dd
          this.loginSysUserVo.firstRegistrationDate = dateFormat(
            this.loginSysUserVo.firstRegistrationDate,
            "yyyy-MM-dd"
          );
        } else {
          this.loginSysUserVo.businessTypeName = "新车";
        }
        this.loginSysUserVo.exOwnerIdTypeName = getValue(
          "2",
          this.loginSysUserVo.exOwnerIdType
        );
      });
    },

    selectIdType(value) {
      this.loginSysUserVo.exOwnerIdTypeName = value;
      this.loginSysUserVo.exOwnerIdType = value == "身份证" ? "1" : "2";
      this.showIdType = false;
    },
    // 选择上牌时间
    selectDate(value) {
      // console.log(value)
      this.loginSysUserVo.firstRegistrationDate = selectDateFormat(
        value,
        "yyyy-MM-dd"
      );
      this.loginSysUserVo.usedTime = dataYear(value);
      this.showDate = false;
    },
    // 选择业务大类
    selectBusiness(val) {
      this.showBusiness = false;
      if (this.loginSysUserVo.businessTypeName == val) {
        return;
      }
      // 每次切换业务类型的时候需要情况所有数据
      this.clear();
      this.loginSysUserVo.businessTypeName = val;
      if (val === "新车") {
        this.loginSysUserVo.businessType = "1";
      } else if (val === "二手车") {
        this.loginSysUserVo.businessType = "2";
      } else {
        this.loginSysUserVo.businessType = "3";
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
      this.$refs.form.submit();
    }
  },

  //修改form的keepAlive值为false时，再次进入页面会重新请求数据，即刷新页面
  beforeRouteLeave(to, from, next) {
    this.$store.state.CarModels = false;

    if (to.path == "/menu") {
      this.$store.state.isload = false;
      this.loginSysUserVo.businessType = ""; //业务类型 1-车抵贷，2-二手车,3-新车
      this.loginSysUserVo.dealerId = ""; //经销商ID
      this.loginSysUserVo.dealerName = "";
      this.loginSysUserVo.businessTypeName = ""; //自己加的 界面初始化和手动修改业务类型时需要手动修改
      this.loginSysUserVo.seriesId = ""; //车系ID
      this.loginSysUserVo.seriesName = ""; // 车系名字
      this.loginSysUserVo.modelId = ""; //车型ID
      this.loginSysUserVo.modelName = ""; //品牌车型
      this.loginSysUserVo.year = ""; // 年份
      this.loginSysUserVo.otherModel = ""; //自定义车型
      this.loginSysUserVo.vin = ""; //车架号
      this.loginSysUserVo.engineNumber = ""; //发动机号
      this.loginSysUserVo.license = ""; //车牌号
      this.loginSysUserVo.mileage = ""; //里程数
      this.loginSysUserVo.colour = ""; //颜色
      this.loginSysUserVo.purchasePrice = ""; //购买价格（开票价格）
      this.loginSysUserVo.guidancePrice = ""; //指导价格
      this.loginSysUserVo.appraisalPrice = ""; //评估价格
      this.loginSysUserVo.firstRegistrationDate = ""; //首次上牌日期
      this.loginSysUserVo.usedTime = ""; //使用年限
      this.loginSysUserVo.exOwnerName = ""; //原车辆所有人姓名
      this.loginSysUserVo.exOwnerIdType = ""; //原车辆所有人证件类型
      this.loginSysUserVo.exOwnerIdTypeName = ""; // 自己加的   原车辆所有人证件类型名
      this.loginSysUserVo.exOwnerIdNumber = ""; //原车辆所有人证件号
      this.loginSysUserVo.exOwnerMobileNumber = ""; //原车辆所有人手机
      this.loginSysUserVo.licenseType = ""; //车牌类型 1:私牌 2:公牌
      this.loginSysUserVo.importFlag = ""; //进口标志 1:进口 2:非进口
      this.loginSysUserVo.hasDrivingLicense = ""; //是否有驾照 1:有 2:没有
      from.meta.keepAlive = true;
    } else if (to.path == "/carModels") {
      to.meta.keepAlive = true;
      this.$store.state.isloadCarModels = true;

    } else {
      from.meta.keepAlive = true;
    }
    next();
  }
};
</script>

<style >
.content {
  background: none;
  height: 80%;
  overflow-y: scroll;
}
</style>