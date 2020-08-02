<template>
  <div style="min-height:10000px;">
    <div>
      <van-popup
        v-model="showfinancingChannelList"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="financingChannelList"
          @confirm="selectFinancingChannelList"
          @cancel="showfinancingChannelList = false"
        />
      </van-popup>
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
            readonly
            style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
            v-model="financingChannelValue"
            label="资方渠道:"
            placeholder="请选择资方渠道"
            @click="showfinancingChannelList = true"
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
    </div>

    <div class="contentBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div class="searchContent" v-for="(item,index) in filterDetail" :key="index">
            <div class="item">
              <div>
                业务编号:
                <span>{{item.loanNumber}}</span>
              </div>
              <div style="display:flex">
                <div style="width:50%">
                  承租人姓名:
                  <span>{{item.customerName}}</span>
                </div>
                <div>
                  资方:
                  <span>{{item.fcName}}</span>
                </div>
              </div>
              <div style="display:flex">
                <div style="width:50%">
                  申请金额:
                  <span>{{item.applyAmount}} 元</span>
                </div>
                <div>
                  申请期限:
                  <span>{{item.applyTerm}} 月</span>
                </div>
              </div>
              <div style="display:flex">
                <div style="width:50%">
                  当前期数:
                  <span>{{item.term}} 元</span>
                </div>
                <div>
                  逾期天数:
                  <span>{{item.dueDays}} 月</span>
                </div>
              </div>
              <div style="display:flex">
                <div style="width:50%">
                  应还日期:
                  <span>{{item.dueDate}}</span>
                </div>
                <div>
                  应还金额:
                  <span>{{item.totalAmount}}</span>
                </div>
              </div>
              <div style="display:flex">
                <div style="width:50%">
                  实还金额:
                  <span>{{item.repayment}}</span>
                </div>
                <div>
                  逾期金额:
                  <span>{{item.dueAmount}}</span>
                </div>
              </div>
              <div style="display:flex">
                <div style="width:50%">
                  本金:
                  <span>{{item.capital}}</span>
                </div>
                <div>
                  利息:
                  <span>{{item.compound}}</span>
                </div>
              </div>
              <div style="display:flex">
                <div style="width:50%">
                  复利:
                  <span>{{item.interest}}</span>
                </div>
                <div>
                  罚金:
                  <span>{{item.penalty}}</span>
                </div>
              </div>
            </div>
            <!-- <div>
              <div class="line"></div>
              <div class="edit">
                <div style="flex:1;">
                  <div style="margin-top:5px">本金</div>
                  <div style="margin-top:5px">{{item.capital}}</div>
                </div>
                <div style="flex:1;">
                  <div style="margin-top:5px">利息</div>
                  <div style="margin-top:5px">{{item.interest}}</div>
                </div>
                <div style="flex:1;">
                  <div style="margin-top:5px">复利</div>
                  <div style="margin-top:5px">{{item.compound}}</div>
                </div>
                <div style="flex:1;">
                  <div style="margin-top:5px">罚金</div>
                  <div style="margin-top:5px">{{item.penalty}}</div>
                </div>
              </div>
            </div>-->
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { overdueList, financingChannelList } from "../../request/api";
export default {
  data() {
    return {
      refreshing: false,
      finished: false,
      filterDetail: [],
      zfList: [],
      loading: false,
      pIndex: 0,
      popupShow: true,
      // 条件
      loanNumber: "", // 申请编号 业务主键
      customerName: "", //客户名称
      financingChannel: "", //资方
      financingChannelValue: "", //资方
      dealerName: "", // 经销商名称
      type: "", // 查询类型
      showfinancingChannelList: false,
      loanStatusValue: " 全部",
      financingChannelList: []
    };
  },

  mounted() {
    //js与原生app交互  //原生掉JS
    window.showoverdueListSearch = res => {
      this.showSearch();
    };
    financingChannelList().then(res => {
      console.log("资方列表：", res);
      this.zfList = res.data.data;
      for (let index in this.zfList) {
        this.financingChannelList.push(this.zfList[index].name);
      }
    });
  },
  methods: {
    selectFinancingChannelList(val) {
        this.financingChannelValue = val
        this.showfinancingChannelList = false
        for (let index in this.zfList){
            console.log(this.zfList[index].name)
            if(val == this.zfList[index].name){
                this.financingChannel = this.zfList[index].id
                break;
            }
        }
    },
    getValue() {},
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
      this.loanNumber = ""; // 申请编号 业务主键
      this.customerName = ""; //客户名称
      this.dealerName = ""; // 经销商名称
      this.financingChannel = ""; //资方
      this.financingChannelValue = ""; //资方
      this.filterDetail = [];
      this.pIndex = 1;
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
        dealerName: this.dealerName,
        financingChannel: this.financingChannel,
        pageIndex: this.pIndex,
        pageSize: 10
      };
      console.log(params);
      overdueList(params).then(res => {
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
  background: #fff;
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

.search_form {
  margin: 7% 3%;
}
.searchBtn {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
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
  text-align: center;
  height: 50px;
}
</style>