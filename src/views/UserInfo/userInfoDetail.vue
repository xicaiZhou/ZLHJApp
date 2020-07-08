<template>
  <div style="height:100%; margin-bottom: 60px;">
    <div>
      <div>
        <div class="header">基本信息</div>
        <van-field
          required
          label="客户姓名:"
          v-model="customerInfo.customerName"
          placeholder="请填写客户姓名"
        />
        <van-field label="曾用名:" v-model="customerInfo.beforeName" placeholder="请填写曾用名" />
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
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">客户性别：</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerInfo.sex = '1'"
                :class="customerInfo.sex == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >男</div>
              <div
                @click="customerInfo.sex = '2'"
                :class="customerInfo.sex == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >女</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <van-field
          required
          is-link
          readonly
          clickable
          label="婚姻状况:"
          v-model="customerInfo.isMarryValue"
          placeholder="请选择婚姻状况"
          @click="showSelectPop(3)"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="出生日期:"
          v-model="customerInfo.birthday"
          placeholder="请选择出生日期"
          @click="showBirthday = true"
        />
        <van-field required label="年龄:" v-model="customerInfo.age" placeholder="请填写年龄" />
        <van-field
          required
          is-link
          readonly
          clickable
          label="职业类型:"
          v-model="customerInfo.occupationTypeValue"
          placeholder="请选择职业类型"
          @click="showSelectPop(4)"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="国籍:"
          v-model="customerInfo.nationalityValue"
          placeholder="请选择国籍"
          @click="showSelectPop(5)"
        />
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">身份证是否长期有效：</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerInfo.isLongTerm = '1'"
                :class="customerInfo.isLongTerm == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="customerInfo.isLongTerm = '2'"
                :class="customerInfo.isLongTerm == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <van-field
          required
          is-link
          readonly
          clickable
          label="证件到期日:"
          v-model="customerInfo.certificateEndDate"
          placeholder="请选择证件到期日"
          @click="showSelectDatePop(1)"
        />
        <van-field required label="发证机关:" v-model="customerInfo.age" placeholder="请填写年龄" />
        <van-field
          required
          is-link
          readonly
          clickable
          label="身份证地址:"
          v-model="idCardAddress"
          placeholder="请选择身份证地址"
          @click="showSelectAddressPop(1)"
        />
        <van-field
          required
          label="详细地址:"
          v-model="customerInfo.idCardAddress"
          placeholder="请填写详细地址"
        />
        <van-field required label="手机号码:" v-model="customerInfo.phone" placeholder="请填写手机号码" />
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">是否本地户籍：</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerInfo.isLocal = '1'"
                :class="customerInfo.isLocal == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="customerInfo.isLocal = '2'"
                :class="customerInfo.isLocal == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <van-field
          required
          is-link
          readonly
          clickable
          label="客户类型:"
          v-model="customerInfo.customerNatureValue"
          placeholder="请选择客户类型"
          @click="showSelectPop(6)"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="教育程度:"
          v-model="customerInfo.educationLevelValue"
          placeholder="请选择教育程度"
          @click="showSelectPop(7)"
        />
        <van-field
          v-model="customerInfo.commons"
          autosize
          label="备注:"
          type="textarea"
          placeholder="请输入备注"
        />
      </div>
      <div>
        <div class="header">居住地信息</div>
        <van-field
          required
          is-link
          readonly
          clickable
          label="居住状况:"
          v-model="customerHouseProperty.liveTypeValue"
          placeholder="请选择居住状况"
          @click="showSelectPop(8)"
        />
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">现居地与身份证地址相同：</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerHouseProperty.whetherIdAddr = '1'"
                :class="customerHouseProperty.whetherIdAddr == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="customerHouseProperty.whetherIdAddr = '2'"
                :class="customerHouseProperty.whetherIdAddr == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>

        <van-field label="详细地址:" v-model="customerHouseProperty.liveAddress" placeholder="请填写详细地址" />
        <van-field label="固定电话:" v-model="customerHouseProperty.telephone" placeholder="请填写固定电话号码" />
      </div>
      <div>
        <div class="header">主要财产信息</div>
        <van-field
          required
          label="每月家庭净收入(元):"
          v-model="customerAssets.familyMonthIncome"
          placeholder="请填写每月家庭净收入"
        />
        <van-field
          required
          label="月平均支出(元):"
          v-model="customerAssets.familyMonthExpenditure"
          placeholder="请填写月平均支出"
        />
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">家庭首次购车：</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerAssets.firstBuyCar = '1'"
                :class="customerAssets.firstBuyCar == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="customerAssets.firstBuyCar = '2'"
                :class="customerAssets.firstBuyCar == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">购车目的:</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerAssets.buyCarPurpose = '1'"
                :class="customerAssets.buyCarPurpose == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >自用</div>
              <div
                @click="customerAssets.buyCarPurpose = '2'"
                :class="customerAssets.buyCarPurpose == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >出租</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>

        <van-field
          label="社保卡号:"
          v-model="customerAssets.socialSecurityNumber"
          placeholder="请填写社保卡号"
        />
      </div>
      <div>
        <div class="header">房产信息</div>
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title_norequired">房产类别:</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerHouseProperty.roomType = '1'"
                :class="customerHouseProperty.roomType == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >住房</div>
              <div
                @click="customerHouseProperty.roomType = '2'"
                :class="customerHouseProperty.roomType == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >商用房</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <van-field
          is-link
          readonly
          clickable
          label="房产性质:"
          v-model="customerHouseProperty.roomNatureValue"
          placeholder="请选择房产性质"
          @click="showSelectPop(9)"
        />
        <van-field
          is-link
          readonly
          clickable
          label="房产地址:"
          v-model="roomAddress"
          placeholder="请选择房产地址"
          @click="showSelectAddressPop(2)"
        />
        <van-field label="详细地址:" v-model="customerHouseProperty.roomAddress" placeholder="请填写详细地址" />

        <van-field label="面积(m²):" v-model="customerHouseProperty.roomAreas" placeholder="请填写房产面积" />
        <van-field label="房产编号:" v-model="customerHouseProperty.roomNum" placeholder="请填写房产编号" />
      </div>
      <div>
        <div class="header">工作信息</div>
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">是否有工作：</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerJob.isWork = '1'"
                :class="customerJob.isWork == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >有</div>
              <div
                @click="customerJob.isWork = '2'"
                :class="customerJob.isWork == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >无</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <div v-show="customerJob.isWork == 1">
          <van-field required label="工作单位:" v-model="customerJob.company" placeholder="请填写工作单位" />
          <van-field
            required
            label="单位电话:"
            v-model="customerJob.companyPhone"
            placeholder="请填写单位电话"
          />
          <van-field
            required
            label="分机号:"
            v-model="customerJob.companyExtension"
            placeholder="请填写分机号"
          />
          <van-field
            required
            is-link
            readonly
            clickable
            label="单位地址:"
            v-model="companyAddress"
            placeholder="请选择单位地址"
            @click="showSelectAddressPop(3)"
          />
          <van-field label="详细地址:" v-model="customerJob.companyAddress" placeholder="请填写详细地址" />
          <van-field
            required
            is-link
            readonly
            clickable
            label="单位性质:"
            v-model="customerJob.companyTypeValue"
            placeholder="请选择单位性质"
            @click="showSelectPop(10)"
          />
          <van-field
            required
            is-link
            readonly
            clickable
            label="职务:"
            v-model="customerJob.positionValue"
            placeholder="请选择职务"
            @click="showSelectPop(11)"
          />
        </div>
      </div>
      <div v-show="this.customerInfo.isMarry == '2'">
        <div class="header">配偶信息</div>
        <van-field
          required
          label="姓名:"
          v-model="customerSpouseInfo.spouseName"
          placeholder="请填写配偶姓名"
        />
        <van-field
          required
          label="手机号:"
          v-model="customerSpouseInfo.spousePhone"
          placeholder="请填写配偶手机号"
        />

        <van-field
          required
          is-link
          readonly
          clickable
          label="证件类型:"
          v-model="customerSpouseInfo.spouseIdType"
          placeholder="请选择配偶证件类型"
          @click="showSelectPop(12)"
        />
        <van-field
          required
          label="证件号码:"
          v-model="customerSpouseInfo.spouseIdNum"
          placeholder="请填写配偶证件号码"
        />
      </div>
      <div>
        <div class="header">其他联系方式</div>
        <van-field
          required
          label="邮箱(对账单邮箱地址):"
          v-model="customerContact.statementEmail"
          placeholder="请填写邮箱"
        />
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title_norequired">是否需要对账单：</span>
            <div class="zlhjRadio_body">
              <div
                @click="customerContact.isNeedStatement = '1'"
                :class="customerContact.isNeedStatement == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="customerContact.isNeedStatement = '2'"
                :class="customerContact.isNeedStatement == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <van-field
          v-show="customerContact.isNeedStatement == 1"
          label="委托收件人:"
          v-model="customerContact.entrustedRecipient"
          placeholder="请填写委托收件人"
        />
        <van-field label="手机一:" v-model="customerContact.firstMobilePhone" placeholder="请填写手机号" />
        <van-field label="手机二:" v-model="customerContact.secMobilePhone" placeholder="请填写手机号" />
        <van-field label="固话一:" v-model="customerContact.tel1" placeholder="请填写固话" />
        <van-field label="固话二:" v-model="customerContact.tel2" placeholder="请填写固话" />
      </div>
      <div>
        <div class="header">其他联系方式</div>
        <div v-for="(item,index) in customerContactPersonList" :key="index" @click="toDetail(item)">
          <van-field
            required
            label="联系人姓名:"
            v-model="item.contactPersonName"
            placeholder="请填写联系人姓名"
          />
          <van-field
            required
            label="联系人手机号:"
            v-model="item.contactPersonPhone"
            placeholder="请填写联系人手机号"
          />
          <div>
            <div class="zlhjRadio" style="display:flex">
              <span class="zlhjRadio_title">与承租人关系：</span>
              <div class="zlhjRadio_body">
                <div
                  @click="item.relation = '1'"
                  :class="item.relation == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >亲属</div>
                <div
                  @click="item.relation = '2'"
                  :class="item.relation == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
                >朋友</div>
              </div>
            </div>
            <div style="padding-left:10px">
              <div class="zlhjRadioLine"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="subBtn">
      <van-button class="subBtn_body" block type="info" @click="toSub">保 存</van-button>
    </div>
    <!-- pop -->
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
        v-model="showDatePop"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          @confirm="selectDate"
          @cancel="showDatePop = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { userDetailInfo, updateUser } from "../../request/api";
