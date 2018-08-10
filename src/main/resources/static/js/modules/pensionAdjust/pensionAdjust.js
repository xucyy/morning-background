$(function(){

    var allUrl={//后台交互URL
        save:'../../../persionAdjust/PersionAdjustController/insert_PensionAdjust',//保存
        query:'../../../persionAdjust/PersionAdjustController/query_persionAdjust_pagedata',//加载表格
        sh:'../../../fundApply/FundApplyController/updateBkdSpStatus',//审核
        edit:'../../../fundApply/FundApplyController/selectBKApplyByPK'//查看
    };
    var cols=[    //表头
        // {field: 'ck', checkbox: true},//checkbox列
        {
            field: 'number', title: '序号', align: 'center', formatter: function (value, row, index) {
                return index + 1;
            }
        },
        {field: 'DWMC', title: '单位名称', align: 'center',editable:{type:'text'}},
        {field: 'SNJJJY', title: '上年末基金累计结余', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'DNJJSR', title: '当年基金预算收入', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'DNJJZC', title: '当年基金预算支出', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'YSJJJE', title: '预算应调剂补助基金金额', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'YJJJJY', title: '预计当年基金结余', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'YJJJSR', title: '预计当年基金征缴收入', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'DNYJZC', title: '当年基金预计支出', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'YJSZJY', title: '预计当年收支结余', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'SBKZS', title: '社保局审核预计动用历年累计结余控制数', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'SXJE', title: '市县申请调剂金额',align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'SBJE', title: '社保局审核调剂金额', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'CZJE', title: '财政厅核定调剂金额', align: 'right',halign:'center',editable:{type:'text'}},
        {field: 'DELID', title: '删除行', align: 'center',visible:false,formatter(value,row,index){return value+1}}//删除一行预定ID列
    ];

    //单元格按钮事件
    window.operateEvents = {
        'click .btn-edit':function (e, value, row, index) {//修改
            $('#firstTable').bootstrapTable('uncheckAll');
            $('#win').modal('show');
            $('#myModalLabel').html('编辑审核表');
            $("#modalTable").bootstrapTable('destroy').bootstrapTable({
                url: allUrl.query,
                queryParams: {
                    timeStart:$('#startTime').val().replace(/-/g, ''),
                    timeEnd:$('#endTime').val().replace(/-/g, '')
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
                columns:cols
            });
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
                        timeEnd:$('#endTime').val().replace(/-/g, '')
                    },
                    method: 'post',
                    contentType: "application/x-www-form-urlencoded",//当请求方法为post的时候,必须要有！！！！
                    dataField: "result",//定义从后台接收的字段，包括result和total，这里我们取result
                    pageNumber: 1, //初始化加载第一页
                    pageSize: 10,
                    pagination: true, // 是否分页
                    clickToSelect:true,
                    sidePagination: 'server',//server:服务器端分页|client：前端分页
                    paginationHAlign: 'left',//分页条水平方向的位置，默认right（最右），可选left
                    paginationDetailHAlign: 'right',//paginationDetail就是“显示第 1 到第 8 条记录，总共 15 条记录 每页显示 8 条记录”，默认left（最左），可选right
                    columns:[    //表头
                        {field: 'ck', checkbox: true},//checkbox列
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
                        {field: 'operate', title: '操作', align: 'center',events:operateEvents,formatter:function(row){
                                return '<button class="btn btn-primary btn-edit">修改</button>&nbsp;'+
                                '<button class="btn btn-primary btn-submit">提交</button>&nbsp;'+
                                '<button class="btn btn-primary btn-del">删除</button>&nbsp;'+
                                '<button class="btn btn-primary btn-sh">审核</button>&nbsp;'+
                                '<button class="btn btn-primary btn-disagree">驳回</button>'
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
                    $('#firstTable').bootstrapTable('uncheckAll');
                    $('#win').modal('show');
                    $('#myModalLabel').html('新增审核表');
                    $('#win input').val('');//新增置空
                    $('#win td span').html('');//新增置空
                    $("#modalTable").bootstrapTable('destroy').bootstrapTable({
                        pageNumber: 1, //初始化加载第一页
                        pageSize: 10,
                        pagination: true, // 是否分页
                        clickToSelect:true,
                        singleSelect:true,
                        sidePagination: 'server',//server:服务器端分页|client：前端分页
                        paginationHAlign: 'left',//分页条水平方向的位置，默认right（最右），可选left
                        paginationDetailHAlign: 'right',//paginationDetail就是“显示第 1 到第 8 条记录，总共 15 条记录 每页显示 8 条记录”，默认left（最左），可选right
                        columns:cols
                    });
                });

                //可编辑表格新增行
                $('.btn-plus').on('click',function () {
                    $('#modalTable').bootstrapTable('insertRow',
                        {index:$('#modalTable').bootstrapTable('getData').length,row:{
                            'DWMC':'',
                            'SNJJJY':'',
                            'DNJJSR':'',
                            'DNJJZC':'',
                            'YSJJJE':'',
                            'YJJJJY':'',
                            'YJJJSR':'',
                            'DNYJZC':'',
                            'YJSZJY':'',
                            'SBKZS':'',
                            'SXJE':'',
                            'SBJE':'',
                            'CZJE':'',
                            'DELID':$('#modalTable').bootstrapTable('getData').length+1
                    }})
                });

                //删除可编辑表格最后一行
                $('.btn-minus').on('click',function () {
                    $('#modalTable').bootstrapTable('remove',{field:'DELID',values:[$('#modalTable').bootstrapTable('getData').length]})
                });

                //保存
                $('#btn-save').on('click',function () {
                    console.log($('#modalTable').bootstrapTable('getData'));
                    var jsonObj={
                        id:$('#firstTable').bootstrapTable('getSelections').length==0?'':$('#firstTable').bootstrapTable('getSelections')[0].ID,
                        year:$('#year').val(),
                        month:$('#month').val(),
                        bzdate:$('#bzDate').val(),
                        shdate:$('#shDate').val(),
                        table:$('#modalTable').bootstrapTable('getData')
                    };
                    $.ajax({
                        url: allUrl.save,
                        type:"post",
                        dataType:'json',
                        data:{
                            pensionAdjustJson:JSON.stringify(jsonObj)
                        },
                        beforeSend:function (){
                            $('#myModal').modal('show');
                        },
                        success: function(result){
                            $('#myModal,#win').modal('hide');
                            //重新加载一次表格
                            $('#firstTable').bootstrapTable('refresh');
                            commonJS.confirm('消息',result.result,result.msg);
                        }
                    });
                })
            },

            init: function () {
                if (typeof JSON == 'undefined') {
                    $('head').append($("<script type='text/javascript' src='@{/js/resource/json2.js}'>"));                }
                this.getComponents();
                //打开页面时先加载第一个表格
                this.getTab('firstTable',allUrl.query);
                this.onEventListener();
            }
        }
    }();
    page.init();
});