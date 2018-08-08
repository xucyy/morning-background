$(function(){

    var allUrl={//后台交互URL
        query:'../../../fundApply/FundApplyController/selectAllBkApplyTime',//加载表格
        sh:'../../../fundApply/FundApplyController/updateBkdSpStatus',//审核
        edit:'../../../fundApply/FundApplyController/selectBKApplyByPK'//查看
    };

    //单元格按钮事件
    window.operateEvents = {
        'click .btn-edit':function (e, value, row, index) {//修改
            $('#firstTable').bootstrapTable('uncheckAll'); //取消所有勾选项
            $('#win').modal('show');
        },
        'click .btn-submit':function (e, value, row, index) {//提交
            $('#firstTable').bootstrapTable('uncheckAll');
        },
        'click .btn-del':function (e, value, row, index) {//删除
            $('#firstTable').bootstrapTable('uncheckAll');
        }
    };

    var page = function () {

        return {
            // 加载表格
            getTab: function (id,url) {
                // 初始化第一个表格
                $('#'+id).bootstrapTable({
                    url: url,
                    queryParams: {
                        timeStart:$('#startTime').val().replace(/-/g, ''),
                        timeEnd:$('#endTime').val().replace(/-/g, ''),
                        sp_status:'01'
                    },
                    method: 'post',
                    contentType: "application/x-www-form-urlencoded",//当请求方法为post的时候,必须要有！！！！
                    dataField: "result",//定义从后台接收的字段，包括result和total，这里我们取result
                    pageNumber: 1, //初始化加载第一页
                    pageSize: 10,
                    pagination: true, // 是否分页
                    clickToSelect:true,
                    singleSelect:true,
                    sidePagination: 'server',//server:服务器端分页|client：前端分页
                    paginationHAlign: 'left',//分页条水平方向的位置，默认right（最右），可选left
                    paginationDetailHAlign: 'right',//paginationDetail就是“显示第 1 到第 8 条记录，总共 15 条记录 每页显示 8 条记录”，默认left（最左），可选right
                    columns:[    //表头
                        // {field: 'ck', checkbox: true},//checkbox列
                        {
                            field: 'number', title: '序号', align: 'center', formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },
                        {field: 'XZ', title: '编制日期', align: 'center'},
                        {field: 'SQSJ', title: '年份', align: 'center'},
                        {field: 'ACCOUNTONE', title: '季度', align: 'center'},
                        {field: 'BATCHNOONE', title: '经办人', align: 'center'},
                        {field: 'PDF_ADDRESS', title: '审批状态', align: 'center'},
                        {field: 'operate', title: '操作', align: 'center',events:operateEvents,formatter(row){
                                return '<button class="btn btn-primary btn-edit">修改</button>&nbsp;'+
                                    '<button class="btn btn-primary btn-submit">提交</button>&nbsp;'+
                                    '<button class="btn btn-primary btn-del">删除</button>'
                            },
                        }
                    ]
                });
            },

            //初始化其他组件
            getComponents: function () {
                //时间显示到日
                commonJS.showMonth('yyyy-mm-dd',2,'month',nowTime);
            },

            //初始化各类事件
            onEventListener: function () {
                //事件图标触发日期选择
                $('#timeIconOne').on('click',function () {
                    $('#startTime').trigger('focus');
                });
                $('#timeIconTwo').on('click',function () {
                    $('#endTime').trigger('focus');
                });

                //查询
                $('#btn-query').on('click', function () {
                    $('#firstTable').bootstrapTable('refresh');
                });

                //新增
                $('#btn-add').on('click',function () {
                    $('#win').show('');
                    $('#myModalLabel').html('新增审核表');
                });

                //修改
                $('#btn-edit').on('click',function () {
                    $('#win').show('');
                    $('#myModalLabel').html('修改审核表');
                })
            },

            init: function () {
                if (typeof JSON == 'undefined') {
                    $('head').append($("<script type='text/javascript' src='js/resource/json2.js'>"));
                }
                this.getComponents();
                //打开页面时先加载第一个表格
                this.getTab('firstTable',allUrl.query);
                this.onEventListener();
            }
        }
    }();
    page.init();
});