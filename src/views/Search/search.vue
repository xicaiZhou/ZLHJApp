<template>
  <div v-wechat-title='title'>
    <van-popup v-model="popupShow" position="top">
      <div class="search_form">
        <van-form alidate-first>
          <div style="position:relative" @click="showPicker = true">
            <van-field
              style="border-style: solid;border-color:#D5D5D5;border-width:1px"
              readonly
              clickable
              required
              v-model="dateTime"
              name="起止时间"
              label="起止时间:"
              placeholder="起止时间"
            />
            <div class="calendar">
              <van-icon class-prefix="my-icon" name="rili" />
            </div>
          </div>
          <van-field
            style="border-style: solid;border-color:#D5D5D5;border-width:1px;margin-top:10px"
            v-model="loanMainName"
            name="主借人姓名"
            label="主借人姓名:"
            placeholder="主借人姓名"
          />
          <van-field
            style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
            v-model="managerName"
            name="客户经理"
            label="客户经理:"
            placeholder="客户经理"
          />
          <div class="searchBtn">
            <van-button style="width:40%" block type="info" @click="toSearch">查询</van-button>
            <van-button style="width:40%"  type="info" @click="toClear">重置</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <van-calendar 
      v-model="showPicker" 
      type="range" 
      @confirm="onConfirm" 
      :min-date="minDate" 
      :max-date="maxDate"
      :show-confirm="false"
      :default-date='calendarData'
      />
    <div class="navBar">
      *所选日期:&nbsp;{{beginTime}}&nbsp;至&nbsp;{{endTime}}
      <!-- <div class="nav_icon">
        <van-icon name="search" size="25" @click="showSearch" color="#07c160" />
      </div> -->
    </div>
    
    <div class="contentBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad">
          <div class="searchContent" v-for="(item,index) in filterDetail" :key="index">
              <div class="searchBox">
                <p>
                  贷款编号:
                  <span>{{item.LOANNUMBER}}</span>
                </p>
                <p>
                  主借人姓名:
                  <span>{{item.CUSTOMERNAME}}</span>
                </p>
                <p>
                  初筛时间:
                  <span>{{item.QUERYTIME}}</span>
                </p>
                <p>
                  客户经理:
                  <span>{{item.MANAGERNAME}}</span>
                </p>
              </div>
              <div class="searchBox2">
                <p>
                  {{item.BANKNAME}}
                </p>
                <p>
                  <span>初筛{{item.DGRESULT}}</span>
                </p>
                <van-button class="resultBtn" v-if="item.DGRESULT == '通过' && (item.CREDITFLAG == 1 || item.CREDITFLAG ==2)" round block type="info" size="small" @click="decision(item)">决策详情</van-button>
                <div v-else-if="item.DGRESULT == '通过' && (item.CREDITFLAG == 0 || item.CREDITFLAG ==4)" round block type="info" size="small"></div>
                <div v-else-if="item.DGRESULT == '通过' && item.CREDITFLAG ==3 " round block type="info" size="small">资方征信拒绝</div>
                <van-button class="resultBtn" v-else-if="item.DGRESULT == '拒绝'" round block type="info" size="small" @click="getReason(item.LOANID)">拒绝原因</van-button>
              </div>
              
            </div>
        </van-list>
      </van-pull-refresh>
      <van-popup v-model="showResult" :style="{width:'80%'}"  :close-on-click-overlay='false'>
        <div class="rejectResult">
          <div class="rejectResult-title">初筛拒绝</div>
          <div style="max-height:220px;overflow-y: scroll;">
            <div class="rejectResult-tex" v-for="(item,index) in RefuseList" :key="index">
              {{item}}
            </div>
          </div>
          <van-button style="width: 80%;margin: 0 auto;margin-top:15px;" round block type="info" @click="sure()">确  定</van-button>
        </div>
      </van-popup>
    </div> 
    
     <van-tabbar route v-model="active" @change="onChange">
      <van-tabbar-item replace to="/main" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">查询</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
  </div>
</template>

