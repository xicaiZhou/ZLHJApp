import { List } from "vant"

export function getTime (dateStr) {
  // 兼容mac
  if (!dateStr) return
  const date = new Date(dateStr.replace(/-/g, '/'))
  return {
    getFullYear: date.getFullYear(),
    getMonth: (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
    getDate: date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
    getHours: date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
    getMinutes: date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
    getSeconds: date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  }
}

// 获取到分钟 2018-11-11 12:12
export function getTimeM (dateStr) {
  const date = getTime(dateStr)
  return `${date.getFullYear}-${date.getMonth}-${date.getDate} ${date.getHours}:${date.getMinutes}`
}
// 获取到S的时间  2018-09-10 23::59:59
export function getTimeS (dateStr) {
  const date = getTime(dateStr)
  return `${date.getFullYear}-${date.getMonth}-${date.getDate} ${date.getHours}:${date.getMinutes}:${date.getSeconds}`
}
// 获取到日 2018-12-12
export function getTimeD (dateStr) {
  const date = getTime(dateStr)
  return `${date.getFullYear}-${date.getMonth}-${date.getDate}`
}
// 过滤时间
export function getDateTime (value, format) {
  // const time = (value, format) => {
  if (!value) {
    return '--'
  }
  let time = new Date(value)
  let str = format || 'yyyy-MM-dd'
  let Week = ['日', '一', '二', '三', '四', '五', '六']

  str = str.replace(/yyyy|YYYY/, time.getFullYear())
  str = str.replace(/yy|YY/, (time.getYear() % 100) > 9 ? time.getYear() % 100 : '0' + (time.getYear() % 100))

  str = str.replace(/MM/, time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1))
  str = str.replace(/M/g, time.getMonth() + 1)

  str = str.replace(/w|W/g, Week[time.getDay()])

  str = str.replace(/dd|DD/, time.getDate() > 9 ? time.getDate() : '0' + time.getDate())
  str = str.replace(/d|D/g, time.getDate())

  str = str.replace(/hh|HH/, time.getHours() > 9 ? time.getHours() : '0' + time.getHours())
  str = str.replace(/h|H/g, time.getHours())
  str = str.replace(/mm/, time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes())
  str = str.replace(/m/g, time.getMinutes())

  str = str.replace(/ss|SS/, time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds())
  str = str.replace(/s|S/g, time.getSeconds())

  return str
}

export function getDay (day) {
  var today = new Date()

  var targetdayilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day

  today.setTime(targetdayilliseconds) // 注意，这行是关键代码

  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  return tYear + '-' + tMonth + '-' + tDate
}
export function getDayM (day) {
  var today = new Date()
  var targetdayilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetdayilliseconds) // 注意，这行是关键代码
  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  let minutes = today.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return tYear + '/' + tMonth + '/' + tDate + ' ' + `${today.getHours()}:${minutes}:${today.getSeconds()}`
}
//  获取某一天的时间戳
export function SgetDay (day) {
  var today = new Date()

  var targetdayilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day

  today.setTime(targetdayilliseconds) // 注意，这行是关键代码

  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  return tYear + '-' + tMonth + '-' + tDate
}

export function getTimes (day) {
  var today = new Date()
  var targetdayilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  return targetdayilliseconds
}
export function doHandleMonth (month) {
  var m = month
  if (month.toString().length === 1) {
    m = '0' + month
  }
  return m
}
function StampgetTime (dateStr) {
  // 兼容mac
  const date = new Date(dateStr)
  return {
    getFullYear: date.getFullYear(),
    getMonth: (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
    getDate: date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
    getHours: date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
    getMinutes: date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
    getSeconds: date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  }
}
// 获取到分钟 2018-11-11 12:12
export function StampgetTimeM (dateStr) {
  const date = StampgetTime(dateStr)
  return `${date.getFullYear}-${date.getMonth}-${date.getDate} ${date.getHours}:${date.getMinutes}`
}

export function Dateformmate (fmt, date) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}
//获取每个月天数
export function mGetDate(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var d = new Date(year, month, 0);
  return d.getDate();
}
//返回 yy-mm
export function doHandleDate() {
  var myDate = new Date();
  var tYear = myDate.getFullYear();
  var tMonth = myDate.getMonth();

  var m = tMonth + 1;
  if (m.toString().length == 1) {
      m = "0" + m;
  }
  return tYear +'-'+ m;
}
//返回格式化日历时间
export function YmdGetDate() {
  var myDate = new Date();
  var tYear = myDate.getFullYear();
  var tMonth = myDate.getMonth();
  var tDay = myDate.getDate()
  var d = new Date(tYear, tMonth, tDay);
  return d;
}
export function getYearList(param) {
  let myDate = new Date();
  let nowYear = myDate.getFullYear();
  let min = nowYear - param;
  var temp = new Array();
  while (param >= 0){
    temp.push(min++);
    param--;
  }
  return temp
}

