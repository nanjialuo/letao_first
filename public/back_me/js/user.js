$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;
    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                var htmlstr = template("tpl", info);
                $("tbody").html(htmlstr);
                // 根据请求回来的数据, 完成分页的初始化显示
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        // 更新 currentPage, 并且重新渲染即可
                        currentPage = page;
                        render();
                    }
                })
            }
        })


        $("tbody").on("click", ".btn", function() {
            $("#userModal").modal("show");
            currentId = $(this).parent().data("id");
            isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        })

        $("#confirmBtn").click(function() {
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:currentId,
                    isDelete:isDelete
                },
                dataType:"json",
                success:function( info ) {
                    if(info.success) {
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })
        })

    }
})