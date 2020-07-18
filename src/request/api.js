import request from './request'

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
        url:'/api/expenseDetail/add',
        data:param
    })
}
// 删除费用
export function delCost(param){
    return request({
        method:'post',
        url:'/api/expenseDetail/delete/' + param.id,
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
// 贷款文件列表
export function allFileList(param) {
    return request({
        method:'post',
        url:'/api/loanFileList/getLoanFileList/' + param.loanNumber,
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
// 登出
export function logout(param) {
    return request({
        method:'post',
        url:"/api/logout",
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
