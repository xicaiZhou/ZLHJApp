<template>
  <div>
    <div style="height:100%; margin-bottom: 60px;">
      <div class="section-top">
        <div class="header">人员列表</div>
        <div class="userlist">
          <div
            style="margin-top:10px;margin-left:10px;"
            class="van-hairline--surround"
            v-for="(item,index) in this.dataList"
            :key="index"
            @click="changeUser(index)"
          >
            <span
              :class="currentIndex == index ? 'user-item-selected' :'user-item'"
            >{{item.customerName}}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="header">文件列表</div>
        <div class="filelist">
          <van-collapse accordion :value="activeName" @change="onChange">
            <div class="file-item">
              <van-collapse-item
                v-for="(item,index) in this.loanFileVoList"
                :key="index"
                :name="index"
              >
                <div class="file-item-title" slot="title">
                  {{item.loanFileName}}
                  <span>{{item.required == "1" ? "(必填)" :""}}</span>
                </div>
                <div slot="value">
                  <img
                    v-show="(loanStatus >= 0 && loanStatus < 60)"
                    src="../../assets/ljt.png"
                    class="updata"
                    @click.stop="delAll(item)"
                  />
                  <img
                    v-show="(loanStatus >= 0 && loanStatus < 60)"
                    src="../../assets/shangchuan.png"
                    class="updata"
                    @click="updataimage(item)"
                  />
                </div>

                <van-uploader
                  max-count="20"
                  accept="image"
                  :file-list="item.fileList"
                  @delete="delected"
                />
              </van-collapse-item>
            </div>
          </van-collapse>
        </div>
      </div>
    </div>
    <div class="subBtn" v-show="(loanStatus >= 0 && loanStatus < 60)">
      <van-button class="subBtn_body" block type="info" @click="toSub">完 成</van-button>
    </div>
  </div>
</template>

<script>
import {
  allFileList,
  fileDetail,
  deleteAllFile,
  deleteFile,
  updateStatus,
} from "../../request/api";
import { updataInfo } from "../../utils/bridge";

export default {
  data() {
    return {
      loanStatus: this.$store.state.loanStatus,
      dataList: [],
      customerId: 0,
      loanFileVoList: [],
      activeName: -1,
      currentIndex: 0,
      width: 300,
    };
  },
  methods: {
    toSub() {
      for (let i in this.dataList) {
        for (let j in this.dataList[i].loanFileVoList) {
          let temp = this.dataList[i].loanFileVoList[j];
          if (temp.required == "1" && temp.fileList.length == 0) {
            this.$toast.fail(
              "请将人员：‘" +
                this.dataList[i].customerName +
                "的" +
                temp.loanFileName +
                "’文件上传完整"
            );
            return;
          }
        }
      }

      const toast = this.$toast.loading({
        duration: 0,
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      updateStatus({
        loanNumber: this.$store.state.loanNumber,
        loanStatus: "50",
      }).then((res) => {
        toast.clear();
        this.$router.back();
      });
    },
    changeUser(val) {
      this.currentIndex = val;
      this.dealData(val);
    },
    onChange(event) {
      this.activeName = event;
    },
    uploadData1() {
      this.getAllFileList();
    },
    delAll(item) {
      console.log(item);
      deleteAllFile({ fileId: item.id }).then((res) => {
        this.getAllFileList();
      });
    },
    delected(val) {
      if (this.loanStatus >= 0 && this.loanStatus < 60) {
        deleteFile({
          loanNumber: this.$store.state.loanNumber,
          id: val.id,
        }).then((res) => {
          console.log(res);
          this.getAllFileList();
        });
      }
    },
    updataimage(item) {
      item.loanNumber = this.$store.state.loanNumber;
      console.log("item:", item);

      updataInfo(item);
    },
    getAllFileList() {
      const toast = this.$toast.loading({
        duration: 0,
        message: "加载...",
        forbidClick: true,
        loadingType: "spinner",
      });
      console.log(this.$store.state.loanNumber);
      allFileList({ loanNumber: this.$store.state.loanNumber }).then((res) => {
        console.log("AllFileList:", res);

        if (res.data.data.length > 0) {
          this.dataList = res.data.data;
          this.dealData(this.currentIndex);
          toast.clear();
        } else {
          toast.clear();
          this.$toast.fail("暂无人员列表！")
        }
      });
    },
    dealData(index) {
      this.loanFileVoList = this.dataList[index].loanFileVoList;
      for (let item in this.loanFileVoList) {
        this.loanFileVoList[item].fileList = [];
        this.getFileDetail(this.loanFileVoList[item]);
      }
    },
    getFileDetail(item) {
      fileDetail({ fileId: item.id }).then((res) => {
        console.log(res);
        // item.fileList = [];
        let list = res.data.data;
        console.log(this.loanFileVoList);
        for (let index in list) {
          console.log("111", list);
          item.fileList.push({
            url: list[index].fileUrl,
            deletable: true,
            id: list[index].id,
          });
        }
        this.activeName = this.activeName + 1;
        this.activeName = this.activeName - 1;
      });
    },
  },
  created() {
    window.uploadData = (res) => {
      this.uploadData1();
    };
  },
  mounted() {
    this.getAllFileList();
  },
};
</script>
<style>
.van-uploader__upload {
  display: none !important;
}
/* .van-uploader__preview {
  width: 30%;
} */
.van-uploader__preview .van-image {
  position: static;
}
.van-uploader {
  display: inline;
}
</style>
<style scoped>
.section-top {
  height: 100px;
  width: 100%;
}
.userlist {
  width: 90%;
  display: flex;
  margin: auto;
  box-sizing: border-box;
  overflow: scroll;
  white-space: nowrap;
}

::-webkit-scrollbar {
  width: 0px;
}

.user-item {
  height: 40px;
  padding: 10px;
  margin-top: 10px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #fff;
  box-shadow: 0px 5px 5px #ebedf0;
  background: #fff;
  color: #385783;
  font-weight: bold;
  
}
.user-item-selected {
  height: 40px;
  padding: 10px;
  margin-top: 10px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #385783;
  box-shadow: 0px 5px 5px #ebedf0;
  background: #385783;
  color: #fff;
  font-weight: bold;
}
.file-item {
  /* padding: 0 16px; */
  font-size: 15px;
}
.file-item-title {
  height: 35px;
  line-height: 35px;
}
.file-item span {
  color: red;
}
.file-item img {
  width: 30px;
  height: 30px;
}
</style>

