import request from './request'

// 选择经销商
export function ExhibitionLIst(param){
    return request({
        method:'post',
        url:'/api/dealer/getPageList',
        data:param
    })
}
export function CarInfo(param){
    return request({
        method:'get',
        url:'/api/loan/info/' + param.loanNumber,
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
//初筛结果查询
export function screenResultInfo(param) {
    return request({
        method: 'post',
        url:'/zlhj_interface/screenLoan/screenResultInfo',
        data:param
    })
}

//初筛拒绝原因
export function RefuseCause(param){
    return request({
        method:'post',
        url:'/zlhj_interface/screenLoan/queryScreeningRefuseCause',
        data:param
    })
}