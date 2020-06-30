<template>
  <div>
    <div class="header">贷款信息</div>

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
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>