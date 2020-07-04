<template>
  <div>
    <div>
      <div style="margin-top:20px">
        <div class="headerAndBtn">
          <div class="header">承租人信息</div>
          <div style="width:40px;margin-top:18px;" @click="showAddDanbao = true">
            <van-icon color="#ff9900" size="20px" name="add-o" />
          </div>
        </div>
        <div v-for="(item,index) in mainListData" :key="index" @click="toDetail(item)">
          <van-swipe-cell>
            <div class="listItem">
              <div class="itemL">
                <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="20" />
                <div style="margin-left:4px">{{item.customerName}}</div>
                <div>(本人)</div>
              </div>
              <div class="itemR">
                <div style="color:#ff9900">{{licenseType == "1" ? "自然人" : "企业"}}</div>
                <van-icon
                  v-if="item.saveFlag == 1"
                  color="#0066FF"
                  style="margin-left:4px"
                  name="checked"
                  size="18"
                />
                <van-icon v-else style="margin-left:4px" name="info-o" size="18" />
              </div>
            </div>
          </van-swipe-cell>
        </div>
      </div>
      <div style="margin-top:20px">
        <div class="headerAndBtn">
          <div class="header">担保人信息</div>
          <div style="width:40px;margin-top:18px;" @click="showAddDanbao = true">
            <van-icon color="#ff9900" size="20px" name="add-o" />
          </div>
        </div>
        <div v-for="(item,index) in danbaoListData" :key="index" @click="toDetail(item)">
          <van-swipe-cell>
            <div class="listItem">
              <div class="itemL">
                <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="20" />
                <div style="margin-left:4px">{{item.customerName}}</div>
                <div>(父母)</div>
              </div>
              <div class="itemR">
                <div style="color:#ff9900">{{item.licenseType == "1" ? "自然人" : "企业"}}</div>
                <van-icon
                  v-if="item.saveFlag == 1"
                  color="#0066FF"
                  style="margin-left:4px"
                  name="checked"
                  size="18"
                />
                <van-icon v-else style="margin-left:4px" name="info-o" size="18" />
              </div>
            </div>
            <template #right>
              <van-button square type="danger" text="删除" @click="delectClick(item)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <div>
      <van-popup
        v-model="showAddDanbao"
        :style="{ height: '428px', width: '90%'}"
        get-container="body"
      >
        <div >
          <div class="showAddCost_title van-hairline--bottom">添加人员信息</div>
          <div class="showAddCost_body" style="font-size:10px">
            <van-field
              readonly
              clickable
              is-link
              required
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="客户角色:"
              placeholder="请选择"
              v-model="addUserInfo.customerRoleValue"
              @click="showRole = true"
            />
            <van-field
              readonly
              clickable
              is-link
              required
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="客户类型:"
              placeholder="请选择"
              v-model="addUserInfo.customerTypeValue"
              @click="showType = true"
            />
            <van-field
              v-model="addUserInfo.customerName"
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="客户名称:"
              placeholder="请填写"
            />
            <van-field
              readonly
              clickable
              is-link
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="与承租人关系:"
              placeholder="请选择"
              v-model="addUserInfo.relationValue"
              @click="showType = true"
            />
            <van-field
              readonly
              clickable
              is-link
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="证件类型:"
              placeholder="请选择"
              v-model="addUserInfo.idTypeValue"
              @click="showType = true"
            />
            <van-field
              v-model="addUserInfo.idNum"
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="证件号码:"
              placeholder="请填写"
            />
          </div>
          <div class="showAddCost_btn van-hairline--top">
            <van-button style="width:50%" @click="showAddDanbao = false">取消</van-button>
            <van-button style="width:50%" type="info" @click="addUser">保存</van-button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { userList,addUser } from '../../request/api';
export default {
  data() {
    return {
      addUserInfo: {
        loanNumber: "",    //订单号
        customerName: "",  //名字 企业名称
        customerRole: "",  //客户角色(1-自然人 2-企业)
        customerRoleValue:"", // 自己添加的
        customerType: "", //客户类型(1=自然人，2=法人)
        customerTypeValue:'', // 自己添加的
        relation: "",  //与主借人关系
        relationValue:'', // 自己添加的
        idType: "", // 证件类型
        idTypeValue:"",// 自己添加的
        idNum: "",  //证件号码
        createdBy: "", //创建人
        createdTime: "" // 创建时间
      },
      relationList:[],
      licenseType:'', //1-私牌 2-公牌
      roleList:[],
      addName: "",
      showAddDanbao: false,
      showRole: false,
      mainListData: [{ customerName: "主借人", state: "1",saveFlag:"1",licenseType:'1'}],
      danbaoListData: [
        { customerName: "担保人1", state: "1", licenseType:'1' },
        { customerName: "担保人2", state: "1", licenseType:'2'},
        { customerName: "担保人3", state: "1", licenseType:'2' }
      ]
    };
  },
  methods: {
    toDetail(item) {
      if (item.licenseType == "1"){
        this.$router.push({
          path:'/userInfoDetail'
        })
      }else{

      }
    },
    addUser(){

    },
    delectClick(item) {
      console.log(item)
    },

  
    getUserList(){
      
      this.mainListData[0].name = "111"
      var params = Object.assign(
          {loanId:this.$store.state.loanId}
      )
      userList(params).then(res=>{
        this.licenseType = res.data.licenseType;

        for (let item in res.data.customerInfoList){
          if (item.customerRole == "1"){
            this.mainListData.push(item)
          }else{
            this.danbaoListData.push(item);
          }
        }
      });
    }
  },
  mounted() {
    this.getUserList()
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
  height: 45px;
  font-size: 14px;
  margin: 0 auto;
  box-shadow: 0px 5px 5px #ebedf0;
  margin-top: 15px;
  display: flex;
}

.itemL {
  width: 60%;
  margin: 5%;
  display: flex;
  align-items: center;
}
.itemR {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ff9900;
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
.showAddCost_title {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  font-weight: bold;
  box-shadow: 0px 1px 1px #ebedf0;
}
.showAddCost_body {
  font-size: 12px;
  font-weight: bold;
  padding: 0 10%;
}
.showAddCost_btn {
  display: flex;
  width: 100%;
  margin-top: 8px;
}
</style>