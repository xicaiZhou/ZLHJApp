<template>
  <div>
    <div>
      <div>
        <div class="header">资方信息</div>
        <van-field
          class="readOnly"
          required
          clickable
          label="合作机构:"
          v-model="detailData.loanHead.fcName"
        />
        <van-field
          class="readOnly"
          required
          clickable
          label="业务类型:"
          v-model="detailData.loanHead.businessType == '1' ? '新车': '二手车'"
        />
        <van-field
          class="readOnly"
          required
          clickable
          label="产品名称:"
          v-model="detailData.loanHead.productName"
        />
      </div>
      <div>
        <div class="header">人员信息</div>
        <van-collapse v-model="customerInfoActiveNames">
          <van-collapse-item
            v-for="(item,index) in this.detailData.customerInfoVoList"
            :key="index"
            :name="index"
          >
            <div slot="title">{{item.customerName}}</div>
            <div slot="value">{{item.customerRole}}</div>
            <van-field
              class="readOnly"
              required
              clickable
              label="证件类型:"
              v-model="item.idType == '1' ? '身份证':'社会统一信用代码'"
            />
            <van-field class="readOnly" required clickable label="证件号码:" v-model="item.idNum" />
            <van-field class="readOnly" required clickable label="联系电话:" v-model="item.phone" />
            <van-field
              class="readOnly"
              required
              clickable
              label="居住地址:"
              v-model="item.liveAddress"
            />
            <van-field class="readOnly" required clickable label="单位名称:" v-model="item.company" />
            <van-field
              class="readOnly"
              required
              clickable
              label="单位地址:"
              v-model="item.companyAddress"
            />
          </van-collapse-item>
        </van-collapse>
      </div>
      <div>
        <div class="header">拨号信息</div>
        <van-collapse v-model="callPhoneActiveNames">
          <van-collapse-item
            v-for="(item,index) in this.detailData.callPhoneVoList"
            :key="index"
            :name="index"
          >
            <div slot="title">{{item.customerName}}</div>
            <div slot="value">{{item.customerType}}</div>
            <van-field
              class="readOnly"
              required
              clickable
              label="联系方式:"
              v-model="item.contactType"
            />
            <van-field
              class="readOnly"
              required
              clickable
              label="联系号码:"
              v-model="item.contactPhone"
            />
          </van-collapse-item>
        </van-collapse>
      </div>
      <div>
        <van-collapse v-model="collectionNotesActiveNames">
          <van-collapse-item name="1">
            <div class="file-item-title" slot="title">跟进信息:</div>
            <div slot="value">
              <van-button style="width:80px; height:25px" type="info" @click.stop="popup">新 增</van-button>
            </div>
            <div class="collectionNotesBody">
              <div class="collectionNotesitem van-hairline--surround" style="line-height: 40px;">
                <div class="collectionNotesitem_left van-hairline--right">跟进时间</div>
                <div class="collectionNotesitem_center van-hairline--left van-hairline--right">跟进描述</div>
                <div class="collectionNotesitem_right van-hairline--left">催收人员</div>
              </div>
            </div>
            <div
              class="collectionNotesBody"
              v-for="(item, index) in detailData.collectionNotesList"
              :key="index"
            >
              <div class="collectionNotesitem van-hairline--surround">
                <div class="collectionNotesitem_left van-hairline--right">{{item.createdTime}}</div>
                <div class="collectionNotesitem_center van-hairline--right">{{item.remark}}</div>
                <div class="collectionNotesitem_right">{{item.createdBy}}</div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div>
        <van-collapse v-model="loanDetailActiveNames">
          <van-collapse-item name="1">
            <div class="file-item-title" slot="title">融资信息:</div>
            <van-field
              class="readOnly"
              required
              clickable
              label="项目总额(元):"
              v-model="detailData.loanDetail.totalAmount"
            />
            <van-field
              class="readOnly"
              required
              clickable
              label="租赁期限(月):"
              v-model="detailData.loanDetail.term"
            />
            <van-field
              class="readOnly"
              required
              clickable
              label="首付金额(元):"
              v-model="detailData.loanDetail.downPaymentAmount"
            />
            <van-field
              class="readOnly"
              required
              clickable
              label="首付比例(%):"
              v-model="detailData.loanDetail.downPaymentRate"
            />
            <van-field
              class="readOnly"
              required
              clickable
              label="融资金额(元):"
              v-model="detailData.loanDetail.amount"
            />
            <van-field
              class="readOnly"
              required
              clickable
              label="净融资额(元):"
              v-model="detailData.loanDetail.netAmount"
            />
            <van-field
              class="readOnly"
              required
              clickable
              label="租赁成数(%):"
              v-model="detailData.loanDetail.rate"
            />
            <van-field
              class="readOnly"
              required
              clickable
              label="每月租金(元):"
              v-model="detailData.loanDetail.monthRent"
            />
          </van-collapse-item>
        </van-collapse>
      </div>
      <div>
        <van-collapse v-model="loanRepaymentDetailActiveNames">
          <van-collapse-item name="1">
            <div class="file-item-title" slot="title">还款情况:</div>
            <van-field
              class="readOnly"
              required
              clickable
              label="当前逾期总额(元):"
              v-model="overTotalAmount"
            />
            <van-field class="readOnly" required clickable label="当前逾期天数:" v-model="overDays" />
            <div v-for="(item, index) in detailData.loanRepaymentDetailVoList" :key="index">
              <div style="background:#fff;height:10px"></div>

              <div style="padding:10px" class="readOnly">
                <div>
                  期数:
                  <span>{{getEmpty(item.term)}} 期</span>
                </div>
                <div style="display:flex">
                  <div style="width:50%">
                    应还日期:
                    <span>{{getDate(item.dueDate)}}</span>
                  </div>
                  <div>
                    应还总额:
                    <span>{{getEmpty(item.totalAmount)}}</span>
                  </div>
                </div>
                <div style="display:flex">
                  <div style="width:50%">
                    应还本金:
                    <span>{{getEmpty(item.capital)}}</span>
                  </div>
                  <div>
                    应还利息:
                    <span>{{getEmpty(item.interest)}}</span>
                  </div>
                </div>
                <div style="display:flex">
                  <div style="width:50%">
                    应还罚息:
                    <span>{{getEmpty(item.penalty)}}</span>
                  </div>
                  <div>
                    应还复利:
                    <span>{{getEmpty(item.compound)}}</span>
                  </div>
                </div>
                <div style="display:flex">
                  <div style="width:50%">
                    实还日期:
                    <span>{{ item.repaymentDate ? getDate(item.repaymentDate) : '-'}}</span>
                  </div>
                  <div>
                    实还金额:
                    <span>{{getEmpty(item.repayment)}}</span>
                  </div>
                </div>
                <div style="display:flex">
                  <div style="width:50%">
                    逾期金额:
                    <span>{{getEmpty(item.overdueAmount)}}</span>
                  </div>
                  <div>
                    逾期天数:
                    <span>{{getEmpty(item.overdueDays)}}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <div>
      <van-popup v-model="popupShow" position="top">
        <div>
          <div class="header">新增跟进记录</div>
          <van-field
            required
            style="border-style: solid;border-color:#D5D5D5;border-width:1px; width:90%; margin:0 auto;margin-top:15px;"
            v-model="message"
            label="跟进描述:"
            placeholder="请填写跟进描述"
            type="textarea"
            autosize
            rows="5"
            show-word-limit
          />
          <div style="margin-top:10px">
            <van-button block type="info" @click="toAdd">保存</van-button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { overdueDetail, addCollectionNotes } from "../../request/api";
