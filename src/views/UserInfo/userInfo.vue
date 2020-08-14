<template>
  <div style="height:100%; margin-bottom: 60px;">
    <div>
      <div style="margin-top:20px">
        <div class="headerAndBtn">
          <div class="header">承租人信息</div>
          <div
            style="width:40px;margin-top:18px;"
            @click="addMainUser()"
            v-show="(loanStatus >= 0 && loanStatus < 60)"
          >
            <van-icon color="#ff9900" size="20px" name="add-o" />
          </div>
        </div>
        <div v-for="(item,index) in mainListData" :key="index" @click="toDetail(item)">
          <van-swipe-cell>
            <div class="listItem">
              <div class="itemL">
                <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="20" />
                <div style="margin-left:4px">{{item.customerName}}</div>
                <div style="margin-left:20px">{{item.relationValue}}</div>
              </div>
              <div class="itemR">
                <div>{{item.customerType == "1" ? "自然人" : "企业"}}</div>
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
            <template #right v-if="(loanStatus >= 0 && loanStatus < 60)">
              <van-button square type="danger" text="删除" @click="delectClick(item)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
      <div style="margin-top:20px">
        <div class="headerAndBtn">
          <div class="header">担保人信息</div>
          <div
            style="width:40px;margin-top:18px;"
            @click="addDanBaoUser()"
            v-show="(loanStatus >= 0 && loanStatus < 60)"
          >
            <van-icon color="#ff9900" size="20px" name="add-o" />
          </div>
        </div>
        <div v-for="(item,index) in danbaoListData" :key="index" @click="toDetail(item)">
          <van-swipe-cell>
            <div class="listItem">
              <div class="itemL">
                <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="20" />
                <div style="margin-left:4px">{{item.customerName}}</div>
                <div style="margin-left:20px">{{item.relationValue}}</div>
              </div>
              <div class="itemR">
                <div>{{item.customerType == "1" ? "自然人" : "企业"}}</div>
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
            <template #right v-if="(loanStatus >= 0 && loanStatus < 60)">
              <van-button square type="danger" text="删除" @click="delectClick(item)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <div>
      <van-popup
        v-model="showAddUser"
        :style="{ height: '452px', width: '93%'}"
        get-container="body"
      >
        <div>
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
              @click="showCustomerTypeAction"
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
              @click="showSelectRelation"
            />
            <van-field
              readonly
              clickable
              is-link
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="证件类型:"
              placeholder="请选择"
              v-model="addUserInfo.idTypeValue"
              @click="popIdType"
            />
            <van-field
              v-model="addUserInfo.idNum"
              style="border-style: solid;border-color:#D5D5D5;border-width:1px; margin-top:10px"
              label="证件号码:"
              placeholder="请填写"
            />
          </div>
          <div class="showAddCost_btn van-hairline--top">
            <van-button style="width:50%" @click="showAddUser = false">取消</van-button>
            <van-button style="width:50%" type="info" @click="addUserAction">保存</van-button>
          </div>
        </div>
      </van-popup>
      <van-popup
        v-model="showRole"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="isMainUser? ['承租人'] : ['担保人']"
          @confirm="selectRole"
          @cancel="showRole=false"
        />
      </van-popup>
      <van-popup
        v-model="showCustomerType"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="customerList"
          @confirm="selectCustomerType"
          @cancel="showCustomerType = false"
        />
      </van-popup>
      <van-popup
        v-model="showRelation"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="relationList"
          @confirm="selectRelation"
          @cancel="showRelation=false"
        />
      </van-popup>

      <van-popup
        v-model="showIdType"
        position="bottom"
        :style="{ height: '300px', width: '100%'}"
        get-container="body"
      >
        <van-picker
          title
          show-toolbar
          :columns="idTypeList"
          @confirm="selectIdType"
          @cancel="showIdType=false"
        />
      </van-popup>
    </div>
    <div class="subBtn" v-show="(loanStatus >= 0 && loanStatus < 60)">
      <van-button class="subBtn_body" block type="info" @click="toSub">保 存</van-button>
    </div>
  </div>
</template>

