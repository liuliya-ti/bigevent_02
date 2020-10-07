// 1.开发换将服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
// 2.测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";
// 3.生产环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";

// 拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;
})