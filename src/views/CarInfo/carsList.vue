<template>
<!-- 车系列表界面 -->
  <div>
    <div class="contentBox">
      <div v-for="(item,index) in filterDetail" :key="index">
          <div class="searchContent" @click="carSelected(item)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { CarsList } from "../../request/api";

export default {
  data() {
    return {
      refreshing: false,
      finished: false,
      filterDetail: [],
      loading: false,
      type: "", //取到来源类型
      name: "" //模糊品牌名称
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    carSelected(item) {
      this.$store.state.cars = item;
      console.log(this.$store.state.item);
      this.$router.back();
    },
    toClear() {
      this.popupShow = false;
      this.loanMainName = "";
      this.managerName = "";
      this.filterDetail = [];
      
      this.getData();
    },
    toSearch() {
      this.popupShow = false;
      
      this.filterDetail = [];
      this.getData();
    },

    getData() {
      const toast = this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });

      var params = Object.assign({ bandId: this.$store.state.carModel.id });
      console.log(params);
      CarsList(params).then(res => {
        toast.clear();
        let list = res.data.data;
        for (let i in list) {
          this.filterDetail.push(list[i]);
        }
        this.loading = false;
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/carModels") {
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
  font-size: 12px;
  background: #ffffff;
  margin-top: 0.3%;
  padding: 3%;
  height: calc(100% - 44px);
}

.search_form {
  margin: 7% 3%;
}
</style>