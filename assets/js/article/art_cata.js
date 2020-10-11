$(function () {
    // 1.初始化文章列表
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            success: function (res) {
                var str = template("tpl-art-cate", res);
                $('tbody').html(str);

            }
        })
    }

    // 2.显示添加文章分类
    var layer = layui.layer;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        })
    })
    // 3.添加文章分类（事件代理）
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                initArtCateList();
                layer.msg('恭喜您，文章类别添加成功');
                layer.close(indexAdd)
            }
        })
    })
    // 4.修改 展示表单
    var indexEdit = null;
    var form = layui.form;
    $('tbody').on('click', ".btn-edit", function () {

        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });
        var Id = $(this).attr("data-id");
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val("form-edit", res.data);
            }
        })
    })

    // 5.修改 - 提交
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                initArtCateList();
                layer.msg('更新成功');
                layer.close(indexEdit);
            }
        })
    })
    // 6.删除
    $('tbody').on('click', '.btn-delete', function () {
        // 先获取id,后面进入对话框，this的指向就不一定
        var Id = $(this).attr("data-id");
        layer.confirm('是否确认删除？', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        initArtCateList();
                        layer.msg('删除成功');
                        layer.close(index);
                    }
            })
        })
    })

})