<script>
import { userList, addUser, delUser, updateStatus } from "../../request/api";
import { idNumValidator } from "../../utils/common";
export default {
  data() {
    return {
      loanStatus: this.$store.state.loanStatus,
      addUserInfo: {
        loanNumber: this.$store.state.loanNumber, //订单号
        customerName: "", //名字 企业名称
        customerRole: "", //客户角色(1-承租人 3-担保人)
        customerRoleValue: "", // 自己添加的
        customerType: "", //客户类型(1=自然人，2=法人)
        customerTypeValue: "", // 自己添加的
        relation: "", //与主借人关系
        relationValue: "", // 自己添加的
        idType: "", // 证件类型
        idTypeValue: "", // 自己添加的
        idNum: "", //证件号码
        createdBy: "APP", //创建人
        createdTime: new Date() // 创建时间
      },
      isMainUser: false,
      licenseType: "", //1-私牌 2-公牌
      customerList: [],
      addName: "",
      showAddUser: false,
      showRole: false,
      showRelation: false,
      relationList: [],
      showCustomerType: false,
      showIdType: false,
      idTypeList: [],
      mainListData: [],
      danbaoListData: []
    };
  },
  watch: {
    showAddUser: {
      deep: true,
      handler: function(newValue, oldValue) {
        if (!newValue) {
          console.log("来了");
          this.addUserInfo = {
            loanNumber: this.$store.state.loanNumber, //订单号
            customerName: "", //名字 企业名称
            customerRole: "", //客户角色(1-承租人 3-担保人)
            customerRoleValue: "", // 自己添加的
            customerType: "", //客户类型(1=自然人，2=法人)
            customerTypeValue: "", // 自己添加的
            relation: "", //与主借人关系
            relationValue: "", // 自己添加的
            idType: "", // 证件类型
            idTypeValue: "", // 自己添加的
            idNum: "", //证件号码
            createdBy: "APP", //创建人
            createdTime: new Date() // 创建时间
          };
        }
      }
    }
  },
  methods: {
    addMainUser() {
      this.showAddUser = true;
      this.isMainUser = true;
      this.addUserInfo.customerRole = "1"; //客户角色(1-承租人 3-担保人)
      this.addUserInfo.customerRoleValue = "承租人";
      this.addUserInfo.relation = "1"; //与主借人关系
      this.addUserInfo.relationValue = "本人"; // 自己添加的
    },
    addDanBaoUser() {
      this.showAddUser = true;
      this.isMainUser = false;
      this.addUserInfo.customerRole = "3"; //客户角色(1-承租人 3-担保人)
      this.addUserInfo.customerRoleValue = "担保人";
      this.addUserInfo.relation = ""; //与主借人关系
      this.addUserInfo.relationValue = ""; // 自己添加的
    },
    popIdType() {
      if (this.addUserInfo.customerType == "") {
        this.$toast.fail("请先选择客户类型");
        return;
      }
      if (this.addUserInfo.customerType == "1") {
        this.idTypeList = ["身份证"];
      } else {
        this.idTypeList = ["社会统一信用代码"];
      }
      this.showIdType = true;
    },
    showSelectRelation() {
      if (this.isMainUser) {
        this.relationList = ["本人"];
      } else {
        console.log(this.addUserInfo.customerType);
        if (
          this.addUserInfo.customerType == "" ||
          this.addUserInfo.customerRole == ""
        ) {
          this.$toast.fail("请先填写必填项");
          return;
        }
        if (this.addUserInfo.customerType == "1") {
          this.relationList = [
            "夫妻",
            "父母",
            "子女",
            "兄弟姐妹",
            "同事",
            "其他"
          ];
        } else {
          this.relationList = ["法人", "实际使用人", "股东", "高管", "其他"];
        }
      }

      this.showRelation = true;
    },
    toDetail(item) {
      if (item.customerType == "1") {
        this.$router.push({
          name: "userInfoDetail",
          params: {
            customerId: item.customerId
          }
        });
      } else {
        this.$router.push({
          name: "maleBrandInfoDetail",
          params: {
            customerId: item.customerId
          }
        });
      }
    },
    toSub() {
      if (this.mainListData.length == 0) {
        this.$toast.fail("请添加承接人");
        return;
      }
      const toast = this.$toast.loading({
        duration: 0,
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      updateStatus({
        loanNumber: this.$store.state.loanNumber,
        loanStatus: "30"
      }).then(res => {
        toast.clear();
        this.$router.back();
      });
    },
    showCustomerTypeAction() {
      if (this.isMainUser) {
        if (this.licenseType == "1") {
          this.customerList = ["自然人"];
        } else {
          //当拍照类型为公牌时
          this.customerList = ["自然人", "企业"];
        }
      } else {
        this.customerList = ["自然人", "企业"];
      }
      this.showCustomerType = true;
    },
    selectIdType(val) {
      this.addUserInfo.idTypeValue = val;
      if (val == "身份证") {
        this.addUserInfo.idType = "1";
      } else {
        this.addUserInfo.idType = "2";
      }
      this.showIdType = false;
    },
    selectRole(val) {
      this.addUserInfo.customerType = ""; //客户类型(1=自然人，2=企业)
      this.addUserInfo.customerTypeValue = ""; // 自己添加的
      this.addUserInfo.relation = ""; //与主借人关系
      this.addUserInfo.relationValue = ""; // 自己添加的
      this.addUserInfo.idType = ""; // 证件类型
      this.addUserInfo.idTypeValue = ""; // 自己添加的
      this.addUserInfo.idNum = ""; //证件号码
      // 1-承借人 3-担保人
      if (val == "承租人") {
        this.addUserInfo.customerRoleValue = val;
        this.addUserInfo.customerRole = "1";
        this.addUserInfo.relationValue = "本人";
        this.addUserInfo.relation = "1";
      } else {
        //担保人
        this.addUserInfo.customerRoleValue = val;
        this.addUserInfo.customerRole = "3";
      }
      this.showRole = false;
    },

    selectRelation(val) {
      console.log(val);
      if (this.addUserInfo.customerType == "1") {
        // 1-本人 2-夫妻 3-父母 4-子女 5-兄弟姐妹 6-同事 7-其他
        if (val == "本人") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "1";
        } else if (val == "夫妻") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "2";
        } else if (val == "父母") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "3";
        } else if (val == "子女") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "4";
        } else if (val == "兄弟姐妹") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "5";
        } else if (val == "同事") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "6";
        } else if (val == "其他") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "7";
        }
      } else {
        // ["法人", "实际使用人", "股东", "高管", "其他"];
        if (val == "本人") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "1";
        } else if (val == "法人") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "2";
        } else if (val == "实际使用人") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "3";
        } else if (val == "股东") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "4";
        } else if (val == "高管") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "5";
        } else if (val == "其他") {
          this.addUserInfo.relationValue = val;
          this.addUserInfo.relation = "6";
        }
      }

      this.showRelation = false;
    },
    selectCustomerType(val) {
      // 1-自然人 2-企业
      this.addUserInfo.idType = ""; // 证件类型
      this.addUserInfo.idTypeValue = ""; // 自己添加的
      this.addUserInfo.idNum = ""; //证件号码
      if (val == "自然人") {
        this.addUserInfo.customerTypeValue = val;
        this.addUserInfo.customerType = "1";
        this.addUserInfo.idType = "1"; // 证件类型
        this.addUserInfo.idTypeValue = "身份证"; // 自己添加的
      } else {
        this.addUserInfo.customerTypeValue = val;
        this.addUserInfo.customerType = "2";
        this.addUserInfo.idType = "2"; // 证件类型
        this.addUserInfo.idTypeValue = "社会统一信用代码"; // 自己添加的
      }
      this.showCustomerType = false;
    },
    addUserAction() {
      if (
        this.addUserInfo.customerRole == "" ||
        this.addUserInfo.customerType == ""
      ) {
        this.$toast.fail("请将必填项填写完整");
        return;
      }
      if (this.addUserInfo.idType == "1") {
        if (
          this.addUserInfo.idNum.length > 0 &&
          !idNumValidator(this.addUserInfo.idNum)
        ) {
          this.$toast.fail("身份证格式错误");
          return;
        }
      }
      console.log(this.addUserInfo);
      addUser(this.addUserInfo).then(res => {
        console.log(res);
        this.getUserList();
        this.showAddUser = false;
      });
    },
    delectClick(item) {
      console.log(item);
      delUser({ customerId: item.customerId }).then(res => {
        this.getUserList();
      });
    },

    getUserList() {
      var params = Object.assign({ loanId: this.$store.state.loanNumber });
      userList(params).then(res => {
        console.log(res.data);
        this.licenseType = res.data.data.licenseType;
        console.log(this.licenseType);
        let users = res.data.data.customerInfoList;
        this.mainListData = [];
        this.danbaoListData = [];
        for (let item in users) {
          let index = users[item].relation;
          var relationValue = "";
          if (users[item].customerType == "1") {
            switch (parseInt(index)) {
              case 1: {
                relationValue = "本人";
                break;
              }
              case 2: {
                relationValue = "夫妻";
                break;
              }
              case 3: {
                relationValue = "父母";
                break;
              }
              case 4: {
                relationValue = "子女";
                break;
              }
              case 5: {
                relationValue = "兄弟姐妹";
                break;
              }
              case 6: {
                relationValue = "同事";
                break;
              }
              case 7: {
                relationValue = "其他";
                break;
              }
            }
          } else {
            switch (parseInt(index)) {
              case 1: {
                relationValue = "本人";
                break;
              }
              case 2: {
                relationValue = "法人";
                break;
              }
              case 3: {
                relationValue = "实际使用人";
                break;
              }
              case 4: {
                relationValue = "股东";
                break;
              }
              case 5: {
                relationValue = "高管";
                break;
              }
              case 6: {
                relationValue = "其他";
                break;
              }
              case 7: {
                relationValue = "其他";
                break;
              }
            }
          }

          users[item].relationValue = relationValue;
          if (users[item].customerRole == "1") {
            this.mainListData.push(users[item]);
          } else {
            this.danbaoListData.push(users[item]);
          }
        }
      });
    }
  },
  mounted() {
    this.getUserList();
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
  padding: 0 3%;
}
.showAddCost_btn {
  display: flex;
  width: 100%;
  margin-top: 8px;
}
</style>