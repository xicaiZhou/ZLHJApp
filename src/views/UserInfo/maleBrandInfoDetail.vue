<template>
  
</template>

<script>
import {userDetailInfo, updateUser} from '../../request/api'
export default {
  data() {
    return {
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
}
</script>

<style>

</style>