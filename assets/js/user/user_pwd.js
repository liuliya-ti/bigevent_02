$(function () {
    // 1.密码验证规则
    var form = layui.form;
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码不能一致
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码不能和旧密码一致'
            }
        },
        // 两次密码一致
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }

    })

    // 2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改失败')
                }
                layui.layer.msg('修改成功');

                // 表单重置
                $('.layui-form')[0].reset();

            }
        })
    })
})