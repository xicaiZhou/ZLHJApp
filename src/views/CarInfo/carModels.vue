<template>
  <!-- 车型选择界面 -->
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
        />
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px;margin-top:10px"
          v-model="year"
          label="年份:"
          placeholder="请填写年份"
        />
        <div class="searchBtn">
          <van-button style="width:40%" block type="info" @click="toSearch">查询</van-button>
          <van-button style="width:40%" type="info" @click="toClear">重置</van-button>
        </div>
      </div>
    </van-popup>

    <div class="nav_icon">
      <van-icon name="search" size="25" @click="showCarModelSearch" color="#07c160" />
    </div>

    <div class="contentBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div
            class="searchContent"
            v-for="(item,index) in filterDetail"
            :key="index"
            @click="carInfoSelect(item)"
          >
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
      filterDetail: [],
      loading: false,
      pIndex: 0,
      state: 1,
      indexList: [], //索引数组
      year: "",
      carModel: {},
      cars: {},
      carModelName: ""
    };
  },

  mounted() {
    window.showCarModelSearch = res => {
      this.showCarModelSearch();
    };
  },
  watch: {
    "$store.state.isloadCarModels": {
      deep: false,
      handler: function(newValue, oldValue) {
        if (newValue) {
          this.toClear();
        }
      }
    },
    "$store.state.carModel": {
      deep: true,
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.carModel = newValue;
        this.$store.state.cars = {}
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
      this.popupShow = !this.popupShow;
    },
    carInfoSelect(item) {
      this.$store.state.carInfo = item;
      this.$router.back();
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
    toClear() {
      this.popupShow = false;
      this.year = "";
      this.$store.state.carModel = {};
      this.$store.state.cars = {};
      this.carModel.id = "";
      this.cars.id = "";
      this.carModelName = "";
      this.filterDetail = [];
      this.pIndex = 1;
      this.finished = false;
      this.loading = true;
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
      console.log("刷新");
      this.pIndex = 1;
      this.finished = false;
      this.loading = true;
      this.getData();
    },
    //自动加载更多
    onLoad() {
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
        { brandId: this.carModel.id },
        { seriesId: this.cars.id },
        { year: this.year },
        { carModel: this.carModelName },
        { pageIndex: this.pIndex },
        { pageSize: 10 }
      );
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
    from.meta.keepAlive = true;
    if (to.path == "/carInfo") {
      this.popupShow = false;
      this.year = "";
      this.$store.state.carModel = {};
      this.$store.state.cars = {};
      this.carModel.id = "";
      this.cars.id = "";
      this.carModelName = "";
      this.filterDetail = [];
      this.$store.state.isloadCarModels = false;
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
  top: 0px;
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