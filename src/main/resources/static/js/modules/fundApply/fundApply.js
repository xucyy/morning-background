$(function(){

    var allUrlInCome={//后台交互URL
        pullDown:'../../../queryutils/QueryUtilsController/query_combobox',//获取下拉菜单
        query:'../../../Incomeinfo/IncomeController/query_ad68_pagedata',//加载表格
        querySon:'../../../Incomeinfo/IncomeController/query_ad68_pagedata_item'//加载子表
    };

    //单元格编辑事件
    window.operateEvents = {
        'click .btn-edit': function (e, value, row, index) {
            page.getEditTab('editZD');
        },
        'click .btn-del':function (e, value, row, index) {

        }
    };

    var page = function () {

        return {
            // 加载表格
            getTab: function (id,url) {
                // 初始化第一个表格
                $('#'+id).bootstrapTable({
                    url: url,
                    queryParams: function (params) {
                        var temp = {//如果是在服务器端实现分页，limit、offset这两个参数是必须的
                            pageSize: params.limit, // 每页显示数量
                            pageNumber: params.offset / params.limit + 1 //当前页码
                        };
                        return temp;
                    },
                    method: 'post',
                    contentType: "application/x-www-form-urlencoded",//当请求方法为post的时候,必须要有！！！！
                    dataField: "result",//定义从后台接收的字段，包括result和total，这里我们取result
                    pageNumber: 1, //初始化加载第一页
                    pageSize: 10,
                    pagination: true, // 是否分页
                    sidePagination: 'server',//server:服务器端分页|client：前端分页
                    paginationHAlign: 'left',//分页条水平方向的位置，默认right（最右），可选left
                    paginationDetailHAlign: 'right',//paginationDetail就是“显示第 1 到第 8 条记录，总共 15 条记录 每页显示 8 条记录”，默认left（最左），可选right
                    columns: [    //表头
                        //{field: 'ck', checkbox: true},//checkbox列
                        {
                            field: 'number', title: '序号', align: 'center', formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },
                        {field: 'AAE003', title: '险种', align: 'center'},
                        {field: 'BIE001', title: '申请时间', align: 'center'},
                        {field: 'AAE140', title: '申请单位账户名称', align: 'center'},
                        {field: 'AAA116', title: '申请单位银行账号', align: 'center'},
                        {field: 'AAA028', title: '申请单位开户行', align: 'center'},
                        {
                            field: 'AAE020', title: '本月申请金额（万元）', align: 'right', halign: 'center',
                            formatter: function (value) {
                                var num=parseFloat(value);
                                return commonJS.thousandPoint(num.toFixed(2));
                            }
                        },
                        {field: 'AAB119', title: '状态', align: 'center'},
                        {field: 'operate', title: '操作', align: 'center',events:operateEvents,formatter(row){
                                return '<button class="btn btn-primary btn-edit">编辑</button>&nbsp;'+
                                    '<button class="btn btn-primary btn-del">删除</button>'
                            },
                        }
                    ]
                });
            },

            //可编辑表格
            getEditTab:function(edit){
                if(edit=='addZD'){//制单新增
                    $("#myModalLabel").html('新增拨款申请单');//改变标题
                    $('#win').modal('show');
                    $('#btn-agree,#btn-disagree').addClass('hide');
                    $('#btn-save').removeClass('hide');
                }
                else if(edit=='editZD'){//制单编辑
                    $("#myModalLabel").html('编辑拨款申请单');//改变标题
                    $('#win').modal('show');
                    $('#btn-agree,#btn-disagree').addClass('hide');
                    $('#btn-save').removeClass('hide');
                }
                else if(edit=='SH'){//审核
                    $("#myModalLabel").html('拨款申请单审核');//改变标题
                    $('#btn-agree,#btn-disagree').removeClass('hide');
                    $('#btn-save').addClass('hide');//隐藏保存按钮
                    $('#win').modal('show');
                }
                else if(edit=='SP'){//审批
                    $("#myModalLabel").html('拨款申请单审批');//改变标题
                    $('#btn-agree,#btn-disagree').removeClass('hide');
                    $('#btn-save').addClass('hide');//隐藏保存按钮
                    $('#win').modal('show');
                }
            },

            //初始化其他组件
            getComponents: function () {
                //时间显示到日
                commonJS.showMonth('yyyy-mm-dd',2,'month',nowTime);
            },

            //初始化点击事件
            onEventListener: function () {
                //事件图标触发日期选择
                $('#timeIconOne').on('click',function () {
                    $('#startTime').trigger('focus');
                });
                $('#timeIconTwo').on('click',function () {
                    $('#endTime').trigger('focus');
                });

                //新增
                $('#btn-add').on('click',function () {
                    page.getEditTab('addZD');
                });

                //保存
                $('#btn-save').on('click',function(){

                });

				//查询
                $('#btn-query').on('click', function () {
                    $('#firstTable').bootstrapTable('refresh');
                });
            },

            init: function () {
                if (typeof JSON == 'undefined') {
                    $('head').append($("<script type='text/javascript' src='js/resource/json2.js'>"));
                }
                this.getComponents();
                //打开页面时先加载第一个表格
                this.getTab('firstTable',allUrlInCome.query);
                this.onEventListener();
            }
        }
    }();
    page.init();
});