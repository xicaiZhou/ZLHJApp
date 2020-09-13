<template>
  <div>
    <div>
      <div class="header">资方信息</div>
      <van-field required readonly label="选择资方:" placeholder="请选择资方" />
    </div>
    <div>
      <div class="header">征信信息</div>
      <div class="zlhjRadio" style="display:flex">
        <span class="zlhjRadio_title">征信信息：</span>
        <div class="zlhjRadio_body">
          <div
            @click="loanInfo.isSign = '1'"
            :class="loanInfo.isSign == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
          >线下授权</div>
          <div
            @click="loanInfo.isSign = '2'"
            :class="loanInfo.isSign == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
          >线上授权</div>
        </div>
      </div>
      <div>
        <van-field required readonly label="姓名:" />
        <van-field required readonly label="角色:" />
        <van-field required readonly label="类型:" />
        <van-field required readonly label="与承租人关系:" />
        <van-field required readonly label="证件类型:" />
        <van-field required readonly label="证件号:" />
        <van-field required readonly label="姓名:" />
      </div>

      <!--  线下授权 -->
      <div v-if="loanInfo.isSign == '1'">
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">征信授权书：</span>
          <div class="zlhjRadio_body" style="height:30px;">
            <van-button
              style="color:'#fff';background:#ff9900;height:30px;"
              @click="toProductInfo"
            >上传</van-button>
            <van-button
              style="color:'#fff';background:#ff9900;height:30px;"
              @click="toProductInfo"
            >查看</van-button>
          </div>
        </div>
        <div class="zlhjRadio" style="display:flex">
          <span class="zlhjRadio_title">合同：</span>
          <div class="zlhjRadio_body" style="height:30px;">
            <van-button
              style="color:'#fff';background:#ff9900;height:30px;"
              @click="toProductInfo"
            >上传</van-button>
            <van-button
              style="color:'#fff';background:#ff9900;height:30px;"
              @click="toProductInfo"
            >查看</van-button>
          </div>
        </div>
        <div>
          <div style="width:90%; margin:0 auto;display:flex;height:40px">
            <van-button
              style="flex:1; color:'#fff';background:#ff9900;height:40px;"
              @click="toProductInfo"
            >预审批申请</van-button>
            <van-button
              style="flex:1; color:'#fff';background:#ff9900;height:40px;"
              @click="toProductInfo"
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
    </div>

    <div v-show="flag == 1">
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

    <div>
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
    <div>
      <div class="header">补充信息</div>
      <van-field class="readOnly" required clickable label="承租人银行卡卡号:"></van-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      car: 2,
      flag: 1,
      loanInfo: {
        isSign: "2",
      },
    };
  },
};
</script>

<style>
</style>