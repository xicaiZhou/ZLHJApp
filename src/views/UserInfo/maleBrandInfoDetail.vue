<template>
  <div style="height:100%; margin-bottom: 60px;">
    <div>
      <div>
        <div class="header">基本信息</div>
        <van-field
          required
          label="申请企业名称:"
          v-model="customerInfo.customerName"
          placeholder="请填写企业名称"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="与承租人关系:"
          v-model="customerInfo.relationValue"
          placeholder="请选择与承租人关系"
          @click="showSelectPop(1)"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="证件类型:"
          v-model="customerInfo.idTypeValue"
          placeholder="请选择证件类型"
          @click="showSelectPop(2)"
        />
        <van-field required label="证件号码:" v-model="customerInfo.idNum" placeholder="请填写证件号码" />
        <van-field
          required
          is-link
          readonly
          clickable
          label="营业执照地址:"
          v-model="idCardAddress"
          placeholder="请选择营业执照地址"
          @click="showSelectAddressPop(1)"
        />
        <van-field
          required
          label="详细地址:"
          v-model="customerInfo.idCardAddress"
          placeholder="请填写详细地址"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="经营地址:"
          v-model="liveAddress"
          placeholder="请选择经营地址"
          @click="showSelectAddressPop(2)"
        />
        <van-field
          required
          label="详细地址:"
          v-model="customerHouseProperty.liveAddress"
          placeholder="请填写详细地址"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="企业性质:"
          v-model="customerInfo.customerNatureValue"
          placeholder="请选择企业性质"
          @click="showSelectPop(3)"
        />
        <van-field required label="企业联系电话:" v-model="customerInfo.phone" placeholder="请填写企业联系电话" />
      </div>
      <div>
        <div class="header">企业人员信息</div>
        <van-field
          required
          label="法定代表人:"
          v-model="customerCompany.legalRepresentative"
          placeholder="请填写法定代表人"
        />
        <van-field
          required
          label="联系方式:"
          v-model="customerCompany.legalRepresentativePhone"
          placeholder="请填写联系方式"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="证件类型:"
          v-model="customerCompany.representativeIdTypeValue"
          placeholder="请选择证件类型"
          @click="showSelectPop(4)"
        />
        <van-field
          required
          label="证件号码:"
          v-model="customerCompany.representativeIdNum"
          placeholder="请填写证件号码"
        />
        <van-field
          required
          label="实际用车人:"
          v-model="customerCompany.actualCarOwner"
          placeholder="请填写实际用车人"
        />
        <van-field
          required
          label="联系方式:"
          v-model="customerCompany.ownerPhone"
          placeholder="请填写联系方式"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="证件类型:"
          v-model="customerCompany.ownerIdTypeValue"
          placeholder="请选择证件类型"
          @click="showSelectPop(5)"
        />
        <van-field
          required
          label="证件号码:"
          v-model="customerCompany.ownerIdNum"
          placeholder="请填写证件号码"
        />
      </div>
    </div>
    <div class="subBtn">
      <van-button class="subBtn_body" block type="info" @click="toSub">保 存</van-button>
    </div>
    <div>
      <van-popup
        v-model="showPop"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title="请选择选择"
          show-toolbar
          :columns="popList"
          @confirm="selected"
          @cancel="showPop=false"
        />
      </van-popup>
      <van-popup
        v-model="showAddressPop"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-area
          @confirm="selectedAddress"
          @cancel="showAddressPop = false"
          title="选择地址"
          :area-list="addressList"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { userDetailInfo, updateUser } from "../../request/api";
