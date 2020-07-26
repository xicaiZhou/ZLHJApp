// 返回 hh:mm:ss
export function formatHourMinSec(value){
    console.log(value)
    value = Number( value );
    let result = '00:00:00';
    if(value && value!=0){
        let arr = [];
        arr[2] = value%3600%60;
        if(arr[2]<10){
            arr[2] = '0'+arr[2];
        }
        value = (value-arr[2])/60;
        arr[0] = Math.floor(value/60);             
        if(arr[0]<10){
            arr[0] = '0'+arr[0];
        }
        arr[1] =(value%60);
        if(arr[1]<10){
            arr[1] = '0'+arr[1];
        }
        
        result = arr.join(':');
    }
    return result;
}

/**
 * 时长格式化  返回 mm:ss
 * @param {*} value 
 */
export function formatHourMin(value){
    value = Number( value );
    let result = '00:00';
    if(value && value!=0){
        let arr = [];
        arr[1] = value%60;
        if(arr[1]<10){
            arr[1] = '0'+arr[1];
        }
        arr[0] = Math.floor(value/60);             
        if(arr[0]<10){
            arr[0] = '0'+arr[0];
        }
        result = arr.join(':');
    }
    return result;
}


/**
 * 数据格式化  返回  6,123,456.12
 */
export function formatNumber( value ){
    value = Number( value );
    if( value ){
        let arr = (Math.abs( value )+'').split('.');
        if( arr[0]+''.length<3 ){
            return value.toFixed(2);
        }
        let sign = '';
        let res  = '';
        if(value<0){
            sign='-';
        }
        let temp = arr[0].split('');
        res = '';
        for(let i=temp.length;i>0;i--){
            if( temp.length>i && (temp.length-i)%3==0 && i>0){
                res = ',' + res;
            }
            res = temp[i-1] + res;
            
        }
        res = sign + res + ((arr[1])?('.'+arr[1]):'');
        return res;
    }else{
        return value;
    }
    
}
// 格式化时间
export const dateFormat = (dateStr, fmt = 'yyyy-MM-dd') => {
    if (!dateStr) return
    dateStr = dateStr.substring(0,19).replace(/-/ig,"/")
    let date = new Date(dateStr)
    console.log(date)
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }

    return fmt
  }

  export const dataYear = (dateStr) =>{
    if (!dateStr) return
    let old = new Date(dateStr).getTime()
    let now = new Date().getTime()
    console.log((now - old) / (365*24*60*60*1000).toFixed(2))
    return Math.floor((now - old) / (365*24*60*60*1000) * 100)/100
  }