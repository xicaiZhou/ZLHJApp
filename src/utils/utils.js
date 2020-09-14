import store from '../store/index'
export function getValue(type,index){
    if(type == "1"){ // 选择与主借人关系
        var relationValue = ""
        switch (parseInt(index)) {
            case 1: {
              relationValue = "本人";
              break;
            }
            case 2: {
              relationValue = "夫妻";
              break;
            }
            case 3: {
              relationValue = "父母";
              break;
            }
            case 4: {
              relationValue = "子女";
              break;
            }
            case 5: {
              relationValue = "兄弟姐妹";
              break;
            }
            case 6: {
              relationValue = "同事";
              break;
            }
            case 7: {
              relationValue = "其他";
              break;
            }
          }
        return relationValue;
    }else if(type == "2"){
        switch (parseInt(index)) {
            case 1: {
              return "身份证";
              break;
            }
            case 2: {
              return "社会统一信用代码";
              break;
            }
        }
    }else if(type == "3"){
      switch (parseInt(index)) {
          case 1: {
            return "未婚";
            break;
          }
          case 2: {
            return "已婚";
            break;
          }
          case 3: {
            return "丧偶";
            break;
          }
          case 4: {
            return "离婚";
            break;
          }
      }
  }else if(type == "4"){
    switch (parseInt(index)) {
        case 1: {
          return "标准受薪";
          break;
        }
        case 2: {
          return "自雇人士";
          break;
        }
        case 3: {
          return "自由职业";
          break;
        }
      }
    }else if(type == "5"){
      switch (parseInt(index)) {
          case 1: {
            return "中华人民共和国";
            break;
          }
       }        
    }else if(type == "6"){
      switch (parseInt(index)) {
          case 1: {
            return "自然人";
            break;
          }
          case 2: {
            return "企业";
            break;
          }
       }        
    }else if(type == "7"){
      switch (parseInt(index)) {
          case 1: {
            return "硕士及以上";
            break;
          }
          case 2: {
            return "本科";
            break;
          }
          case 3: {
            return "大专";
            break;
          }
          case 4: {
            return "高中/中专";
            break;
          }
          case 5: {
            return "初中及以下";
            break;
          }
       }        
    }else if(type == "8"){
      switch (parseInt(index)) {
          case 1: {
            return "自购无按揭";
            break;
          }
          case 2: {
            return "按揭";
            break;
          }
          case 3: {
            return "亲属住房";
            break;
          }
          case 4: {
            return "宅基地房";
            break;
          }
          case 5: {
            return "租房";
            break;
          }
        }
      }else if(type == "9"){
        switch (parseInt(index)) {
            case 1: {
              return "自用";
              break;
            }
            case 2: {
              return "出租";
              break;
            }
            case 3: {
              return "空置";
              break;
            }
            
          }
        }else if(type == "10"){
          switch (parseInt(index)) {
              case 1: {
                return "政府机关/事业单位";
                break;
              }
              case 2: {
                return "国企";
                break;
              }
              case 3: {
                return "外资/合资";
                break;
              }
              case 4: {
                return "国企";
                break;
              }
              case 5: {
                return "民营";
                break;
              }
              case 6: {
                return "个体";
                break;
              }
              case 7: {
                return "其他";
                break;
              }
            }
          }else if(type == "11"){
            switch (parseInt(index)) {
                case 1: {
                  return "高层";
                  break;
                }
                case 2: {
                  return "中层";
                  break;
                }
                case 3: {
                  return "基层";
                  break;
                }
                case 4: {
                  return "一般员工";
                  break;
                }
                case 5: {
                  return "销售类员工";
                  break;
                }
                case 6: {
                  return "操作类员工";
                  break;
                }
                case 7: {
                  return "非正式员工";
                  break;
                }
                case 8: {
                  return "其他";
                  break;
                }
                case 9: {
                  return "无";
                  break;
                }
              }
            }else if(type == "12"){
              switch (parseInt(index)) {
                  case 1: {
                    return "身份证";
                    break;
                  }
              }
          }else if(type == "13"){
            // ["法人", "实际使用人", "股东", "高管", "其他"]
            switch (parseInt(index)) {
                case 1: {
                  return "本人";
                  break;
                }
                case 2: {
                  return "法人";
                  break;
                }
                case 3: {
                  return "实际使用人";
                  break;
                }
                case 4: {
                  return "股东";
                  break;
                }
                case 5: {
                  return "高管";
                  break;
                }
                case 6: {
                  return "其他";
                  break;
                }
            }
        }else if(type == "14"){
          // ["法人", "实际使用人", "股东", "高管", "其他"]
          switch (parseInt(index)) {
              case 1: {
                return "行外员工";
                break;
              }
              case 2: {
                return "行内员工";
                break;
              }
              case 3: {
                return "优良职业";
                break;
              }
              case 4: {
                return "低风险客户";
                break;
              }
              case 5: {
                return "其他客户";
                break;
              }
          }
      }else if(type == "15"){
        switch(parseInt(index)){
          case 1: {
            return "承租人";
            break;
          }
          case 2: {
            return "配偶";
            break;
          }
          case 3: {
            return "担保人";
            break;
          }
          case 4: {
            return "共借人";
            break;
          }
          case 6: {
            return "共借人与配偶";
            break;
          }
        }
      }else if(type == "16"){
          var str = '';
          switch (parseInt(index)) {
              case 2 :
                  str += '待人工征信查询';
                  break;
              case 3 :
                  str += '人工征信退回';
                  break;
              case 4 :
                  str += '人行征信审核拒绝';
                  break;
              case 5 :
                  str += '人行征信审核通过';
                  break;
              case 6:
                  str += '反欺诈校验中';
                  break;
              case 7 :
                  str += '预审拒绝';
                  break;
              case 8 :
                  str += '预审通过';
                  break;
              case 9 :
                  str += '已创建申请';
                  break;
              default:
                  str += "";
          }
          return str;
      }
}
export function getKey(value,list){
        
    for (let item in list){
        if (value == list[item]){
            return ++item 
        }
    }
    
}

export function isEmpty(value){

  if (value == null || value == ""){
    return true
  }
  return false

}

// 根据code码获取省市区
// param : {province:'',city:'',area:''}
export function getAddress (param) {
  
  let addressList = store.state.address;
  var province = ""
  var city = ""
  var area = ""
      
    for (let key in addressList.province_list){
      if (param.province == key){
        province = addressList.province_list[key]
      }
    }

    for (let key in addressList.city_list){
      if (param.city == key){
        city = addressList.city_list[key]
      }
    }

    for (let key in addressList.county_list){
      if (param.area == key){
        area = addressList.county_list[key]
      }
    }
    return province + city + area;
}