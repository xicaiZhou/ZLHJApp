<template>
  <div>
    <div>
      <div class="title">新车正审材料提交</div>
      <div class="listItem" v-for="(item,index) in mainListData" :key="index" @click="toDetail(item)">
        <div class="itemL">
          <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="20" />
          <div style="margin-left:4px">{{item.name}}</div>
        </div>
        <div class="itemR">
          <van-icon name="info-o" size="20" />
          <div style="margin-left:10px">{{item.state==1?'未开始':'进行中'}}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="title">新车正审材料提交</div>
      <div class="listItem" v-for="(item,index) in listData" :key="index" @click="toDetail(item)">
        <div class="itemL">
          <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="20" />
          <div style="margin-left:4px">{{item.name}}</div>
        </div>
        <div class="itemR">
          <van-icon name="info-o" size="20" />
          <div style="margin-left:10px">{{item.state==1?'未开始':'进行中'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            mainListData:[{}]
        }
    },
    methods:{

    },
    mounted(){

    }
};
</script>
<style scoped>
.title {
  width: 90%;
  padding: 10px 5%;
  font-size: 16px;
  margin-top: 20px;
}
.listItem {
  background: #f0f0f0;
  border: 1px solid #ebedf0;
  width: 86%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  padding: 0 2%;
  box-shadow: 0px 5px 5px #ebedf0;
  margin-top: 15px;

}
.itemL {
  width: 50%;
  float: left;
  display: flex;
  align-items: center;
}
.itemR {
  width: 30%;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.tips {
  font-size: 12px;
  padding: 0 12%;
  text-align: center;
  margin-top: 30px;
}
.subBtn {
  position: fixed;
  bottom: 20px;
  width: 90%;
  left: 5%;
}
</style>