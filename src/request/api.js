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
        url:"api/customerInfo/info/" + param.customerId,
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