import { dateFormat } from "../../utils/formatter";
import { isEmpty } from "../../utils/utils";
export default {
  data() {
    return {
      customerInfoActiveNames: [0],
      callPhoneActiveNames: [0],
      collectionNotesActiveNames: ["1"],
      loanDetailActiveNames: ["1"],
      loanRepaymentDetailActiveNames: ["1"],
      overTotalAmount: 0.0, // 当前逾期总额
      overDays: 0,
      popupShow: false,
      message: "",
      detailData: {
        callPhoneVoList: [], //拨号信息
        collectionNotesList: [], //跟进记录信息
        customerInfoVoList: [], //人员信息
        loanDetail: {}, //融资信息显示
        loanHead: {}, //贷款头表信息
        loanRepaymentDetailVoList: [] //还款信息
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getEmpty(str) {
      if (isEmpty(str)) {
        return "-";
      } else {
        return str;
      }
    },
    getDate(dateStr) {
      return dateFormat(dateStr);
    },
    getData() {
      this.overDays = this.$route.params.overDays;
      overdueDetail({ loanNumber: this.$route.params.loanNumber }).then(res => {
        console.log(res.data.data);
        this.detailData = res.data.data;

        for (let index in this.detailData.loanRepaymentDetailVoList) {
          this.overTotalAmount += this.detailData.loanRepaymentDetailVoList[
            index
          ]["overdueAmount"];
        }
      });
    },
    toAdd() {
      if (this.message.length == 0) {
        this.$toast.fail("请将跟进描述填写完整！");
        return;
      }
      addCollectionNotes({
        loanNumber: this.$route.params.loanNumber,
        remark: this.message
      }).then(res => {
        this.getData();
        this.popupShow = false;
        this.message = "";
      });
    },
    popup() {
      this.popupShow = true;
    }
  }
};
</script>

<style scoped>
.collectionNotesBody {
  width: 100%;
  margin: 0 auto;
  border-style: solid;
  border-color: #d5d5d5;
  border-width: 1px;
}
.collectionNotesitem {
  display: flex;
  min-height: 40px;
  text-align: center;
}
.collectionNotesitem_left {
  width: 25%;
}
.collectionNotesitem_center {
  width: 60%;
}
.collectionNotesitem_right {
  width: 20%;
}
.file-item-title {
  color: #ff9900;
  font-size: 17px;
  font-weight: bold;
}
</style>