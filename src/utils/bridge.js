
export function bridge(type) {
    /**
                       * js 跟APP交互
                       * */
    var AppData = Object.assign(
        { type: type },
    );
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X)/); //ios终端
    if (isiOS) {
        window.webkit.messageHandlers.setLocal.postMessage(type);
    } else if (isAndroid) {
        android.setLocal(type);
    }
}
export function updataInfo(value) {
    /**
                       * js 跟APP交互
                       * */
    var AppData = Object.assign(
        { value: value },
    );
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X)/); //ios终端
    if (isiOS) {
        window.webkit.messageHandlers.updataInfo.postMessage(AppData);
    } else if (isAndroid) {
        android.updataInfo(AppData);
    }
}