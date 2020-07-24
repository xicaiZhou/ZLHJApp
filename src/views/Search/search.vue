<template>
  <div>
    <van-popup v-model="popupShow" position="top">
      <div class="search_form">
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="loanNumber"
          label="业务编号:"
          placeholder="请填写业务编号"
        />
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="customerName"
          label="承租人姓名:"
          placeholder="请填写姓名"
        />
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="credentialNumber"
          label="承租人证件号码:"
          placeholder="请填写证件号码"
        />
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="customerMobileNumber"
          label="承租人手机号码:"
          placeholder="请填写手机号码"
        />
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="carModelName"
          label="业务状态:"
          placeholder="请选择业务状态"
          @click="showLoanStatus = true"
        />
        <van-field
          style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
          v-model="dealerName"
          label="展厅名称:"
          placeholder="请填写展厅名称"
        />
        <div class="searchBtn">
          <van-button style="width:40%" block type="info" @click="toSearch">查询</van-button>
          <van-button style="width:40%" type="info" @click="toClear">重置</van-button>
        </div>
      </div>
    </van-popup>
    <div class="contentBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div
            class="searchContent"
            v-for="(item,index) in filterDetail"
            :key="index"
          >
            <div class="item">
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
                  <span>{{getStatue(item.loanStatus)}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="line"></div>
              <div class="edit">
                <van-button
                  v-if="item.loanStatus > 0 || item.loanStatus < 110"
                  style="flex:1"
                  @click="toDetail(item)"
                >操作</van-button>
                <van-button v-else style="flex:1">-</van-button>

                <van-button
                  v-if="(item.loanStatus > 0 || item.loanStatus < 110) && item.isReturn == '1'"
                  style="flex:1"
                  @click="two"
                >退回原因</van-button>
                <van-button v-else style="flex:1">-</van-button>

                <van-button
                  v-if="item.loanStatus >= -150 && item.loanStatus <= -110"
                  style="flex:1"
                  @click="three"
                >拒绝原因</van-button>
                <van-button v-else style="flex:1">-</van-button>
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
import { searchInfo, codeList } from "../../request/api";
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
      statusCodeList: [],
      popupShow: false,
      // 条件
      loanNumber: "", // 申请编号 业务主键
      customerName: "", //客户名称
      credentialNumber: "", //证件号码
      keyword: "", // 搜索字符串
      customerMobileNumber: "", // 客户手机号
      loanStatus: "", // 贷款状态 数据字典-贷款状态
      dealerName: "", // 经销商名称
      type: "", // 查询类型
      showLoanStatus: false,
      loanStatusList: ["全部", "待审批", "待资方审批"]
    };
  },
  created() {
    this.title = "";
  },
  mounted() {
    //js与原生app交互  //原生掉JS
    window.showCarLoanListSearch = res => {
      this.showSearch();
    };
    codeList({ codeType: "node" }).then(res => {
      this.statusCodeList = res.data.data;
    });
  },
  methods: {
    getValue(loanStatus) {},
    getStatue(status) {
      for (let i in this.statusCodeList) {
        if (status == this.statusCodeList[i].codeKey) {
          return this.statusCodeList[i].codeValue;
          break;
        }
      }
    },
    showSearch() {
      this.popupShow = !this.popupShow;
    },
    toDetail(item) {
      this.$store.state.loanNumber = item.loanNumber;
      this.$router.push({
        path: "/menu"
      });
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
        loanNumber: this.loanNumber,
        customerName: this.customerName,
        credentialNumber: this.credentialNumber,
        customerMobileNumber: this.customerMobileNumber,
        loanStatus: this.loanStatus,
        dealerName: this.dealerName,
        pageIndex: this.pIndex,
        pageSize: 10,
        keyword: ""
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
  top: 0px;
  width: 100%;
  background: #f3eeee;
}
.searchContent {
  width: 90%;
  margin: 0 auto;
  font-size: 12px;
  background: #ffffff;
  height: calc(100% - 44px);
}
.item {
  margin-top: 3%;
  padding: 3%;
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
.line {
  margin-top: 5px;
  height: 1px;
  width: 100%;
  background: #ff9900;
}

span {
  color: #333333;
}
.edit {
  display: flex;
}
</style>