import { getKey, getValue } from "../../utils/utils";
import { idNumInfo } from "../../utils/common";
import {dateFormat} from '../../utils/formatter'
export default {
  data() {
    return {
      showPop: false,
      popList: [],
      selectIndex: 0,
      showDatePop: false,
      minDate: new Date(),
      showAddressPop: false,
      selectAddressIndex: 0,
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
      customerAssets: {
        id: "", //逻辑主键
        customerId: "", //客户id
        familyMonthIncome: "", //每月家庭净收入
        familyMonthExpenditure: "", //家庭月支出
        firstBuyCar: "", //是否首次购车
        buyCarPurpose: "", //购车目的
        socialSecurityNumber: "", //社保卡号
        createdBy: "", //创建人
        createdTime: "", //创建时间
        updateBy: "", //更新人
        updateTime: "" //更新时间
      },
      customerJob: {
        id: "", //逻辑主键
        customerId: "", //客户id
        isWork: "", // 是否有工作：1-有，2-无
        company: "", // 工作单位
        companyPhone: "", // 单位电话
        companyExtension: "", // 单位电话分机号
        companyProvince: "", // 工作地址省
        companyCity: "", // 工作地址市
        companyArea: "", // 工作地址区
        companyAddress: "", // 工作单位详细地址
        companyType: "", // 单位性质
        position: "", // 职务
        companyCode: "", // 工作单位邮编
        createdBy: "", //创建人
        createdTime: "", //创建时间
        updateBy: "", //更新人
        updateTime: "" //更新时间
      },
      customerContact: {
        id: "", //逻辑主键
        customerId: "", //客户id
        statementEmail: "", //邮箱（对账邮箱地址）
        isNeedStatement: "", //是否需要对账单
        entrustedRecipient: "", //委托收件人
        firstMobilePhone: "", //手机1
        secMobilePhone: "", //手机2
        thrMobilePhone: "", //手机3
        tel1: "", //居住地固定电话
        tel2: "", //居住地固定电话
        tel3: "", //居住地固定电话
        statementProvince: "", //对账单地址-省
        statementCity: "", //对账单地址-市
        statementArea: "", //对账单地址-区
        statementAddress: "", //对账单地址-详细地址
        statementType: "", //对账单地址类型(1-居住地地址,2-单位地址)
        postCode: "", //邮编
        createdBy: "", //创建人
        createdTime: "", //创建时间
        updateBy: "", //更新人
        updateTime: "" //更新时间
      },
      customerCompany: {
        id: 0, //逻辑主键
        customerId: 0, //客户id
        legalRepresentative: "", //法定代表人
        legalRepresentativePhone: "", //法定代表人联系方式
        representativeIdType: "", //法定代表人证件类型
        representativeIdNum: "", //法定代表人证件号码
        actualCarOwner: "", //实际用车人
        ownerPhone: "", //用车人联系方式
        ownerIdType: "", //用车人证件类型
        ownerIdNum: "", //用车人证件号码
        createdBy: "", //创建人
        createdTime: "", //创建时间
        updateBy: "", //更新人
        updateTime: "" //更新时间
      },
      customerSpouseInfo: {
        id: 0, //逻辑主键
        customerId: 0, //客户id
        spouseName: "", //配偶姓名
        spousePhone: "", //配偶手机号
        spouseIdType: "", //证件类型
        spouseIdNum: "", //证件号码
        createdBy: "", //创建人
        createdTime: "", //创建时间
        updateBy: "", //更新人
        updateTime: "" //更新时间
      },
      customerContactPersonList: [], //    {
      //     id: "", //逻辑主键
      //     customerId: "", //客户id
      //     contactPersonName: "", //联系人姓名
      //     contactPersonPhone: "", //联系人手机号
      //     relation: "", //与承租人关系（1、亲属；2、朋友）
      //     createdBy: "", //创建人
      //     createdTime: "", //创建时间
      //     updateBy: "", //更新人
      //     updateTime: "" //更新时间
      //   },
      idCardAddress: "",
      liveAddress: "",
      roomAddress: "",
      companyAddress: ""
    };
  },
  mounted() {
    console.log(this.$route.params.customerId);
    userDetailInfo({ customerId: this.$route.params.customerId }).then(res => {
      console.log(res);
      if (res.data.data.customerInfo != null) {
        this.customerInfo = res.data.data.customerInfo;
        this.customerInfo.relationValue = getValue(
          "1",
          this.customerInfo.relation
        );
        if (this.customerInfo.idType == "1") {
          this.customerInfo.sex = idNumInfo(this.customerInfo.idNum).sex;
          this.customerInfo.age = idNumInfo(this.customerInfo.idNum).age;
          this.customerInfo.birthday = idNumInfo(
            this.customerInfo.idNum
          ).birthday;
        }
        this.customerInfo.idTypeValue = getValue("2", this.customerInfo.idType);
        this.customerInfo.isMarryValue = getValue(
          "3",
          this.customerInfo.isMarry
        );
        this.customerInfo.occupationTypeValue = getValue(
          "4",
          this.customerInfo.occupationType
        );
        this.customerInfo.nationalityValue = getValue(
          "5",
          this.customerInfo.nationalityValue
        );
        this.customerInfo.customerNatureValue = getValue(
          "6",
          this.customerInfo.customerNature
        );
        this.customerInfo.educationLevelValue = getValue(
          "7",
          this.customerInfo.educationLevel
        );
        this.customerHouseProperty.liveTypeValue = getValue(
          "8",
          this.customerInfo.liveTypeValue
        );
        this.customerHouseProperty.roomNatureValue = getValue(
          "9",
          this.customerInfo.roomNature
        );
        this.customerJob.companyTypeValue = getValue(
          "10",
          this.customerInfo.companyType
        );
        this.customerJob.positionValue = getValue(
          "11",
          this.customerInfo.position
        );
      }
      if (res.data.data.customerHouseProperty != null) {
        this.customerHouseProperty = res.data.data.customerHouseProperty;
      }
      if (res.data.data.customerAssets != null) {
        this.customerAssets = res.data.data.customerAssets;
      }
      if (res.data.data.customerJob != null) {
        this.customerJob = res.data.data.customerJob;
      }
      if (res.data.data.customerContact != null) {
        this.customerContact = res.data.data.customerContact;
      }
      if (res.data.data.customerCompany != null) {
        this.customerCompany = res.data.data.customerCompany;
      }
      if (res.data.data.customerSpouseInfo != null) {
        this.customerSpouseInfo = res.data.data.customerSpouseInfo;
      }
      this.customerContactPersonList = res.data.data.customerContactPersonList;
      this.setAddress();
    });
  },

  methods: {
    selected(value) {
      this.showPop = false;
      switch (this.selectIndex) {
        case 1: {
          //与承租人关系:
          this.customerInfo.relation = getKey(value, this.popList);
          this.customerInfo.relationValue = value;
          break;
        }
        case 2: {
          //证件类型:
          customerInfo.idType = getKey(value, this.popList);
          this.customerInfo.idTypeValue = value;
          break;
        }
        case 3: {
          // 请选择婚姻状况
          this.customerInfo.isMarry = getKey(value, this.popList);
          this.customerInfo.isMarryValue = value;

          break;
        }
        case 4: {
          // label="职业类型:"
          this.customerInfo.occupationType = getKey(value, this.popList);
          this.customerInfo.occupationTypeValue = value;
          break;
        }
        case 5: {
          // label="国籍:"
          this.customerInfo.nationality = getKey(value, this.popList);
          this.customerInfo.nationalityValue = value;
          break;
        }
        case 6: {
          // label="客户类型:"
          this.customerInfo.customerNature = getKey(value, this.popList);
          this.customerInfo.customerNatureValue = value;
          break;
        }
        case 7: {
          // label="教育程度:"
          this.customerInfo.educationLevel = getKey(value, this.popList);
          this.customerInfo.educationLevelValue = value;

          break;
        }
        case 8: {
          //  label="居住状况:"
          this.customerHouseProperty.liveType = getKey(value, this.popList);
          this.customerHouseProperty.liveTypeValue = value;
          break;
        }
        case 9: {
          // label="房产性质:"
          this.customerHouseProperty.roomNature = getKey(value, this.popList);
          this.customerHouseProperty.roomNatureValue = value;

          break;
        }
        case 10: {
          //  label="单位性质:"
          this.customerJob.companyType = getKey(value, this.popList);
          this.customerJob.companyTypeValue = value;
          break;
        }
        case 11: {
          // label="职务:"
          this.customerJob.position = getKey(value, this.popList);
          this.customerJob.positionValue = value;
          break;
        }
        case 12: {
          // label="证件类型:"
          this.customerSpouseInfo.spouseIdType = getKey(value, this.popList);
          this.customerSpouseInfo.spouseIdTypeValue = value;
          break;
        }
      }
    },
    selectDate(date) {
      this.showDatePop = false;
      console.log(date)
      
      this.customerInfo.certificateEndDate = dateFormat(
        date,
        "yyyy-MM-dd"
      );;
    },
    showSelectAddressPop(state) {
      switch (state) {
        case 1: {
          break;
        }
      }
      this.showAddressPop = true;
    },
    showSelectDatePop(state) {
      this.showDatePop = true;
    },
    showSelectPop(state) {
      switch (state) {
        case 1: {
          //与承租人关系:
          this.popList = [
            "本人",
            "夫妻",
            "父母",
            "子女",
            "兄弟姐妹",
            "同事",
            "其他"
          ];
          break;
        }
        case 2: {
          //证件类型:
          this.popList = ["身份证", "社会统一信用代码"];
          break;
        }
        case 3: {
          // 请选择婚姻状况
          this.popList = ["未婚", "已婚", "丧偶", "离婚"];
          break;
        }
        case 4: {
          // label="职业类型:"
          this.popList = ["标准受薪", "自雇人士", "自由职业"];
          break;
        }
        case 5: {
          // label="国籍:"
          // v-model="customerInfo.nationality"
          this.popList = ["中华人民共和国"];
          break;
        }
        case 6: {
          // label="客户类型:"
          // v-model="customerInfo.customerNature"
          this.popList = ["自然人", "企业"];
          break;
        }
        case 7: {
          // label="教育程度:"
          // v-model="customerInfo.educationLevel"
          this.popList = [
            "硕士及以上",
            "本科",
            "大专",
            "高中/中专",
            "初中及以下"
          ];
          break;
        }
        case 8: {
          //  label="居住状况:"
          // v-model="customerHouseProperty.liveType"
          this.popList = ["自购无按揭", "按揭", "亲属住房", "宅基地房", "租房"];
          break;
        }
        case 9: {
          // label="房产性质:"
          // v-model="customerHouseProperty.roomNature"
          this.popList = ["自用", "出租", "空置"];
          break;
        }
        case 10: {
          //  label="单位性质:"
          // v-model="customerJob.companyType"
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
        case 11: {
          // label="职务:"
          // v-model="customerJob.position"
          this.popList = [
            "高层",
            "中层",
            "基层",
            "一般员工",
            "销售类员工",
            "操作类员工",
            "非正式员工",
            "其他",
            "无"
          ];
          break;
        }
        case 12: {
          // label="证件类型:"
          // v-model="customerSpouseInfo.spouseIdType"
          this.popList = ["身份证"];
          break;
        }
      }
      this.selectIndex = state;
      this.showPop = true;
    },
    toSub() {
      this.$router.back();
    },
    setAddress() {
      this.idCardAddress =
        this.customerInfo.idCardProvince +
        this.customerInfo.idCardCity +
        this.customerInfo.idCardArea;
      this.liveAddress =
        this.customerHouseProperty.liveProvince +
        this.customerHouseProperty.liveCity +
        this.customerHouseProperty.liveArea;
      this.roomAddress =
        this.customerHouseProperty.roomProvince +
        this.customerHouseProperty.roomCity +
        this.customerHouseProperty.roomArea;
      this.companyAddress =
        this.customerJob.companyProvince +
        this.customerJob.companyCity +
        this.customerJob.companyArea;
    }
  }
};
</script>

<style scoped>
</style>