import request from './request'

//根据订单id绑定fcid资方
export function updateFinancingChannel(param){
    return request({
        method:'post',
        url:'/api/loan/financingChannel/update',
        data:param
    })
}
// 选择经销商
export function ExhibitionLIst(param){
    return request({
        method:'post',
        url:'/api/dealer/getPageList',
        data:param
    })
}
// 根据loanNumber获取车辆信息数据
export function CarInfo(param){
    return request({
        method:'get',
        url:'/api/loan/info/' + param.loanNumber,
        data:param
    })
}

export function SaveCarInfo(param){
    return request({
        method:'post',
        url:'/api/loan/add',
        data:param
    })
}

// 车辆品牌列表
export function CarModelList(param){
    return request({
        method:'get',
        url: param.bandName == "" ? '/api/carElement/getCarBandList/all' : '/api/carElement/getCarBandList/'+ param.bandName,
        data:param
    })
}

// 车型列表
export function CarModelSearch(param){
    return request({
        method:'post',
        url: '/api/carModelInfo/getPageList',
        data:param
    })
}
// 车系列表
export function CarsList(param){
    return request({
        method:'get',
        url: '/api/carElement/getCarSeriesList/' + param.bandId,
        data:param
    })
}

//  =========================融资信息========================

// 根据loanNumber获取业务信息数据
export function BusinessInfo(param){
    return request({
        method:'get',
        url:'/api/loan/loanDetail/info/' + param.loanNumber,
        data:param
    })
}
// 费用列表
export function CostList(param){
    return request({
        method:'get',
        url: '/api/expenseDetail/getList/' + param.loanNumber,
        data:param
    })
}
// 计算所有费用
export function CalculateCost(param){
    return request({
        method:'post',
        url:'/api/loan/loanDetail/calculationLoanDetailAmount',
        data:param
    })
}
// 添加费用
export function addCost(param){
    return request({
        method:'post',
        url:'/api/loan/expenseDetail/add',
        data:param
    })
}
// 删除费用
export function delCost(param){
    return request({
        method:'post',
        url:'/api/loan/expenseDetail/delete/' + param.id,
        data:param
    })
}
// 保存业务信息
export function saveBussinessInfo(param){
    return request({
        method:'post',
        url:'/api/loan/loanDetail/add',
        data:param
    })
}
//  =========================人员信息========================
  // 获取人员列表
export function userList(param){
    return request({
        method:"get",
        url:'/api/customerInfo/getLoanCustomerList/' + param.loanId,
        data:param
    })
}
// 添加人员信息
export function addUser(param){
    return request({
        method:'post',
        url:'/api/customerInfo/add',
        data:param
    })
}
// 删除人员信息
export function delUser(param){
    return request({
        method:'post',
        url:'/api/customerInfo/delete/'+param.customerId,
        data:param
    })
}
// 获取人员详情信息
export function userDetailInfo(param){
    return request({
        method:'get',
        url:"/api/customerInfo/info/" + param.customerId,
        data:param
    })
}
// 更新人员信息
export function updateUser(param) {
    return request({
        method:'post',
        url:'/api/customerInfo/update',
        data:param
    })
}

//  =========================选择产品========================

// 获取贷款和还款计划等信息
export function loanDetailAndRepaymentPlan(param){
    return request({
        method:'get',
        url:"/api/loan/loanDetailAndRepaymentPlan/info/" + param.loanNumber,
        data:param
    })
}
// 资方列表
export function financingChannelList(param){
    return request({
        method:'get',
        url:"/api/financingChannel/getList",
        data:param
    })
}