<script>
import { getUrlParam } from "../../utils/common.js";
import { screenResultInfo, RefuseCause } from "../../request/api";
import { mGetDate, doHandleDate, YmdGetDate } from "../../utils/date.js";
export default {
  data () {
    return {
      title:'',
      active:1,
      refreshing:false,
      finished: false,
      filterDetail: [],
      loading: false,
      pIndex:0,
      state:1,
      popupShow:false,
      loanMainName:"",
      managerName:'',
      beginTime:'',
      endTime:'',
      dateYM:'',
      showResult:false,
      RefuseList:[],
      showPicker:false,//是否显示起止时间picker
      dateTime:'',
      minDate: new Date(2010, 0, 1),
      maxDate: YmdGetDate(),
      calendarData:''
    }
  },
  created(){
    this.title = ''
    
  },
  mounted(){
    //js与原生app交互
    window.showSearch = (res) => {
      this.popupShow = true
    }
    this.$store.commit('updateParam',getUrlParam())
    this.initDate();

  },
  methods:{
    formatDate(date) {
      var dMonth = date.getMonth()
      var dDay = date.getDate()
      if (dMonth.toString().length == 1) {
          dMonth++;
          dMonth = "0" + dMonth;
      }
      if (dDay.toString().length == 1) {
          dDay = "0" + dDay;
      }
      return `${date.getFullYear()}-${dMonth}-${dDay}`;
    },
    onConfirm(date) {
      console.log(date)
      const [start, end] = date;
      this.showPicker = false;
      this.dateTime = `${this.formatDate(start)} 至 ${this.formatDate(end)}`;
    },
    initDate(){
     //初始化起止时间
      var date = new Date();
      this.dateYM = doHandleDate();
      this.dayNum = date.getDate();
      if (this.dayNum.toString().length == 1) {
          this.dayNum = "0" + this.dayNum;
      }
      this.beginTime = this.dateYM + '-' + '01'
      this.endTime = this.dateYM +'-'+ this.dayNum
      this.dateTime = `${this.beginTime} 至 ${this.endTime}`;

      console.log(this.beginTime,this.endTime)
      //处理日历选中的默认值
      var begin = this.beginTime.split('-')
      var end = this.endTime.split('-')
      var defaultBegin = new Date(begin[0],begin[1]-1,begin[2])
      var defaultEnd = new Date(end[0],end[1]-1,end[2])
      this.calendarData = [defaultBegin,defaultEnd]
      console.log(begin,end,defaultBegin,defaultEnd)
    },
    showSearch(){
      this.popupShow = true
    },
    //查询
    toSearch() {
      this.popupShow = false;
      this.pIndex = 1;
      this.filterDetail = [];
      this.getData();

      console.log(this.dateTime)
      this.beginTime = this.dateTime.split('至')[0]
      this.endTime = this.dateTime.split('至')[1]
    },
    //重置
    toClear() {
      // window.location.reload()
      // window.location.href = document.referrer; 
      //  this.$refs.calendar.reset();
      this.popupShow = false;
      this.loanMainName = "";
      this.managerName = "";
      this.filterDetail = [];
      this.pIndex = 1;
      this.initDate();
      this.getData();

      this.beginTime = this.dateTime.split('至')[0]
      this.endTime = this.dateTime.split('至')[1]
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
      console.log("xxxxxxxxxxxxxx",this.finished)
      this.pIndex += 1;
      this.getData()
    },
    getData() {
      console.log(this.dateTime)
      console.log(this.dateTime.split('至'))
      var startTime = this.dateTime.split('至')[0]
      var endTime = this.dateTime.split('至')[1]
      if(this.finished){
        this.finished = false;
        this.loading = true;
      }
      const toast = this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      var params = Object.assign(
          {userId:this.$store.state.userId},
          {startTime:startTime},
          {endTime:endTime},
          {loanMainName:this.loanMainName},
          {managerName:this.managerName},
          {pIdx:this.pIndex},
          {pSize:10}
      )
      console.log(params)
      screenResultInfo(params).then(res => {
        toast.clear()
        console.log("res.data.data",res.data.data.list,this.refreshing,this.finished);
        let num = res.data.data.total;
        let list = res.data.data["list"];
        if (this.refreshing) {
          this.filterDetail = [];
          this.refreshing = false;
        }
        for (let i in list) {
          this.filterDetail.push(list[i]);
        }
        this.loading = false;
        console.log(this.filterDetail)
        console.log(this.filterDetail.length,num)
        if (this.filterDetail.length >= num) {
          this.finished = true;
        }
        console.log(this.finished)
      })
    },
    //查看拒绝原因
    getReason(loanId){
      this.showResult = true;
      this.refreshing = false;
      var params = Object.assign(
        {userId:this.$store.state.userId},
        {loanId:loanId},
        {systemFlag:2}
      )
      console.log(params)
      RefuseCause(params).then(res=>{
         console.log("res.data.data",res.data.data);
         this.RefuseList = res.data.data;
      })
    },
    //决策引擎
    decision(data){
      /**
       * js 跟APP交互
       * */
      var AppData = Object.assign(
        {params:data}
      );
      var u = navigator.userAgent,
        app = navigator.appVersion;
      //android终端或者uc浏览器
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      //ios终端
      var isiOS = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X)/);
      
      if(isiOS){
        window.webkit.messageHandlers.decision.postMessage(AppData);
      }else if(isAndroid){
        android.decision(JSON.stringify(AppData));
      }
      /**
       * js 跟APP交互
       * */
    },
    sure(){
      this.showResult = false;
    }
  }
}
</script>

<style scoped>
  .contentBox{
    position:absolute;
    top:44px;
    width:100%;
    background:#f3eeee;
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
  .searchBox{
    width: 60%;
  }
  .searchBox2{
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
  .nav_icon{
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 5%;
  }
  .calendar{
    position: absolute;
    right: 10px;
    top: 8px;
  }
  .navBar{
    width:92%;
    position:fixed;
    top:0px;
    z-index:999;
    height:44px;
    padding: 0 4%;
    line-height: 44px;
    background:#fff;
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
  .rejectResult-tex{
    padding: 2px 3%;
  }
  .resultBtn{
    margin-top:10px;
    width: 70%;
  }

</style>
