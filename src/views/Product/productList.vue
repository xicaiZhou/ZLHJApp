<template>
  <div>
    <div class="search van-hairline--surround">
      <van-search
        style="text-align: left;"
        v-model="value"
        placeholder="请输入搜索关键词"
        input-align="center"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="productListBody">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div
            class="searchContent van-hairline--bottom"
            v-for="(item,index) in productList"
            :key="index"
            @click="selected(item)"
          >{{item}}</div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      refreshing: false,
      finished: false,
      loading: false,
      pIndex: 0,
      state: 1,
      productList: [
        "产品1",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2",
        "产品2"
      ]
    };
  },
  methods: {
    onSearch() {},
    onCancel() {},
    selected(item) {
      this.$router.back();
    },
    onRefresh() {
      this.pIndex = 1;
      this.finished = false;
      this.loading = true;
      this.getData();
    },
    //自动加载更多
    onLoad() {
      console.log("xxxxxxxxxxxxxx", this.finished);
      this.pIndex += 1;
      this.getData();
    },
    getData() {}
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