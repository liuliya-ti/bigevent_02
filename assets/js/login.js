$(function () {
    // 1.登录注册点击跳转
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 2.自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val();
            if (value !== pwd) {
                return "两次密码输入不一致！"
            }
        }

    });

    var layer = layui.layer;
    // 3.注册功能
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理的代码
                layer.msg("注册成功，请登录");
                // 手动切换到登录表单
                $("#link_login").click();
            }
        })
    })

    // 4.登录功能
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 提示信息，保存token,跳转页面
                layer.msg('登录成功');
                // 保存token,未来接口要用token
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            }
        })
    })
})