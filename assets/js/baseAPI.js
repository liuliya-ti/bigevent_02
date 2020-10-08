// 1.开发换将服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
// 2.测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";
// 3.生产环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";

// 拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;

    // 对需要权限的接口配置头信息
    if (params.url.indexOf('/my/') !== -1) {
        params.headers =  {
            Authorization:localStorage.getItem('token') || ''
        }
    }


    // 拦截所有的响应，判断身份认证信息
    params.complete = function(res) {
        console.log(res);
        //判断，如果是身份认证失败，跳转回登录页面
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 删除本地token
            localStorage.removeItem("token");
            // 页面跳转
            location.href = 'login.html';
        }
    }
})