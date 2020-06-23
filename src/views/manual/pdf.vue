<template>
  <div class="pdf" v-show="fileType === 'pdf'" v-wechat-title='title'>
    <pdf
      ref="pdf"
      :src="pdfUrl"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler">
    </pdf>

    <div class="bottom-btn" >
      <p class="arrow">
        <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
        {{currentPage}} / {{pageCount}}
        <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</span>
      </p>
      <van-button round block type="info" @click="nextStep">下载</van-button>
    </div>
  </div>

</template>

<script type='text/ecmascript-6'>
import pdf from "vue-pdf";
export default {
  components:{
      pdf
  },
  data() {
    return {
      pdfUrl:'',// pdf文件地址
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      title:''
　 } 
  },
  mounted(){
    this.title = this.$route.query.data.name
    const toast = this.$toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    this.pdfUrl = 'https://huijiefinance.net/fileManage/getFile?fileCode=5d665127117447dc82f6e6110d78d315&type=pdf';


  },
  methods:{
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage (val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },
    loadPdfHandler(e){
      this.$toast.clear();
      this.currentPage = 1 // 加载的时候先加载第一页
    },
    nextStep(){
       /**
       * js 跟APP交互
       * */
      var AppData = Object.assign(
        {loanID:''},
        {bankCode:''},
        {bankName:''},
        {orderState:''},
      );
      var u = navigator.userAgent,
        app = navigator.appVersion;
        console.log('u-----------',u)
        console.log('app------------',app)
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X)/); //ios终端
      if(isiOS){
        console.log("111")
        window.webkit.messageHandlers.deliveryClueID.postMessage(AppData);
      }else if(isAndroid){
        console.log("222")
        window.android.deliveryClueID(JSON.stringify(AppData));
      }
      /**
       * js 跟APP交互
       * */
    }
  }
};
</script>

<style scoped>
  .pdf{
    position: relative;
  }
  .bottom-btn{
    position: fixed;
    width: 80%;
    bottom: 0;
    left: 10%;
    margin: 5% auto;
  }
.arrow{
  text-align: center;
}
</style>
