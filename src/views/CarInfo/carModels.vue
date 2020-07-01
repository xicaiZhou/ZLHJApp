<template>
  <div>
    <van-popup v-model="popupShow" position="top">
      <div class="search_form">
        <van-field
          readonly
          clickable
          is-link
          style="border-style: solid;border-color:#D5D5D5;border-width:1px;margin-top:10px"
          v-model="carModel.name"
          label="品牌选择:"
          placeholder="请选择品牌"
          @click="selectCarModel"
        />
        <van-field
          readonly
          clickable
          is-link
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="cars.name"
          label="车系选:"
          placeholder="请选择车系"
          @click="selectCars"
        />
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="carModelName"
          label="车型模糊:"
          placeholder="请填写车型"
          @click="selectCars"
        />
        <van-field
          readonly
          clickable
          is-link
          style="border-style: solid;border-color:#D5D5D5;border-width:1px;margin-top:10px"
          v-model="year"
          label="年份:"
          placeholder="请选择年份"
          @click="showDate=true"
        />

        <div class="searchBtn">
          <van-button style="width:40%" block type="info" @click="toSearch">查询</van-button>
          <van-button style="width:40%" type="info" @click="toClear">重置</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="showDate"
      position="bottom"
      :style="{ height: '300px', width: '100%'}"
      get-container="body">
      <van-picker
        title="选择年份"
        show-toolbar
        :columns="yearList"
        @confirm="selectYear"
        @cancel="showDate=false"
      />
    </van-popup>

    <div class="nav_icon">
      <van-icon name="search" size="25" @click="showCarModelSearch" color="#07c160" />
    </div>

    <div class="contentBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div class="searchContent" v-for="(item,index) in filterDetail" :key="index" @click="carInfoSelect(item)">
            <div class="searchBox">{{item.name}}</div>
            <div style="width:20%; text-align:right;">{{item.year}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { CarModelSearch } from "../../request/api";
import { getYearList } from "../../utils/date";
export default {
  data() {
    return {
      popupShow: false,
      showSheet: false,
      refreshing: false,
      finished: false,
      showDate: false,
      yearList: [],
      filterDetail: [],
      loading: false,
      pIndex: 0,
      state: 1,
      indexList: [], //索引数组
      year: "",
      carModel: {},
      cars: {},
      carModelName:''
    };
  },
  mounted() {
    window.showCarModelSearch = res => {
      showCarModelSearch();
    };
    this.yearList = getYearList(30);
  },
  watch: {
    "$store.state.carModel": {
      deep: true,
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.carModel = newValue;
      }
    },
    "$store.state.cars": {
      deep: true,
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.cars = newValue;
      }
    }
  },
  methods: {
    showCarModelSearch() {
      this.popupShow = true;
    },
    carInfoSelect(item){
        this.$store.state.carInfo = item;
        this.$router.back();
    },
    selectYear(value) {
      this.year = value;
      this.showDate = false;
    },
    selectCarModel() {
      this.$router.push({
        path: "/carModelList"
      });
    },
    selectCars() {
      if (this.carModel.name == "") {
        this.$toast.fail("请先选择品牌");
      } else {
        this.$router.push({
          path: "/carsList"
        });
      }
    },
    //展示放大镜
    showSearchIcon() {
      /**
       * js 跟APP交互
       * */
      var AppData = Object.assign({ type: "carModel" });
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
      this.year = ""
      this.$store.state.carModel = {};
      this.$store.state.cars = {};
      this.filterDetail = [];
      this.pIndex = 1;
      this.getData();
    },
    toSearch() {
      this.popupShow = false;
      this.pIndex = 1;
      this.filterDetail = [];
      this.getData();
    
    this.finished = false;
    this.loading = true;
 
    },
    //刷新
    onRefresh() {
        console.log("刷新")
      this.pIndex = 1;
      this.finished = false;
      this.loading = true;
      this.getData();
    },
    //自动加载更多
    onLoad() {
     console.log("自动加载更多")
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
      var params = Object.assign({brandId:this.carModel.id},{seriesId:this.cars.id},{year:this.year},{carModel:this.carModelName},{ pageIndex: this.pIndex }, { pageSize: 10 });
      console.log(params);
      CarModelSearch(params).then(res => {
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
        console.log(this.filterDetail.length);
      });
    }
  },
  beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
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