$(function(){

    var page;
    var allUrlOutcome={//后台交互URL
        pullDown:'../../../queryutils/QueryUtilsController/query_combobox',//获取下拉菜单
        query:'../../../outcomeinfo/OutcomeController/query_jf07_pagedata',//加载表格
        querySon:'../../../outcomeinfo/OutcomeController/query_jf07_pagedata_item',//子表
        queryGrandSon:'../../../outcomeinfo/OutcomeController/query_jf07_pagedata_child'//孙表
    };
    var columnsOne=[    //第一个表格表头
        {field:'ck',checkbox:true},
        {
            field: 'number', title: '序号', align: 'center', formatter: function (value, row, index) {
                return index + 1;
            }
        },
        {field: 'AAZ030', title: '业务支付计划ID', align: 'center'},
        {field: 'AAE140', title: '险种', align: 'center'},
        {field: 'AAA079', title: '拨付方式', align: 'center'},
        {field: 'AAE008', title: '发放银行', align: 'center'},
        {field: 'AAE009', title: '发放银行户名', align: 'center'},
        {field: 'AAE010', title: '发放银行账号', align: 'center'},
        {
            field: 'AAE019', title: '金额(元)', align: 'right', halign: 'center',
            formatter: function (value) {
                var num=parseFloat(value);
                return commonJS.thousandPoint(num.toFixed(2));
            }
        },
        {field: 'AAE011', title: '经办人', align: 'center'},
        {field: 'AAE036', title: '经办时间', align: 'center'}
    ];
    var columnsTwo=[
        {field:'ck',checkbox:true},
        {
            field: 'number', title: '序号', align: 'center', formatter: function (value, row, index) {
                return index + 1;
            }
        },
        {field: 'AAZ030', title: '业务支付计划ID', align: 'center'},
        {field: 'CWHZPCH', title: '财务汇总批次号', align: 'center'},
        {field: 'AAE140', title: '险种', align: 'center'},
        {field: 'AAA079', title: '拨付方式', align: 'center'},
        {field: 'DYRKFH', title: '待遇人开户行', align: 'center'},
        {field: 'AAE008', title: '发放银行', align: 'center'},
        {field: 'AAE009', title: '发放银行户名', align: 'center'},
        {field: 'AAE010', title: '发放银行账号', align: 'center'},
        {
            field: 'AAE019', title: '金额(元)', align: 'right', halign: 'center',
            formatter: function (value) {
                var num=parseFloat(value);
                return commonJS.thousandPoint(num.toFixed(2));
            }
        },
        {field: 'AAE011', title: '经办人', align: 'center'},
        {field: 'AAE036', title: '经办时间', align: 'center'}
    ];

    page = function () {

        return {
            // 加载表格
            getTab: function (id,url,columns) {
                $('#'+id).bootstrapTable({
                    url: url,
                    queryParams: function (params) {
                        return {
                            pageSize: params.limit, // 每页显示数量
                            pageNumber: params.offset / params.limit + 1,//当前页码
                            "AAE140": $('#safeSelect').selectpicker('val'),//险种
                            "AAA079":$('#bfSelect').selectpicker('val'),//拨付方式
                            "AAE035": $('.datetimepicker').val().replace(/-/g, '')//拨付时间
                        };
                    },
                    method: 'post',
                    contentType: "application/x-www-form-urlencoded",//当请求方法为post的时候,必须要有！！！！
                    dataField: "result",//定义从后台接收的字段，包括result和total，这里我们取result
                    pageNumber: 1, //初始化加载第一页
                    pageSize: 10,
                    // data:[{"AAZ031":"15"}],
                    pagination: true, // 是否分页
                    clickToSelect: true,
                    sidePagination: 'server',//server:服务器端分页|client：前端分页
                    paginationHAlign: 'left',//分页条水平方向的位置，默认right（最右），可选left
                    paginationDetailHAlign: 'right',//paginationDetail就是“显示第 1 到第 8 条记录，总共 15 条记录 每页显示 8 条记录”，默认left（最左），可选right
                    columns: columns,
                    onDblClickRow: function (row) {
                        $('#win').modal('show');
                        $('#clickData').bootstrapTable('destroy').bootstrapTable({
                            url: allUrlOutcome.querySon,
                            queryParams: function (params) {
                                var temp = {//如果是在服务器端实现分页，limit、offset这两个参数是必须的
                                    pageSize: params.limit, // 每页显示数量
                                    pageNumber: params.offset / params.limit + 1, //当前页码
                                    "AAZ031":row.AAZ031
                                };
                                return temp;
                            },
                            method: 'post',
                            contentType: "application/x-www-form-urlencoded",//当请求方法为post的时候,必须要有！！！！
                            dataField: "result",//定义从后台接收的字段，包括result和total，这里我们取result
                            // data:[{'AAZ030':'1'}],
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
                                {field: 'AAZ031', title: '主记录id', align: 'center'},
                                {field: 'AAZ220', title: '应付计划明细ID', align: 'center'},
                                {field: 'AAE140', title: '险种类型', align: 'center'},
                                {field: 'AAE002', title: '费款所属期', align: 'center'},
                                {field: 'AAE003', title: '对应费款所属期', align: 'center'},
                                {field: 'AAE008', title: '银行编码', align: 'center'},
                                {field: 'AAB070', title: '银行行名', align: 'center'},
                                {field: 'AAE009', title: '银行户名', align: 'center'},
                                {field: 'AAE010', title: '银行账号', align: 'center'},
                                {field: 'AAE019', title: '金额', align: 'right', halign: 'center',
                                    formatter: function (value) {
                                        var num=parseFloat(value);
                                        return commonJS.thousandPoint(num.toFixed(2));
                                    }
                                },
                                {field: 'AAA028', title: '缴费主体类型', align: 'center'},
                                {field: 'AAZ010', title: '缴费主体编号', align: 'center'},
                                {field: 'AAB003', title: '缴费主体身份代码', align: 'center'},
                                {field: 'AAB069', title: '缴费主体名称', align: 'center'},
                                {field: 'AAE117', title: '支付标志', align: 'center'},
                                {field: 'AAE118', title: '支付时间', align: 'center'},
                                {field: 'AAE160', title: '支付失败原因', align: 'center'},
                                {field: 'AAE013', title: '备注：给银行的附言', align: 'center'}
                            ],
                            //双击打开孙子表
                            onDblClickRow:function (rows) {
                                $('#winTwo').modal('show');
                                $('#clickDataSon').bootstrapTable('destroy').bootstrapTable({
                                    url: allUrlOutcome.queryGrandSon,
                                    queryParams: function (params) {
                                        var temp = {//如果是在服务器端实现分页，limit、offset这两个参数是必须的
                                            pageSize: params.limit, // 每页显示数量
                                            pageNumber: params.offset / params.limit + 1, //当前页码
                                            "AAZ220":rows.AAZ220
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
                                        {field: 'AAZ220', title: '应付计划明细ID', align: 'center'},
                                        {field: 'AAZ219', title: '人员应付计划项目明细ID', align: 'center'},
                                        {field: 'AAA036', title: '待遇项目代码', align: 'center'},
                                        {field: 'AAA085', title: '定期待遇标志', align: 'center'},
                                        {field: 'AAA088', title: '应付类型', align: 'center'},
                                        {field: 'AAE002', title: '费款所属期', align: 'center'},
                                        {field: 'AAE003', title: '对应费款所属期', align: 'center'},
                                        {field: 'AAE019', title: '金额', align: 'right', halign: 'center',
                                            formatter: function (value) {
                                                var num=parseFloat(value);
                                                return commonJS.thousandPoint(num.toFixed(2));
                                            }
                                        },
                                        {field: 'BIE505', title: '冲销标志', align: 'center'},
                                        {field: 'BIE504', title: '冲销时间', align: 'center'},
                                        {field: 'BIE506', title: '冲销流水号', align: 'center'},
                                        {field: 'YW001', title: '业务要素1', align: 'center'},
                                        {field: 'YW002', title: '业务要素2', align: 'center'},
                                        {field: 'YW003', title: '业务要素3', align: 'center'},
                                        {field: 'YW004', title: '业务要素4', align: 'center'},
                                        {field: 'YW005', title: '业务要素5', align: 'center'}
                                    ]
                                });
                            }
                        });
                    }
                });

                //页签中的表格初始化
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    // 获取已激活的标签页的名称
                    var activeTab = $(e.target).text();
                    if (activeTab == '未生成支付计划') {
                        $('#firstTable').bootstrapTable('refresh');
                        $('#btn-gen').prop('disabled',false);
                    }
                    else {
                        $('#secondTable').bootstrapTable('refresh');
                        $('#btn-gen').prop('disabled',true);
                    }
                });
            },

            //初始化其他组件
            getComponents: function () {
                $.ajaxSettings.async = false;//ajax同步设定

                //险种
                $.post(allUrlOutcome.pullDown,{
                    "valset_id": "AAE140"
                },function(result){
                    $('#safeSelect').append("<option value='-1'>全部</option>");
                    for (var i = 0; i < JSON.parse(result).result.length; i++) {
                        $('#safeSelect').append("<option value='"+JSON.parse(result).result[i].VAL_ID+"'>"
                            + JSON.parse(result).result[i].VAL + "</option>");
                    }
                    $('#safeSelect').selectpicker('refresh');
                });

                //拨付方式
                $.post(allUrlOutcome.pullDown,{
                    "valset_id": "AAA079"
                },function(result){
                    $('#bfSelect').append("<option value='-1'>全部</option>");
                    for (var i = 0; i < JSON.parse(result).result.length; i++) {
                        $('#bfSelect').append("<option value='"+JSON.parse(result).result[i].VAL_ID+"'>"
                            + JSON.parse(result).result[i].VAL + "</option>");
                    }
                    $('#bfSelect').selectpicker('refresh');
                });

                //时间显示到月
                commonJS.showMonth('yyyy-mm-dd',2,'month',nowTime);
                $.ajaxSettings.async = true;//改回异步

            },

            //初始化点击事件
            onEventListener: function () {
                //事件图标触发日期选择
                $('.glyphicon-time').on('click', function () {
                    $('.datetimepicker').eq(0).trigger('focus');
                });

//				查询
                $('#btn-query').on('click', function () {
                    //取当前active的标签页名
                    var activeTab = $('#myTab li.active').find('a').text();
                    if (activeTab == '未生成支付计划') {
                        $('#firstTable').bootstrapTable('refresh');
                    }
                    else {
                        $('#secondTable').bootstrapTable('refresh');
                    }
                });

                // 批量设置开发行
                $('#btn-bank').on('click',function () {
                    if($('#firstTable').bootstrapTable('getAllSelections').length==0&&$('#secondTable').bootstrapTable('getAllSelections').length==0){//未选择时提示
                        $.confirm({
                            title: '警告',
                            content: '请选择数据！',
                            buttons: {
                                ok: {
                                    text: '确认',
                                    btnClass: 'btn-primary',
                                    action: function() {
                                    }
                                },
                                cancel: {
                                    text: '取消',
                                    btnClass: 'btn-primary'
                                }
                            }
                        });
                    }
                    else{
                        $('#winBank').modal('show');

                    }
                });

                //确认设置
                $('#btn-sure').on('click',function () {
                    var ids = [];
                    var selectOne = $('#firstTable').bootstrapTable('getAllSelections');
                    var selectTwo=$('#secondTable').bootstrapTable('getAllSelections');
                    if(selectOne.length!=0){//若选择了第一个表格，推送第一个表格的ID集合
                        for (var i = 0; i < selectOne.length; i++) {
                            ids.push(selectOne[i].AAZ031);
                        }
                    }
                });

                //生成支付计划
                $('#btn-gen').on('click',function () {
                   if($('#firstTable').bootstrapTable('getSelections').length==0){
                       $.confirm({
                           title: '警告',
                           content: '请选择数据！',
                           buttons: {
                               ok: {
                                   text: '确认',
                                   btnClass: 'btn-primary',
                                   action: function() {
                                   }
                               },
                               cancel: {
                                   text: '取消',
                                   btnClass: 'btn-primary'
                               }
                           }
                       });
                   }
                   else{
                       $.ajax({

                       })
                   }
                });

            },
            init: function () {
                if (typeof JSON == 'undefined') {
                    $('head').append($("<script type='text/javascript' src='js/resource/json2.js'>"));
                }
                this.onEventListener();
                this.getComponents();
                this.getTab('firstTable',allUrlOutcome.query,columnsOne);
                this.getTab('secondTable',allUrlOutcome.query,columnsTwo);
            }
        }
    }();
    page.init();
});