import { getKey, getValue, isEmpty, getAddress } from "../../utils/utils";
import { idNumValidator, isPhoneNum } from "../../utils/common";
import { dateFormat } from "../../utils/formatter";
export default {
  data() {
    return {
      customerInfo: {
        customerId: "", // 客户id
        customerName: "", // 客户姓名/企业名称
        beforeName: "", // 曾用名
        loanNumber: "", // 申请编号
        customerRole: "", //角色(1-承租人 2-担保人)
        customerType: "", //客户类型(1=自然人，2=法人)
        relation: "", // 与承租人关系 1-本人 2-夫妻 3-父母 4-子女 5-兄弟姐妹 6-同事 7-其他
        relationValue: "", //自己添加的
        sex: "", //客户性别
        idType: "", //证件类型
        idNum: "", // 证件号码
        isMarry: "", // 婚姻状况
        isMarryValue: "", // 自己加的
        birthday: "", // 出生日期
        age: "", //年龄
        occupationType: "", // 职业类型
        nationality: "", // 国籍
        isLongTerm: "", // 身份证是否长期有效 1:是 2:否
        certificateEndDate: "", //证件到期日
        certificationAuthority: "", //发证机关
        idCardProvince: "", // 身份证/营业执照地址--省
        idCardCity: "", // 身份证/营业执照地址--市
        idCardArea: "", // 身份证/营业执照地址--区
        idCardAddress: "", //身份证/营业执照地址--详细地址
        phone: "", //主要联系方式（手机/企业联系电话）
        isLocal: "", // 是否本地户籍
        customerNature: "", //客户/企业性质
        customerNatureValue: "", // 自己加的
        educationLevel: "", //教育程度
        highestEducation: "", //最高学历
        creditFlag: "", //征信标志
        blacklistFlag: "", //是否黑名单标志
        commons: "", // 备注
        saveFlag: "", // 完善标志
        createdBy: "", // 创建人
        createdTime: "", //创建时间
        updateBy: "", // 更新人
        updateTime: "" // 更新时间
      },
      customerCompany: {
        id: 0, //逻辑主键
        customerId: 0, //客户id
        legalRepresentative: "", //法定代表人
        legalRepresentativePhone: "", //法定代表人联系方式
        representativeIdType: "", //法定代表人证件类型
        representativeIdTypeValue: "",
        representativeIdNum: "", //法定代表人证件号码
        actualCarOwner: "", //实际用车人
        ownerPhone: "", //用车人联系方式
        ownerIdType: "", //用车人证件类型
        ownerIdTypeValue: "",
        ownerIdNum: "", //用车人证件号码
        createdBy: "", //创建人
        createdTime: "", //创建时间
        updateBy: "", //更新人
        updateTime: "" //更新时间
      },
      customerHouseProperty: {
        id: "", //逻辑主键
        customerId: "", //客户id
        liveType: "", //居住状况
        whetherIdAddr: "", //现居地与身份证地址相同
        liveProvince: "", //居住地址省
        liveCity: "", //居住地址市
        liveArea: "", //居住地址区
        liveAddress: "", //居住地址详细地址
        telephone: "", //固定电话
        roomType: "", //房产类型
        roomNature: "", //房产性质
        roomProvince: "", //房产地址省
        roomCity: "", //房产地址市
        roomArea: "", //房产地址区
        roomAddress: "", //房产地址详细地址
        roomAreas: "", //房产总面积（平方米）
        roomNum: "", //房产编号
        createdBy: "", //创建人
        createdTime: "", //创建时间
        updateBy: "", //更新人
        updateTime: "" //更新时间
      },
      idCardAddress: "",
      liveAddress: "",
      selectIndex: 0,
      showPop: false,
      showAddressPop: false,
      popList: [],
      selectAddressIndex: 0,
      addressList: this.$store.state.address
    };
  },
  mounted() {
    userDetailInfo({ customerId: this.$route.params.customerId }).then(res => {
      if (res.data.data.customerInfo != null) {
        this.customerInfo = res.data.data.customerInfo;
        this.customerInfo.relationValue = getValue(
          "13",
          this.customerInfo.relation
        );
        this.customerInfo.idTypeValue = getValue("2", this.customerInfo.idType);
        this.customerInfo.isMarryValue = getValue(
          "3",
          this.customerInfo.isMarry
        );
        this.customerInfo.customerNatureValue = getValue(
          "10",
          this.customerInfo.customerNature
        );
      }
      if (res.data.data.customerCompany != null) {
        this.customerCompany = res.data.data.customerCompany;
        this.customerCompany.representativeIdTypeValue = "身份证";
        this.customerCompany.representativeId = "1";
        this.customerCompany.ownerIdTypeValue = "身份证";
        this.customerCompany.ownerIdType = "1";
      }
      if (res.data.data.customerHouseProperty != null) {
        this.customerHouseProperty = res.data.data.customerHouseProperty;
      }
      this.setAddress();
      console.log(res);
    });
  },
  methods: {
    toSub() {
      if (
        isEmpty(this.customerInfo.customerName) ||
        isEmpty(this.customerInfo.customerRole) ||
        isEmpty(this.customerInfo.idType) ||
        isEmpty(this.customerInfo.idNum) ||
        isEmpty(this.customerInfo.idCardProvince) ||
        isEmpty(this.customerInfo.idCardAddress) ||
        isEmpty(this.customerInfo.phone) ||
        isEmpty(this.customerHouseProperty.liveProvince) ||
        isEmpty(this.customerInfo.customerNature)
      ) {
        this.$toast.fail("请将'基本信息'中必填项填写完整");
        return;
      }
      if (!isPhoneNum(this.customerInfo.phone)) {
        this.$toast.fail("企业联系电话格式错误！");
        return;
      }
      if (
        isEmpty(this.customerCompany.legalRepresentative) ||
        isEmpty(this.customerCompany.legalRepresentativePhone) ||
        isEmpty(this.customerCompany.representativeIdType) ||
        isEmpty(this.customerCompany.representativeIdNum) ||
        isEmpty(this.customerCompany.actualCarOwner) ||
        isEmpty(this.customerCompany.ownerPhone) ||
        isEmpty(this.customerCompany.ownerIdType) ||
        isEmpty(this.customerCompany.ownerIdNum)
      ) {
        this.$toast.fail("请将'企业人员信息'中必填项填写完整");
        return;
      }
      if (!isPhoneNum(this.customerCompany.legalRepresentativePhone)) {
        this.$toast.fail("'法人联系方式'格式错误！");
        return;
      }
      if (!isPhoneNum(this.customerCompany.ownerPhone)) {
        this.$toast.fail("'实际用车人联系方式'格式错误！");
        return;
      }
      if (!idNumValidator(this.customerCompany.representativeIdNum)) {
        this.$toast.fail("'法人证件号码'格式错误！");
        return;
      }
      if (!idNumValidator(this.customerCompany.ownerIdNum)) {
        this.$toast.fail("'实际用车人证件号码'格式错误！");
        return;
      }
      const toast = this.$toast.loading({
        duration: 0,
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      let param = Object.assign({
        customerId: this.$route.params.customerId,
        customerInfoParam: this.customerInfo,
        customerHousePropertyParam: this.customerHouseProperty,
        customerCompanyParam: this.customerCompany
      });
      if (this.customerInfo.isMarry == "2") {
        param.customerSpouseInfoParam = this.customerSpouseInfo;
      }
      console.log("参数", param);
      updateUser(param).then(res => {
        toast.clear();
        this.$router.back();
      });
    },
    showSelectPop(state) {
      switch (state) {
        case 1: {
          //与承租人关系:
          this.popList = ["法人", "实际使用人", "股东", "高管", "其他"];
          break;
        }
        case 2: {
          //企业证件类型:
          this.popList = ["社会统一信用代码"];
          break;
        }
        case 3: {
          //企业性质:
          this.popList = [
            "政府机关/事业单位",
            "国企",
            "外资/合资",
            "民营",
            "个体",
            "其他"
          ];
          break;
        }
        case 4: {
          //法人证件类型:
          this.popList = ["身份证"];
          break;
        }
        case 5: {
          //实际用车人证件类型:
          this.popList = ["身份证"];
          break;
        }
      }
      this.selectIndex = state;
      this.showPop = true;
    },
    selected(value) {
      this.showPop = false;
      console.log(value);
      switch (this.selectIndex) {
        case 1: {
          //与承租人关系:
          this.customerInfo.relation = getKey(value, this.popList);
          this.customerInfo.relationValue = value;
          break;
        }
        case 2: {
          //企业证件类型:
          this.customerInfo.idType = "2";
          this.customerInfo.idTypeValue = "社会统一信用代码";
          break;
        }
        case 3: {
          //企业性质:
          this.customerInfo.customerNature = getKey(value, this.popList);
          this.customerInfo.customerNatureValue = value;
          break;
        }
        case 4: {
          //企业证件类型:
          this.customerCompany.representativeIdType = "1";
          this.customerCompany.representativeIdTypeValue = "身份证";
          break;
        }
        case 5: {
          //企业证件类型:
          this.customerCompany.ownerIdType = "1";
          this.customerCompany.ownerIdTypeValue = "身份证";
          break;
        }
      }
    },
    selectedAddress(value) {
      switch (this.selectAddressIndex) {
        case 1: {
          //身份证地址
          console.log("身份证地址:", value);
          this.idCardAddress = value[0].name + value[1].name + value[2].name;
          this.customerInfo.idCardProvince = value[0].code;
          this.customerInfo.idCardCity = value[1].code;
          this.customerInfo.idCardArea = value[2].code;
          break;
        }
        case 2: {
          console.log("经营地地址:", value);
          this.liveAddress = value[0].name + value[1].name + value[2].name;
          this.customerHouseProperty.liveProvince = value[0].code;
          this.customerHouseProperty.liveCity = value[1].code;
          this.customerHouseProperty.liveArea = value[2].code;
          break;
        }
      }
      this.showAddressPop = false;
    },
    showSelectAddressPop(state) {
      this.selectAddressIndex = state;
      this.showAddressPop = true;
    },
    setAddress() {
      if (this.customerInfo.idCardProvince != null) {
        this.idCardAddress = getAddress({
          province: this.customerInfo.idCardProvince,
          city: this.customerInfo.idCardCity,
          area: this.customerInfo.idCardArea
        });
      }
      if (this.customerHouseProperty.liveProvince != null) {
        this.liveAddress = getAddress({
          province: this.customerHouseProperty.liveProvince,
          city: this.customerHouseProperty.liveCity,
          area: this.customerHouseProperty.liveArea
        });
      }
    }
  }
};
</script>

<style>
</style>