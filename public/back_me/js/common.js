// 在发送第一个请求时  开启进度条

$(document).ajaxStart(function() {
    NProgress.start();
})

// 在所有的请求完成时,关闭进度条
$(document).ajaxStop(function() {
    setTimeout(function() {
        NProgress.done();
    }, 500)
})


// 公用的功能
// 1 左侧二级菜单的切换
// 2 左侧整体菜单的切换
// 3 公用退出

$(function() {
    $(".lt_aside .category").click(function() {
        $(this).next().stop().slideToggle();
    })

    $(".lt_topbar .icon_menu").click(function() {
        $(".lt_main").toggleClass("hidemenu");
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
    })

    $(".lt_topbar .icon_logout").click(function() {
        $("#logoutModal").modal("show");
    })

    $("#logoutBtn").click(function() {
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function( info ){
                if(info.success) {
                    location.href = "login.html";
                }
            }
        })
    })
})