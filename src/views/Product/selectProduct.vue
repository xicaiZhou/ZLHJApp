<template>
  <div style="height:100%; margin-bottom: 60px;">
    <div>
      <div>
        <div class="header">资方信息</div>
        <van-field required is-link readonly clickable label="选择资方:" placeholder="请选择资方" />
      </div>
      <div>
        <div class="header">产品信息</div>
        <van-field
          required
          is-link
          readonly
          clickable
          label="产品:"
          placeholder="请选择产品"
          @click="toSelectProduct"
        />
        <van-collapse v-model="showProductAdditionalInfo">
          <van-collapse-item title="产品附加费用项:" name="1">
            <div class="ProductAdditionalBody">
              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">产品附加费用</div>
                <div class="ProductAdditionalitem_right">金额（元）</div>
              </div>

              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">保证金</div>
                <div class="ProductAdditionalitem_right">2108.00</div>
              </div>

              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">服务费（意外险）</div>
                <div class="ProductAdditionalitem_right">1800</div>
              </div>

              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">服务费2</div>
                <div class="ProductAdditionalitem_right">0.00</div>
              </div>

              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">服务费</div>
                <div class="ProductAdditionalitem_right">0.00</div>
              </div>

              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">GPS固定成本</div>
                <div class="ProductAdditionalitem_right">1500.00</div>
              </div>

              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">信息服务费</div>
                <div class="ProductAdditionalitem_right">0.00</div>
              </div>

              <div class="ProductAdditionalitem van-hairline--surround">
                <div class="ProductAdditionalitem_left van-hairline--right">其他费用</div>
                <div class="ProductAdditionalitem_right">0.00</div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-field required is-link readonly clickable label="贴息方案:" placeholder="请选择贴息方案" />
        <van-field required clickable label="厂商贴息(元):" placeholder="请填写厂商贴息" />
        <van-field required clickable label="经销商贴息(元):" placeholder="请填写经销商贴息" />
        <div>
          <div class="zlhjRadio" style="display:flex">
            <span class="zlhjRadio_title">签署《新信息确认书》：</span>
            <div class="zlhjRadio_body">
              <div
                @click="relation = '1'"
                :class="relation == '1' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >是</div>
              <div
                @click="relation = '2'"
                :class="relation == '2' ? 'zlhjRadio_body_item_selected' : 'zlhjRadio_body_item'"
              >否</div>
            </div>
          </div>
          <div style="padding-left:10px">
            <div class="zlhjRadioLine"></div>
          </div>
        </div>
        <van-field required clickable label="是否打包:" />
        <van-field required clickable label="是否需要安装GPS:" />
        <van-field required clickable label="项目总额:" />
        <van-field required clickable label="租赁期限(月):" />
        <van-field required clickable label="首付金额(元):" />
        <van-field required clickable label="首付比例(%):" />
        <van-field required clickable label="融资金额(元):" />
        <van-field required clickable label="净融资额(元):" />
        <van-field required clickable label="租赁成熟(%):" />
        <van-field required clickable label="还款周期(元):" />
        <van-field required clickable label="每期租金(元):" />
      </div>
      <div>
        <div class="header">支付信息</div>
        <van-field required clickable label="支付方式(元):" />
        <van-field required is-link readonly clickable label="付款账户:" placeholder="请选择付款账户" />
        <van-field required clickable label="户名:" />
        <van-field required clickable label="开户银行:" />
        <van-field required clickable label="支行名称:" />
      </div>
    </div>
    <div class="subBtn">
      <van-button class="subBtn_body" block type="info" @click="toSub">保 存</van-button>
    </div>
    <div>
      <van-popup :style="{ height: '428px', width: '90%'}" get-container="body"></van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showProductAdditionalInfo: ["1"],
      relation: "1"
    };
  },
  methods: {
    toSub() {
      this.$router.back();
    },
    toSelectProduct() {
      this.$router.push({
          path:'/productList'
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  }
};
</script>

<style scoped>
.ProductAdditionalBody {
  width: 90%;
  margin: 0 auto;
  border-style: solid;
  border-color: #d5d5d5;
  border-width: 1px;
}
.ProductAdditionalitem {
  display: flex;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.ProductAdditionalitem_left {
  width: 50%;
}
.ProductAdditionalitem_right {
  width: 50%;
}
</style>