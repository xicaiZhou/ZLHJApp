import request from './request'

//初筛拒绝原因
export function network(param){
    return request({
        method:'post',
        url:'/zlhj_interface/appHelper/old',
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