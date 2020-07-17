<template>
  <div>
    <div class="contentBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div class="searchContent" v-for="(item,index) in filterDetail" :key="index">
            <div>
              业务编号:
              <span>{{item.loanNumber}}</span>
            </div>
            <div>
              合同编号:
              <span>{{item.contractNumber}}</span>
            </div>
            <div style="display:flex">
              <div style="width:50%">
                承租人姓名:
                <span>{{item.customerName}}</span>
              </div>
              <div>
                证件号码:
                <span>{{item.credentialNumber}}</span>
              </div>
            </div>
            <div style="display:flex">
              <div style="width:50%">
                融资金额:
                <span>{{item.applyAmount}} 元</span>
              </div>
              <div>
                融资期限:
                <span>{{item.applyTerm}} 月</span>
              </div>
            </div>

            <div>
              资方:
              <span>{{item.fcName}}</span>
            </div>
            <div>
              产品名称:
              <span>{{item.productName}}</span>
            </div>
            <div>
              展厅:
              <span>{{item.dealerName}}</span>
            </div>
            <div style="display:flex">
              <div style="width:50%">
                业务模式:
                <span>{{item.businessModel}}</span>
              </div>
              <div>
                业务类型:
                <span>{{item.businessType}}</span>
              </div>
            </div>
            <div style="display:flex">
              <div style="width:50%">
                提交日期:
                <span>{{item.firstSubmitDate}}</span>
              </div>
              <div>
                贷款状态:
                <span>{{item.loanStatus}}</span>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-tabbar route v-model="active">
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">查询</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { searchInfo } from "../../request/api";
import { getUrlParam } from "../../utils/common.js";
export default {
  data() {
    return {
      title: "",
      active: 1,
      refreshing: false,
      finished: false,
      filterDetail: [],
      loading: false,
      pIndex: 0,
      state: 1
    };
  },
  created() {
    this.title = "";
  },
  mounted() {
    //js与原生app交互  //原生掉JS
    window.showSearch = res => {
      this.popupShow = true;
    };
  },
  methods: {
    showSearch() {
      this.popupShow = true;
    },
    //查询
    toSearch() {
      this.popupShow = false;
      this.pIndex = 1;
      this.filterDetail = [];
      this.getData();
    },
    //重置
    toClear() {
      this.popupShow = false;
      this.loanMainName = "";
      this.managerName = "";
      this.filterDetail = [];
      this.pIndex = 1;
      this.initDate();
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
      this.pIndex += 1;
      this.getData();
    },
    getData() {
      if (this.finished) {
        this.finished = false;
        this.loading = true;
      }
      var params = {
        loanNumber: "",
        pageIndex: this.pIndex,
        customerName: "",
        pageSize: 10,
        credentialNumber: "",
        keyword: "",
        customerMobileNumber: "",
        loanStatus: "",
        dealerName: ""
      };
      console.log(params);
      searchInfo(params).then(res => {
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
    },
    sure() {
      this.showResult = false;
    }
  }
};
</script>

<style scoped>
.contentBox {
  position: absolute;
  top: 44px;
  width: 100%;
  background: #f3eeee;
}
.searchContent {
  width: 90%;
  margin: 0 auto;

  font-size: 12px;
  background: #ffffff;
  margin-top: 3%;
  padding: 3%;
  height: calc(100% - 44px);
}
.searchBox {
  width: 60%;
}
.searchBox2 {
  width: 40%;
}
.item-icon {
  margin-top: -1px;
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
.search_form {
  margin: 7% 3%;
}
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
.calendar {
  position: absolute;
  right: 10px;
  top: 8px;
}
.navBar {
  width: 92%;
  position: fixed;
  top: 0px;
  z-index: 999;
  height: 44px;
  padding: 0 4%;
  line-height: 44px;
  background: #fff;
  color: rgb(255, 0, 51);
}
.rejectResult {
  /* margin-top: 10px; */
  padding: 16px;
  font-size: 12px;
}
.rejectResult-title {
  font-size: 18px;
  font-weight: bold;
  padding: 4px 0;
}
.rejectResult-tex {
  padding: 2px 3%;
}
.resultBtn {
  margin-top: 10px;
  width: 70%;
}
</style>
