$(function(){

    var allUrl={//后台交互URL
        query:'../../../fundApply/FundApplyController/selectAllBkApplyTime',//加载表格
        sh:'../../../fundApply/FundApplyController/updateBkdSpStatus',//审核
        edit:'../../../fundApply/FundApplyController/selectBKApplyByPK'//查看
    };

    //单元格按钮事件
    window.operateEvents = {
        'click .btn-see':function (e, value, row, index) {//查看
            $('#firstTable').bootstrapTable('uncheckAll'); //新增时取消所有勾选项
            $('#win').modal('show');
            $('#win input').attr('readonly','readonly');//不可编辑
            $.ajax({
                url: allUrl.edit,
                type:"post",
                dataType:'json',
                data:{
                    bkdId:row.BKD_ID
                },
                beforeSend:function (){
                    $('#myModal').modal('show');
                },
                success: function(result){
                    $('#myModal').modal('hide');
                    // 插数
                    $('#year').val(result.year);
                    $('#month').val(result.month);
                    $('#day').val(result.day);
                    $('#xz').val(result.xz);
                    $('#monthend').val(result.monthend);
                    $('#lastyearlast').val(result.lastyearlast);
                    $('#thisyearpre').val(result.thisyearpre);
                    $('#thisyearplus').val(result.thisyearplus);
                    $('#monthplus').val(result.monthplus);
                    $('#lastmonthlast').val(result.lastmonthlast);
                    $('#thismonthapply').val(result.thismonthapply);
                    $('#bz').val(result.bz);
                    $('#tsbkone').val(result.tsbkone);
                    $('#tsbktwo').val(result.tsbktwo);
                    $('#tsbkthree').val(result.tsbkthree);
                    $('#accountone').val(result.accountone);
                    $('#batchnoone').val(result.batchnoone);
                    $('#bankone').val(result.bankone);
                    $('#moneybig').val(result.moneybig);
                    $('#moneysmall').val(result.moneysmall);
                    $('#accounttwo').val(result.accounttwo);
                    $('#batchnotwo').val(result.batchnotwo);
                    $('#banktwo').val(result.banktwo);
                    $('#sqdwfzr').val(result.sqdwfzr);
                    $('#sqdwshr').val(result.sqdwshr);
                    $('#sqdwjbr').val(result.sqdwjbr);
                    $('#czsbld').val(result.czsbld);
                    $('#czsbshr').val(result.czsbshr);
                    $('#czsbzg').val(result.czsbzg);
                    $('#gkone').val(result.gkone);
                    $('#gktwo').val(result.gktwo);
                    $('#gkthree').val(result.gkthree);
                }
            });
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
                        {field: 'ck', checkbox: true},//checkbox列
                        {
                            field: 'number', title: '序号', align: 'center', formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },
                        {field: 'XZ', title: '险种', align: 'center'},
                        {field: 'SQSJ', title: '申请时间', align: 'center'},
                        {field: 'ACCOUNTONE', title: '申请单位账户名称', align: 'center'},
                        {field: 'BATCHNOONE', title: '申请单位银行账号', align: 'center'},
                        {field: 'BANKONE', title: '申请单位开户行', align: 'center'},
                        {
                            field: 'THISMONTHAPPLY', title: '本月申请金额（万元）', align: 'right', halign: 'center',
                            formatter: function (value) {
                                var num=parseFloat(value);
                                return commonJS.thousandPoint(num.toFixed(2));
                            }
                        },
                        {field: 'PDF_ADDRESS', title: '生成PDF地址', align: 'center'},
                        {field: 'SP_STATUS', title: '状态', align: 'center'},
                        {field: 'operate', title: '操作', align: 'center',events:operateEvents,formatter(row){
                                return '<button class="btn btn-primary btn-see">查看</button>&nbsp;'
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

            //初始化点击事件
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

                //审核
                $('#btn-sh').on('click',function () {
                   if($('#firstTable').bootstrapTable('getSelections').length==0){
                       commonJS.confirm('警告','请选择数据！');
                   }
                   else if($('#firstTable').bootstrapTable('getSelections')[0].SP_STATUS!='01'){
                       commonJS.confirm('警告','已审核，不可再次审核！');
                   }
                   else{
                        $.ajax({
                           url: allUrl.sh,
                           type:"post",
                           dataType:'json',
                           data:{
                               bkdId:$('#firstTable').bootstrapTable('getSelections')[0].BKD_ID,
                               sp_status:'02',
                               sp_name:'审核'
                           },
                           beforeSend:function (){
                               $('#myModal').modal('show');
                           },
                           success: function(result){
                               $('#myModal').modal('hide');
                               //重新加载一次表格
                               $('#firstTable').bootstrapTable('refresh');
                               commonJS.confirm('消息',result.result,result.msg);
                           }
                        });
                   }
                });

                //驳回
                $('#btn-disagree').on('click',function () {
                    if($('#firstTable').bootstrapTable('getSelections').length==0){
                        commonJS.confirm('警告','请选择数据！');
                    }
                    else if($('#firstTable').bootstrapTable('getSelections')[0].SP_STATUS=='03'){
                        commonJS.confirm('警告','已审批，不可驳回！');
                    }
                    else{
                        $.ajax({
                            url: allUrl.sh,
                            type:"post",
                            dataType:'json',
                            data:{
                                bkdId:$('#firstTable').bootstrapTable('getSelections')[0].BKD_ID,
                                sp_status:'00',
                                sp_name:'驳回'
                            },
                            beforeSend:function (){
                                $('#myModal').modal('show');
                            },
                            success: function(result){
                                $('#myModal').modal('hide');
                                //重新加载一次表格
                                $('#firstTable').bootstrapTable('refresh');
                                commonJS.confirm('消息',result.result,result.msg);
                            }
                        });
                    }
                });
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