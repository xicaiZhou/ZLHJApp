<template>
  <div>
    <div class="header">贷款信息</div>

    <div>
      <div class="zlhjRadio" style="display:flex">
        <span class="zlhjRadio_title">业务模式：</span>
        <div class="zlhjRadio_body">
          <div
            @click="businessType = '1'"
            :class="businessType == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
          >租赁</div>
          <div
            @click="businessType = '2'"
            :class="businessType == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
          >贷款</div>
        </div>
      </div>
      <div style="padding-left:10px">
        <div class="zlhjRadioLine"></div>
      </div>
    </div>
    <van-field v-show="businessType == 1" readonly label="租赁模式:" v-model="huizu" />
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
     <div class="header">贷款信息</div>
     <van-button style="width:70px;height:30px;margin-top:10px;margin-right:10p" type="info" @click="toClear">新 加</van-button>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      businessType: "1", //业务模式
      huizu: "回租",
      hasGps: "", //是否安装GPS 1-是，2-否
      isCs: "", //是否产险推荐 1-是，2-否
      isJjk: "" // 是否聚家客推荐 1-是，2-否
    };
  }
};
</script>

<style>
</style>