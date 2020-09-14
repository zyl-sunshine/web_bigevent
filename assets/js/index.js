$(function () {
    getUsername()
})

function getUsername() {

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取数据失败')
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;

    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}

var layer = layui.layer;

$('#btnLogout').on('click', function () {
    //提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {

        // 1.清空本地存储中的token
        localStorage.removeItem('token');
        // 2.重新跳转到登录页面
        location.href = '/大事件/code/login.html';
        // 关闭询问框
        layer.close(index);
    })
})