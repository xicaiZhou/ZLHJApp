<template>
  <div>
    <van-popup v-model="popupShow" position="top">
      <div class="search_form">
        <van-field
          readonly
          clickable
          is-link
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="type"
          label="渠道来源类型:"
          placeholder="取到来源类型"
          @click="showSheet = true"
        />
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px;margin-top:10px"
          v-model="name"
          label="渠道名称:"
          placeholder="渠道名称"
        />
        <div class="searchBtn">
          <van-button style="width:40%" block type="info" @click="toSearch">查询</van-button>
          <van-button style="width:40%" type="info" @click="toClear">重置</van-button>
        </div>
      </div>
    </van-popup>
    <div class="nav_icon">
      <van-icon name="search" size="25" @click="showExhibitionSearch" color="#07c160" />
    </div>

    <div class="contentBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div class="searchContent"  v-for="(item,index) in filterDetail" :key="index" @click="exhibitionSelected(item)">
            <div class="searchBox">
              {{item.name}}
            </div>
            <div style="width:20%">{{item.type == 1 ? "展厅" : "经销商"}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { network } from "../../request/api";

export default {
  data() {
    return {
      popupShow: false,
      showSheet:false,
      refreshing: false,
      finished: false,
      filterDetail: [],
      loading: false,
      type:'',//取到来源类型
      name:'',//渠道名称
      pIndex: 0,
    };
  },
  mounted() {
    window.showExhibitionSearch = res => {
      showExhibitionSearch();
    };
  },
  methods: {
    showExhibitionSearch() {
      console.log("zoule");
      this.popupShow = true;
    },
    exhibitionSelected(item){
      this.$store.state.exhibition = item;
      this.$router.back();
    },
    //展示放大镜
    showSearchIcon() {
      /**
       * js 跟APP交互
       * */
      var AppData = Object.assign({ type: "exhibition" });
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X)/); //ios终端
      if (isiOS) {
        window.webkit.messageHandlers.showSearchIcon.postMessage(AppData);
      } else if (isAndroid) {
        android.showSearchIcon(JSON.stringify(AppData));
      }
    },
    toClear() {
           this.popupShow = false;
      this.loanMainName = "";
      this.managerName = "";
      this.filterDetail = [];
      this.pIndex = 1;
      this.getData();
    },
    toSearch() {
      this.popupShow = false;
      this.pIndex = 1;
      this.filterDetail = [];
      this.getData();

    },
     //刷新
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
    getData() {

      if (this.finished) {
        this.finished = false;
        this.loading = true;
      }
      const toast = this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      var params = Object.assign(
        
        { pageIndex: this.pIndex },
        { pageSize: 10 }
      );
      console.log(params);
      network(params).then(res => {
        toast.clear();
        let num = res.data.data.total;
        let list = res.data.data["records"];
        if (this.refreshing) {
          this.filterDetail = [];
          this.refreshing = false;
        }
        for (let i in list) {
          this.filterDetail.push(list[i]);
        }
        this.loading = false;
        console.log(this.filterDetail);
        console.log(this.filterDetail.length, num);
        if (this.filterDetail.length >= num) {
          this.finished = true;
        }
        console.log(this.finished);
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/carInfo") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  }
};
</script>

<style scoped>
.searchBtn {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
.nav_icon {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 5%;
}
.contentBox {
  position: absolute;
  top: 44px;
  width: 100%;
  background: #f3eeee;
}
.searchContent {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  background: #ffffff;
  margin-top: 3%;
  padding: 3%;
  height: calc(100% - 44px);
}
.searchBox {
  width: 80%;
}
.search_form {
  margin: 7% 3%;
}
</style>