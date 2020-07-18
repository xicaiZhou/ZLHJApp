<template>
<!-- 车辆品牌列表界面 -->
  <div>
    <van-popup v-model="popupShow" position="top">
      <div class="search_form">
        <van-field
          clickable
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="name"
          label="品牌模糊:"
          placeholder="请输入关键字"
          @click="showSheet = true"
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
      <van-index-bar :index-list="indexList">
          <div v-for="(indexItem,index) in indexList" :key="index">
          <van-index-anchor :index="indexItem" />
          <div v-for="(item,index) in filterDetail" :key="index">
            <template v-if="item.initial == indexItem">
              <div class="searchContent" @click="carSelected(item)">
                {{item.name}}
              </div>
            </template>
          </div> 
        </div> 
      </van-index-bar>
     
    </div>
  </div>
</template>

<script>
import { CarModelList } from "../../request/api";

export default {
  data() {
    return {
      popupShow: false,
      showSheet: false,
      finished: false,
      filterDetail: [],
      loading: false,
      name: "", //模糊品牌名称
      indexList: [] //索引数组
    };
  },
  mounted() {
    window.showCarModelListSearch = res => {
      this.showCarModelSearch();
    };
    this.getData();
  },
  methods: {
    showCarModelSearch() {
      this.popupShow = !this.popupShow;
    },
    carSelected(item){
        this.$store.state.carModel = item;
        console.log(this.$store.state.carModel);
        this.$router.back();
    },
    
    toClear() {
      this.popupShow = false;
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
      var params = Object.assign({ bandName: this.name });
      CarModelList(params).then(res => {
        toast.clear();
        let list = res.data.data;
        this.filterDetail = [];
        for (let i in list) {
          if (this.indexList.indexOf(list[i].initial) <= -1) {
            this.indexList.push(list[i].initial);
          }
        }
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