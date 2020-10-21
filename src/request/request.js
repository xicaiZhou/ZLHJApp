import axios from 'axios';
import {Toast} from 'vant';
import { Dialog } from 'vant';
import store from '../store/index'
import { bridge } from "../utils/bridge";
/** 创建axios实例*/
const request = axios.create({})


/** global config */
request.defaults.baseURL = process.env.API_HOST;
request.defaults.headers.post['Content-Type'] = 'application/json';
request.defaults.timeout = 30000;
request.defaults.withCredentials = true;
/** request interceptor*/
request.interceptors.request.use(
    config => {
		config.headers.common["token"] = store.state.userInfo.token;
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/** response interceptor*/
request.interceptors.response.use(
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {

      if(response.data.code == 200){
        return response;
      }else{
		Dialog({ message: response.data.message });
		Toast.clear();
        // Toast({
        //   message: response.data.message,
        //   type: 'error',
        //   duration: 2* 1000
        // })
        return Promise.reject()
      }


    },
    error => {
				if (error && error.response) {
					switch (error.response.status) {
						case 302:
							error.message = '登录已过期，请重新登录'
							bridge(5)
							break;
						case 400:
							error.message = '错误请求'
							break;
						case 401:
							error.message = '授权错误，请重新登录'
							bridge(5)
							break;
						case 403:
							error.message = '登录过期，拒绝访问'
							break;
						case 404:
							error.message = '请求错误，未找到该资源'
							break;
						case 405:
							error.message = '请求方法未允许'
							break;
						case 408:
							error.message = '请求超时'
							break;
						case 500:
							error.message = '服务器出错'
							break;
						case 501:
							error.message = '网络未实现'
							break;
						case 502:
							error.message = '网络错误,服务更新中...'
							break;
						case 503:
							error.message = '服务不可用'
							break;
						case 504:
							error.message = '网络超时'
							break;
						case 505:
							error.message = 'http版本不支持该请求'
							break;
						default:
								error.message = `连接错误${error.response.status}`
							break;
					}
				}else {// 跨域获取不到状态码或者其他状态码进行的处理
					error.message = '遇到点问题'
				}
        Toast({
            message: error.message,
            type: 'error',
            duration: 2* 1000
        })
      // this.$router.push('/index');
        return Promise.reject(error)
    }
)

export default request