<template>
  <div>
    <div class="search van-hairline--surround">
      <form action>
        <van-search
          style="text-align: left;"
          v-model="value"
          placeholder="请输入搜索关键词"
          input-align="center"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="productListBody">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div
            class="searchContent van-hairline--bottom"
            v-for="(item,index) in productList"
            :key="index"
            @click="selected(item)"
          >
            <div style="display:flex">
              <div>产品名称:</div>
              <div>{{item.name}}</div>
            </div>
            <div style="display:flex">
              <div>资方编号:</div>
              <div>{{item.financingChannelCode}}</div>
            </div>
            <div>是否打包:{{item.packFlag == 1 ? '是' : '否'}}</div>

            <div style="display:flex">
              <div style="flex:1">最小期数:{{item.minLoanTerm}} 期</div>
              <div style="flex:1">最大期数:{{item.maxLoanTerm}} 期</div>
            </div>
            <div style="display:flex">
              <div style="flex:1">最小成数:{{item.minLtv}} %</div>
              <div style="flex:1">最大成数:{{item.maxLtv}} %</div>
            </div>
            <div style="display:flex">
              <div style="flex:1">最小金额:{{item.minLoanAmount}} 元</div>
              <div style="flex:1">最大金额:{{item.maxLoanAmount}} 元</div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { productList } from "../../request/api";
export default {
  data() {
    return {
      value: "",
      refreshing: false,
      finished: false,
      loading: false,
      pageIndex: 0,
      productList: []
    };
  },
  methods: {
    onSearch() {
      this.pageIndex = 1;
      this.productList = [];
      this.getData();
    },
    onCancel() {
      this.value = "";
      this.pageIndex = 1;
      this.productList = [];
      this.getData();
    },
    selected(item) {
      this.$store.state.productItem = item;

      this.$router.back();
    },
    onRefresh() {
      this.pageIndex = 1;
      this.finished = false;
      this.loading = true;
      this.getData();
    },
    //自动加载更多
    onLoad() {
      this.pageIndex += 1;
      this.getData();
    },
    getData() {
      const toast = this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      var params = Object.assign({
        loanNumber: this.$store.state.loanNumber,
        pageIndex: this.pageIndex,
        pageSize: 10,
        financingChannelId: this.$route.params.financingChannelId,
        name: this.value
      });
      console.log("参数:", params);
      productList(params).then(res => {
        toast.clear();
        let num = res.data.data.total;
        let list = res.data.data["records"];
        if (this.refreshing) {
          this.productList = [];
          this.refreshing = false;
        }
        for (let i in list) {
          this.productList.push(list[i]);
        }
        this.loading = false;
        if (this.productList.length >= num) {
          this.finished = true;
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/selectProduct") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  }
};
</script>

<style scoped>
.search {
  margin: 0 auto;
  position: fixed;
  top: 0px;
  width: 100%;
  background: #fff;
  z-index: 10;
}
.productListBody {
  width: 95%;
  margin: 0 auto;
  margin-top: 60px;
}
.searchContent {
  font-size: 12px;
  background: #ffffff;
  margin-top: 0.3%;
  padding: 3%;
  height: calc(100% - 44px);
}
</style>