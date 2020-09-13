<template>
  <div>
    <van-popup
      v-model="showZF"
      position="bottom"
      :style="{ height: '300px', width: '100%'}"
      get-container="body"
    >
      <van-picker title show-toolbar :columns="zfList" @confirm="selectZF" @cancel="showZF=false" />
    </van-popup>
    <van-popup v-model="showProduct" :style="{ height: '250px', width: '90%'}" get-container="body">
      <div>
        <div style="text-align: center;margin-top:30px;color:#ff9900">请选择资方</div>
        <van-field
          readonly
          clickable
          is-link
          style="width:90%; border-style: solid;border-color:#D5D5D5;border-width:1px; margin:0 auto;margin-top:30px"
          label="资方:"
          placeholder="请选择资方"
          v-model="fcName"
          @click="selectZF=true"
        />
        <van-button
          style="width:90%;background:#ff9900;border:none;margin:0 auto; margin-top:50px"
          block
          type="info"
          @click="toProductInfo"
        >确 认</van-button>
      </div>
    </van-popup>

    <div class="title">新车正审材料提交</div>
    <div class="listItem" v-for="(item,index) in listData" :key="index" @click="toDetail(item)">
      <div class="itemL">
        <!-- <van-icon v-if="index == 0" name="user-circle-o" size="20" />
        <van-icon v-else-if="index == 1" name="refund-o" size="20" />
        <van-icon v-else-if="index == 2" name="user-circle-o" size="20" />
        <van-icon v-else-if="index == 3" name="user-circle-o" size="20" />
        <van-icon v-else-if="index == 4" name="user-circle-o" size="20" />
        <van-icon v-else-if="index == 5" name="user-circle-o" size="20" />-->

        <div style="margin-left:4px">{{item.name}}</div>
      </div>
      <div class="itemR" v-if="item.state <= loanStatus">
        <van-icon name="checked" color="#ff9900" size="22" />
        <div style="margin-left:10px;">已完成</div>
      </div>
      <div class="itemR" v-else>
        <van-icon name="info-o" size="20" />
        <div style="margin-left:10px">未开始</div>
      </div>
    </div>
    <div class="tips">提交审核后，审核人员会根据您提交的材料反馈审核结果，请耐心等待！</div>
    <div v-show="loanStatus <= 50" class="subBtn1" ref="subBtn">
      <van-button
        style="width:100%;background:#ff9900;border:none"
        block
        type="info"
        @click="toSub"
      >提交正审</van-button>
    </div>
  </div>
</template>

<script>
import { submitStartTask, CarInfo, BusinessInfo } from "../../request/api";
export default {
  data() {
    return {
      loanStatus: 0,
      showProduct: false,
      showZF: false,
      fcId: 0,
      fcName: "",
      fcList: [],
      zfList: [],
      listData: [
        {
          name: "车辆信息",
          state: 10,
        },
        {
          name: "融资信息",
          state: 20,
        },
        {
          name: "人员信息",
          state: 30,
        },
        {
          name: "产品信息",
          state: 40,
        },
        {
          name: "文件信息",
          state: 50,
        },
      ],
    };
  },
  mounted() {
    console.log("ppppppppppppploanNumber:", this.$store.state.loanNumber);
    if (this.$store.state.loanNumber) {
      CarInfo({ loanNumber: this.$store.state.loanNumber }).then((res) => {
        console.log("menu:", res);
        this.$store.state.loanStatus = parseInt(res.data.data.loanStatus);
        this.loanStatus = parseInt(res.data.data.loanStatus);
      });
    } else {
      this.$store.state.loanStatus = 0;
      this.loanStatus = 0;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/carInfo") {
      if (this.$store.state.loanNumber) {
        this.$store.state.isload = true;
      } else {
        this.$store.state.isload = false;
      }
    } else if (to.path == "/selectProduct") {
      this.$store.state.isloadProduct = true;
    }
    next();
  },
  methods: {
    selectProductList() {},
    selectZF(val) {
      for (let index in this.fcList) {
        if (this.fcList[index].name == val) {
          this.loanInfo.fcId = this.fcList[index].id; //资方ID
          this.loanInfo.fcName = val; //资方名称
          break;
        }
      }
    },
    toProductInfo() {
      if (!fcName) {
        this.$toast.fail("请先选择资方！");
        return;
      }

      this.$router.push({
        path: "/PAProductInfo",
      });
      // this.$router.push({
      //   path: "/selectProduct"
      // });
    },
    toDetail(val) {
      if (val.name === "车辆信息") {
        this.$router.push({
          path: "/carInfo",
        });
      } else if (val.name === "融资信息") {
        if (this.loanStatus + 10 < val.state) {
          this.$toast.fail("请先录入车辆信息");
          return;
        }
        this.$router.push({
          path: "/business",
        });
      } else if (val.name === "人员信息") {
        if (this.loanStatus + 10 < val.state) {
          this.$toast.fail("请先录入融资信息");
          return;
        }
        this.$router.push({
          path: "/userInfo",
        });
      } else if (val.name === "产品信息") {
        if (this.loanStatus + 10 < val.state) {
          this.$toast.fail("请先录入人员信息");
          return;
        }
        BusinessInfo({ loanNumber: this.$store.state.loanNumber }).then(
          (res) => {
            let financingChannel = res.data.data.fcId;
            console.log("有fcId吗：", financingChannel);

            if (!financingChannel) {
              //没有fcid
              // 资方列表
              financingChannelList().then((res) => {
                console.log("资方列表：", res);
                this.fcList = res.data.data;
                for (let index in this.fcList) {
                  this.zfList.push(this.fcList[index].name);
                }
                this.showProduct = true;
              });
            } else {
              this.showProduct = false;
              this.$router.push({
                path: "/PAProductInfo",
              });
            }
          }
        );
      } else if (val.name === "文件信息") {
        if (this.loanStatus + 10 < val.state) {
          this.$toast.fail("请先录入产品信息");
          return;
        }
        this.$router.push({
          path: "/uploadFile",
        });
      }
    },
    toSub() {
      // 提交订单
      const toast = this.$toast.loading({
        duration: 0,
        message: "提交中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      console.log(this.$store.state.loanNumber);

      submitStartTask({ loanNumber: this.$store.state.loanNumber }).then(
        (res) => {
          toast.clear();
          this.$toast.success("申请提交成功！");
          this.$router.back();
        }
      );
    },
  },
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
.subBtn1 {
  position: fixed;
  bottom: 0px;
  width: 90%;
  height: 50px;
  left: 5%;
}
</style>