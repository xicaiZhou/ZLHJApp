<template>
  <div>
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
          v-model="customerInfo.relation"
          placeholder="请选择与承租人关系"
          @click="showRelation = true"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="证件类型:"
          v-model="customerInfo.idType"
          placeholder="请选择证件类型"
          @click="showIdType = true"
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
          v-model="customerInfo.isMarry"
          placeholder="请选择婚姻状况"
          @click="showIsMarry = true"
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
          v-model="customerInfo.showOccupationType"
          placeholder="请选择职业类型"
          @click="showOccupationType = true"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="国籍:"
          v-model="customerInfo.nationality"
          placeholder="请选择国籍"
          @click="showNationality = true"
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
          @click="showCertificateEndDate = true"
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
          @click="showIdCardAddress = true"
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
          v-model="customerInfo.customerNature"
          placeholder="请选择客户类型"
          @click="showCustomerNature = true"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          label="教育程度:"
          v-model="customerInfo.educationLevel"
          placeholder="请选择教育程度"
          @click="showEducationLevel = true"
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
          v-model="customerHouseProperty.liveType"
          placeholder="请选择居住状况"
          @click="showLiveType = true"
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
        <van-field
          required
          is-link
          readonly
          clickable
          label="购车目的:"
          v-model="customerAssets.buyCarPurpose"
          placeholder="请选择购车目的"
          @click="showBuyCarPurpose = true"
        />
        <van-field
          label="社保卡号:"
          v-model="customerAssets.socialSecurityNumber"
          placeholder="请填写社保卡号"
        />
      </div>
      <div>
        <div class="header">房产信息</div>
        <van-field
          is-link
          readonly
          clickable
          label="房产类别:"
          v-model="customerHouseProperty.roomType"
          placeholder="请选择房产类型"
          @click="showRoomType = true"
        />
        <van-field
          is-link
          readonly
          clickable
          label="房产性质:"
          v-model="customerHouseProperty.roomNature"
          placeholder="请选择房产性质"
          @click="showRoomNature = true"
        />
        <van-field
          is-link
          readonly
          clickable
          label="房产地址:"
          v-model="roomAddress"
          placeholder="请选择房产地址"
          @click="showIdCardAddress = true"
        />
        <van-field label="详细地址:" v-model="customerHouseProperty.roomAddress" placeholder="请填写详细地址" />

        <van-field
          label="面积(m²):"
          v-model="customerHouseProperty.roomAreas"
          placeholder="请填写房产面积"
        />
        <van-field label="房产编号:" v-model="customerHouseProperty.roomNum" placeholder="请填写房产编号" />
      </div>
    </div>
    <!-- pop -->
    <div></div>
  </div>
</template>

<script>
import { userDetailInfo, updateUser } from "../../request/api";
export default {
  data() {
    return {
      showIdType: false,
      showRelation: false,
      showIsMarry: false,
      showBirthday: false,
      showOccupationType: false,
      showNationality: false,
      showCertificateEndDate: false,
      showIdCardAddress: false,
      showCustomerNature: false,
      showEducationLevel: false,
      showLiveType: false,
      showBuyCarPurpose: false,
      showRoomType: false,
      showRoomNature: false,
      showRoomAddress: false,
      idCardAddress:
        customerInfo.idCardProvince +
        customerInfo.idCardCity +
        customerInfo.idCardArea,
      liveAddress:
        customerHouseProperty.liveProvince +
        customerHouseProperty.liveCity +
        customerHouseProperty.liveArea,
      roomAddress:
        customerHouseProperty.roomProvince +
        customerHouseProperty.roomCity +
        customerHouseProperty.roomArea,
      customerInfo: {
        customerId: "", // 客户id
        customerName: "", // 客户姓名/企业名称
        beforeName: "", // 曾用名
        loanNumber: "", // 申请编号
        customerRole: "", //角色(1-主借款人 2-配偶 3-担保人 4-共借人 6-共借人与配偶)
        customerType: "", //客户类型(1=自然人，2=法人)
        relation: "", // 与承租人关系
        sex: "", //客户性别
        idType: "", //证件类型
        idNum: "", // 证件号码
        isMarry: "", // 婚姻状况
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
      //    {
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
      customerContactPersonList: [],
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
      }
    };
  }
};
</script>

<style>
</style>