// 产品列表
export function productList(param) {
    return request({
        method:'post',
        url:'/api/loan/product/getPageList',
        data:param
    })
}
// 产品详情
export function productDetail(param) {
    return request({
        method:'post',
        url:'/api/loan/product/getDetailInfo',
        data:param
    })
}
// 付款账号列表
export function financingChannelAccountList(param){
    return request({
        method:'get',
        url:"/api/financingChannelAccount/getList/"+param.financingChannelId,
        data:param
    })
}
// 获取资方账户的信息
export function financingChannelAccountDetail(param){
    return request({
        method:'get',
        url:"/api/financingChannelAccount/info/"+param.id,
        data:param
    })
}
// 产品贴息方案
export function productDiscountInterest(param){
    return request({
        method:'get',
        url:"/api/productDiscountInterest/getList/"+param.productId,
        data:param
    })
}
// 产品贴息详情
export function productDiscountInterestDetail(param){
    return request({
        method:'get',
        url:"/api/productDiscountInterest/info/"+param.id,
        data:param
    })
}
// 计算所有金额
export function calculationFinancingAmount(param) {
    return request({
        method:'post',
        url:'/api/loan/loanDetail/calculationFinancingAmount',
        data:param
    })
}
// 还款计划表
export function repaymentPlan(param) {
    return request({
        method:'post',
        url:'/api/loan/repaymentPlan/test',
        data:param
    })
}
// 保存产品信息
export function updateLoanDetail(param) {
    return request({
        method:'post',
        url:'/api/loan/loanDetail/update',
        data:param
    })
}
//  =========================文件上传========================
// 清空当前文件类型所有文件
export function deleteAllFile(param) {
    return request({
        method:'post',
        url:'/api/loanFileList/deleteAllFile/' + param.fileId,
        data:param
    })
}
// 清空当前文件类型所有文件
export function deleteFile(param) {
    return request({
        method:'post',
        url:'/api/loanFileList/deleteFile',
        data:param
    })
}
// 贷款文件列表
export function allFileList(param) {
    return request({
        method:'get',
        url:'/api/loanFileList/getLoanFileList/' + param.loanNumber,
        data:param
    })
}
// 获取文件详情
export function fileDetail(param) {
    return request({
        method:'get',
        url:'/api/loanFileList/getLoanFileDetails/' + param.fileId,
        data:param
    })
}
// 提交订单
export function submitStartTask(param){
    return request({
        method:'post',
        url:'/api/submit/startTask',
        data:param
    })
}

//  =========================综合查询========================
export function searchInfo(param) {
    return request({
        method:'post',
        url:'/api/loanHead/getPageList',
        data:param
    })
}
// 获取退回拒绝原因
export function getWhy(param) { 
    return request({
        method:'get',
        url:'/api/approveTask/getApproveDesc/' + param.loanNumber,
        data:param
    })
}
// 复单
export function copy(param){
    return request({
        method:"post",
        url:'/api/loan/cope/'+ param.loanNumber,
        data:param
    })
}
//  =========================系统功能========================
// 登出
export function logout(param) {
    return request({
        method:'post',
        url:"/api/logout",
        data:param
    })
}
export function updatePassword(param) { 
    return request({
        method:'post',
        url:'/api/sysUser/updatePassword',
        data:param
    })
 }

 //平安贷款信息头表
 export function loanHeadPazl(param) { 
    return request({
        method:'get',
        url:'/api/loanHeadPazl/info/' + param.loanNumber,
        data:param
    })
}
// 平安线上征信
export function getMainCustomerInfo(param) { 
    return request({
        method:'get',
        url:'/api/customerInfoPazl/getMainCustomerInfoPazl/' + param.loanNumber,
        data:param
    })
}
// 预审批申请
export function creditApply(param){
    return request({
       method:'post',
       url:'/api/loanHeadPazl/credit/apply',
       data:param
    })
}
// 结果查询
export function SearchResult(param){
    return request({
       method:'get',
       url:'/api/loanHeadPazl/credit/result/' + param.loanNumber,
       data:param
    })
}

// 预审批申请
export function confirmAuthorization(param){
    return request({
       method:'post',
       url:'/api/loanPazl/credit/confirm',
       data:param
    })
}
// 车辆详情
export function paCarDetailInfo(param){
    return request({
       method:'get',
       url:'/api/carDetailPazl/info/' + param.loanNumber,
       data:param
    })
}
 //  =========================逾期查询========================
 // 逾期查询列表
 export function overdueList(param){
     return request({
        method:'post',
        url:'/api/loanRepaymentDetail/getOverDueLoanPageList',
        data:param
     })
 }
 // 逾期详情
 export function overdueDetail(param){
     return request({
         method:'get',
         url:'/api/collection/info/' + param.loanNumber,
         data:param
     })
 }
 // 更新节点状态
 export function updateStatus(param){
     return request({
         method:"post",
         url:'/api/loanHead/updateStatus',
         data:param
     })
 }
 
 export function addCollectionNotes(param){
     return request({
         method:'post',
         url:'/api/collection/addCollectionNotes',
         data:param
     })
 }
//  =========================其他数据========================
// 1.省市区数据
export function getAddress(){
    return request({
        method:'get',
        url:"/api/provinceCityArea/list",
        data:{}
    })
}
// 2.获取码值
// credentialType - 证件类型
// useType	- 用途
// expenseType	- 费用类型
// node - 节点
export function codeList(param){
    return request({
        method:'get',
        url:'/api/code/list/' + param.codeType,
        data:param
    })
}
