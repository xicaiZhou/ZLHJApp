export const isPhoneNum = (phone) =>{
    return /^1[3456789]\d{9}$/.test(phone);
}
export const idNumValidator = (val) =>{
    //身份证正则表达式(15位)
    var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    //身份证正则表达式(18位)  .
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;

    if(isIDCard1.test(val) || isIDCard2.test(val)){
      return true
    }
    return false;
}
// 邮箱校验
export const isEmail = (mail) =>{
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]$/.test(mail);
}
// 根据身份证号码计算生日年龄和性别
export const idNumInfo = (val) =>{

  let year = ""
  if(val.length==18){
    year=val.substring(6,10)
  }else if(val.length==15){
    year="19"+val.substring(6,8)
  }
  let age = new Date().getFullYear() - parseInt(year)
  console.log(age)


  let birthday = ""
  if(val.length==18){
    birthday=val.substring(6,14)
  }else if(val.length==15){
    birthday="19"+val.substring(6,12)
  }
  let sex = ""
  if(val.length==18){
    sex=val.substring(16,17)
  }else if(val.length==15){
    sex=val.substring(14,15)
  }

  return {
    age:age,
    sex:parseInt(sex) % 2,
    birthday:birthday
  }

}
// 截取第一个？后链接后面的参数
export const getUrlParamFirst = (key) =>{
    var url = window.location.href; //获取当前url
    console.log(url);
    var cs = url.split("?")[1]; //获取?之后的参数字符串
    console.log(cs);
    var cs_arr = cs.split("&"); //参数字符串分割为数组
    console.log(cs_arr);
    var cs = {};
    for (var i = 0; i < cs_arr.length; i++) {
      //遍历数组，拿到json对象
      cs[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
    }
    return cs[key];
}
  
//截取第一个链接全部参数
export const getUrlParam = () =>{
    var url = window.location.href; //获取当前url
    console.log(url);
    var cs = url.split("?")[1]; //获取?之后的参数字符串
    console.log(cs);
    var cs_arr = cs.split("&"); //参数字符串分割为数组
    console.log(cs_arr);
    var cs = {};
    for (var i = 0; i < cs_arr.length; i++) {
        //遍历数组，拿到json对象
        cs[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
    }
    return cs;
}
  
//截取链接第二个问号后面的参数
export const getUrlParamSec = (name) => {
    var url = window.location.href; //获取当前url
    var second = url.split("?")[2];
    console.log("second is:",second);
    var secArray = second.split("&"); //参数字符串分割为数组
    console.log('secArray',secArray)
    var sec={};
    secArray.map(function (cur,index) {
        sec[cur.split("=")[0]] = cur.split("=")[1]
    })
    return sec[name];
}

// 判断当前终端是移动端（iOS、Android、塞班、Windows Phone、iPad、iPod）还是PC  false=>PC
export const isPhone = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
}
//h获取设备
export function GetOs () {
    let sUserAgent = navigator.userAgent.toLocaleLowerCase()
    let isWin = (navigator.platform === 'win32') || (navigator.platform === 'windows')
    let isMac = (navigator.platform === 'mac68k') || (navigator.platform === 'macppc') || (navigator.platform === 'macintosh') || (navigator.platform === 'macintel')
    if (isMac) return 'Mac'
    var isUnix = (navigator.platform === 'x11') && !isWin && !isMac
    if (isUnix) return 'Unix'
    var isLinux = (String(navigator.platform).indexOf('linux') > -1)
    if (isLinux) return 'Linux'
    if (isWin) {
      var isWin2K = sUserAgent.indexOf('windows nt 5.0') > -1 || sUserAgent.indexOf('windows 2000') > -1
      if (isWin2K) return 'Win2000'
      var isWinXP = sUserAgent.indexOf('windows nt 5.1') > -1 || sUserAgent.indexOf('windows xp') > -1
      if (isWinXP) return 'WinXP'
      var isWin2003 = sUserAgent.indexOf('windows nt 5.2') > -1 || sUserAgent.indexOf('windows 2003') > -1
      if (isWin2003) return 'Win2003'
      var isWinVista = sUserAgent.indexOf('windows nt 6.0') > -1 || sUserAgent.indexOf('windows vista') > -1
      if (isWinVista) return 'WinVista'
      var isWin7 = sUserAgent.indexOf('windows nt 6.1') > -1 || sUserAgent.indexOf('windows 7') > -1
      if (isWin7) return 'Win7'
    }
    if (sUserAgent.indexOf('android') > -1) return 'Android'
    if (sUserAgent.indexOf('iphone') > -1) return 'iPhone'
    if (sUserAgent.indexOf('symbianos') > -1) return 'SymbianOS'
    if (sUserAgent.indexOf('windows phone') > -1) return 'Windows Phone'
    if (sUserAgent.indexOf('ipad') > -1) return 'iPad'
    if (sUserAgent.indexOf('ipod') > -1) return 'iPod'
    return 'others'
}