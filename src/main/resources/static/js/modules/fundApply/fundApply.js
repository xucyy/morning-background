
$(function(){

    var allUrl={//后台交互URL
        query: ctx+'/fundApply/FundApplyController/selectAllBkApplyTime',//加载表格
        save:ctx+'/fundApply/FundApplyController/insert_FmBkApply',//保存申请单
        edit:ctx+'/fundApply/FundApplyController/selectBKApplyByPK',//编辑申请单
        del:ctx+'/fundApply/FundApplyController/deleteBKApplyByPK',//删除申请单
        sendPdf:ctx+'/fundApply/FundApplyController/createBKpdfToLocal',//向后台发送PDF编码
        zd:ctx+'/fundApply/FundApplyController/updateBkdSpStatus',//制单
        sendCZ:ctx+'/fundApply/FundApplyController/send_bkd_to_czsb',//发财政地址
        fileList:ctx+'/module/files/listByBillId',//fileList
        uploadFile:ctx+'/module/files/uploadFile'
    };

    var fileCount = 0;
    var billId = ''
    //单元格按钮事件
    window.operateEvents = {
        'click .btn-edit': function (e, value, row, index) {//编辑
            $('#firstTable').bootstrapTable('uncheckAll');//编辑前将选中事件清空
            if(row.SP_STATUS!='00'){//判断若已经被审核后，则不可再次编辑
                commonJS.confirm('警告','已制单不可编辑！')
            }
            else{
                page.getEditTab('editZD');
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
        },
        'click .btn-del':function (e, value, row, index) {//删除
            $('#firstTable').bootstrapTable('uncheckAll');
            if(row.SP_STATUS!='00'){//判断若已经被审核后，则不可删除
                commonJS.confirm('警告','已制单不可删除！')
            }
            else{
                commonJS.confirm('提示','确认删除？','',function(){
                    $.ajax({
                        url: allUrl.del,
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
                            $('#firstTable').bootstrapTable('refresh');
                            commonJS.confirm('提示',result.result,result.msg);
                        }
                    });
                });
            }
        },
        'click .btn-see':function (e, value, row, index) {//查看
            page.getEditTab('CK');
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
                    //打开加载页面

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
        },
        'click .btn-appendix':function (e, value, row, index) {//上传附件
            $('#firstTable').bootstrapTable('uncheckAll');
            layer.open({
                type: 1,
                title: '文件上传',
                closeBtn: 1,
                area: ['850px', '480px'],
                shadeClose: true,
                skin: 'yourclass',
                content: $('#file')
            });
            // page.initUploadOption(row.BKD_ID);
            billId = row.BKD_ID
        },
        'click .btn-fileList':function (e, value, row, index) {//查看附件
            $('#firstTable').bootstrapTable('uncheckAll');
            layer.open({
                type: 1,
                title: '附件列表',
                closeBtn: 1,
                area: ['850px', '480px'],
                shadeClose: true,
                skin: 'yourclass',
                content: $('#fileList')
            });
            page.fileListTable('fileListTabl',allUrl.fileList,row.BKD_ID);
        },
        'click .btn-sign':function (e, value, row, index) {//签章
            $('#firstTable').bootstrapTable('uncheckAll');
            page.getEditTab('QZ');
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
                    $('#win input').attr('readonly','readonly');//签章只读
                }
            });
        },
        'click .btn-zd':function (e, value, row, index) {//制单
            $('#firstTable').bootstrapTable('uncheckAll');
            if(row.SP_STATUS!='00'){
                commonJS.confirm('警告','已制单，不可再次制单！');
            }
            else{
                $.ajax({
                    url: allUrl.zd,
                    type:"post",
                    dataType:'json',
                    data:{
                        bkdId:row.BKD_ID,
                        sp_status:'01',
                        sp_name:'制单'
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
        },

    };

    var colOne=[    //表头
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
        {field: 'SP_STATUS_NAME', title: '状态', align: 'center'},
        {field: 'operate', title: '操作', align: 'center',events:operateEvents,formatter(row){
                return '<button class="btn btn-primary btn-edit">编辑</button>&nbsp;'+
                '<button class="btn btn-primary btn-del">删除</button>&nbsp;'+
                '<button class="btn btn-primary btn-appendix">上传附件</button>&nbsp;'+
                '<button class="btn btn-primary btn-fileList">查看附件</button>&nbsp;'+
                '<button class="btn btn-primary btn-sign">签章</button>&nbsp;'+
                '<button class="btn btn-primary btn-zd">制单</button>&nbsp;'
            },
        }
    ];
    var colTwo=[    //表头
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
        {field: 'SP_STATUS_NAME', title: '状态', align: 'center'},
        {field: 'operate', title: '操作', align: 'center',events:operateEvents,formatter(row){
                return '<button class="btn btn-primary btn-see">查看</button>&nbsp;'
            },
        }
    ];

    var page = function () {

        return {
            // 加载表格
            getTab: function (id,url,cols,sta) {
                // 初始化第一个表格
                $('#'+id).bootstrapTable({
                    url: url,
                    queryParams: {
                        timeStart:$('#startTime').val().replace(/-/g, ''),
                        timeEnd:$('#endTime').val().replace(/-/g, ''),
                        send_status:sta
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
                    columns:cols
                });
            },

            //可编辑表格
            getEditTab:function(edit){
                if(edit=='addZD'){//制单新增
                    $('#firstTable').bootstrapTable('uncheckAll'); //新增时取消所有勾选项
                    $('#win').modal('show');
                    $("#myModalLabel").html('新增拨款申请单');//改变标题
                    for(var i=0;i<$('#win input').length;i++){
                        $('#win input').eq(i).val('');//新增表格置空
                    }
                    $('#btn-pdf').addClass('hide');
                    $('#btn-save').removeClass('hide');
                    $('#win input').attr('readonly',false);//input可编辑
                }
                else if(edit=='editZD'){//制单编辑
                    $('#win').modal('show');
                    $("#myModalLabel").html('编辑拨款申请单');//改变标题
                    $('#btn-pdf').addClass('hide');
                    $('#btn-save').removeClass('hide');
                    $('#win input').attr('readonly',false);//input可编辑
                }
                else if(edit=='QZ'){//签章
                    $('#win').modal('show');
                    $("#myModalLabel").html('拨款申请单盖章');//改变标题
                    $('#btn-save').addClass('hide');
                    $('#btn-pdf').removeClass('hide');
                    $('#win input').attr('readonly','readonly');//input不可编辑
                }
                else if(edit='CK'){//查看
                    $('#win').modal('show');
                    $("#myModalLabel").html('查看已发财政拨款单');//改变标题
                    $('#btn-save,#btn-pdf').addClass('hide');
                    $('#win input').attr('readonly','readonly');//input不可编辑
                }
            },

            //初始化其他组件
            getComponents: function () {
                //时间显示到日
                commonJS.showMonth('yyyy-mm-dd',2,'month',nowTime);
            },

            //初始化文件上传
            initUploadOption: function (param) {
                Dropzone.autoDiscover = false;//解决两次实例Dropzone错误，可在控制台看到该错误
                $("#myDropzone").dropzone({
                    url: allUrl.uploadFile,
                    addRemoveLinks: true,
                    dictCancelUploadConfirmation:'你确定要取消上传吗？',
                    dictResponseError: '文件上传失败!',
                    dictCancelUpload: "取消上传",
                    dictCancelUploadConfirmation: "你确定要取消上传吗?",
                    dictRemoveFile: "移除文件",
                    headers:{
                        'billId':param
                    },
                    init:function () {
                        this.on('success',function (file) {
                            console.log(file);
                            commonJS.confirm('消息','上传成功！');
                            this.removeFile(file);
                        });
                        this.on('sending',function(data,xhr,formData){
                            formData.append('billId',billId);
                            formData.append('seqNo',fileCount);
                            console.log(formData);
                        })
                    }
                });
            },

            //加载查看附件表格
            fileListTable:function(id,url,param){
                try{
                    $('#'+id).bootstrapTable('destroy')
                }catch (e) {

                }
                $('#'+id).bootstrapTable({
                    url: url,
                    queryParams:{
                        'billId':param
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
                    columns: [    //表头
                        // {field: 'ck', checkbox: true},//checkbox列
                        {
                            field: 'number', title: '序号', align: 'center', formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },
                        {field: 'XZ', title: '文件名', align: 'center'},
                        {field: 'SQSJ', title: '上传时间', align: 'center'},
                        {field: 'ACCOUNTONE', title: '上传人', align: 'center'}
                        // {field: 'operate', title: '操作', align: 'center',events:operateEvents,formatter(row){
                        //         return '<button class="btn btn-primary btn-edit">编辑</button>&nbsp;'+
                        //             '<button class="btn btn-primary btn-del">删除</button>'
                        //     },
                        // }
                    ]
                });
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
                        //参数
                    var jsonObj= {
                        "year": $('#year').val(),
                        "month": $('#month').val(),
                        "day": $('#day').val(),
                        "xz": $('#xz').val(),
                        "monthend": $('#monthend').val(),
                        "lastyearlast": $('#lastyearlast').val(),
                        "thisyearpre": $('#thisyearpre').val(),
                        "thisyearplus": $('#thisyearplus').val(),
                        "monthplus": $('#monthplus').val(),
                        "lastmonthlast": $('#lastmonthlast').val(),
                        "thismonthapply": $('#thismonthapply').val(),
                        "bz": $('#bz').val(),
                        "tsbkone": $('#tsbkone').val(),
                        "tsbktwo": $('#tsbktwo').val(),
                        "tsbkthree": $('#tsbkthree').val(),
                        "accountone": $('#accountone').val(),
                        "batchnoone": $('#batchnoone').val(),
                        "bankone": $('#bankone').val(),
                        "moneybig": $('#moneybig').val(),
                        "moneysmall": $('#moneysmall').val(),
                        "accounttwo": $('#accounttwo').val(),
                        "batchnotwo": $('#batchnotwo').val(),
                        "banktwo": $('#banktwo').val(),
                        "sqdwfzr": $('#sqdwfzr').val(),
                        "sqdwshr": $('#sqdwshr').val(),
                        "sqdwjbr": $('#sqdwjbr').val(),
                        "czsbzg": $('#czsbzg').val(),
                        "czsbshr": $('#czsbshr').val(),
                        "czsbld": $('#czsbld').val(),
                        "gkone": $('#gkone').val(),
                        "gktwo": $('#gktwo').val(),
                        "gkthree": $('#gkthree').val(),
                        //进行判断，新增时不会选择数据，此时BKD_ID传空
                        "bkdId":$('#firstTable').bootstrapTable('getSelections').length!=0?$('#firstTable').bootstrapTable('getSelections')[0].BKD_ID:''
                    };
                    $.ajax({
                        url: allUrl.save,
                        type:"post",
                        dataType:'json',
                        data:{
                            bkdJson:JSON.stringify(jsonObj)
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
                });

				//查询
                $('#btn-query').on('click', function () {
                    $('#firstTable').bootstrapTable('refresh');
                });

                //签章
                $('#btn-sign').on('click',function () {
                    if($('#firstTable').bootstrapTable('getSelections').length==0){
                        commonJS.confirm('警告','请选择数据！');
                    }
                    else if($('#firstTable').bootstrapTable('getSelections').length>1){
                        commonJS.confirm('警告','只能选择一条数据！');
                    }
                    else{

                    }
                });

                //生成pdf
                $('#btn-pdf').on('click',function () {
                    var printPdf=$('#win .modal-body');
                    var height = printPdf.height();
                    //克隆节点，默认为false，不复制方法属性，为true是全部复制。
                    var cloneDom =printPdf.clone(true);
                    //设置克隆节点的css属性，因为之前的层级为0，我们只需要比被克隆的节点层级低即可。
                    cloneDom.css({
                        "background-color": "white",
                        "position": "absolute",
                        "top": "0px",
                        "z-index": "-1",
                        "height": height
                    });
                    //将克隆节点动态追加到body后面。
                    $("body").append(cloneDom);
                    //插件生成base64img图片。
                    html2canvas(cloneDom, {
                        //Whether to allow cross-origin images to taint the canvas
                        allowTaint: true,
                        //Whether to test each image if it taints the canvas before drawing them
                        taintTest: false,
                        onrendered: function(canvas) {
                            var contentWidth = canvas.width;
                            var contentHeight = canvas.height;


                            //一页pdf显示html页面生成的canvas高度;
                            var pageHeight = contentWidth / 592.28 * 841.89;
                            //未生成pdf的html页面高度
                            var leftHeight = contentHeight;
                            //页面偏移
                            var position = 30;
                            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                            var imgWidth = 595.28;
                            var imgHeight = 595.28/contentWidth * contentHeight;
                            var pageData = canvas.toDataURL('image/jpeg', 1.0);
                            var pdf = new jsPDF('', 'pt', 'a4');
                            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                            //当内容未超过pdf一页显示的范围，无需分页
                            if (leftHeight < pageHeight) {
                                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
                            } else {
                                while(leftHeight > 0) {
                                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                                    leftHeight -= pageHeight;
                                    position -= 841.89;
                                    //避免添加空白页
                                    if(leftHeight > 0) {
                                        pdf.addPage();
                                    }
                                }
                            }
                            var fileCode=pdf.output("datauristring");//生成文件base64编码
                            $.ajax({
                                url: allUrl.sendPdf,
                                type:"post",
                                dataType:'json',
                                data:{
                                    base64Pdf:fileCode,
                                    bkdId:$("#firstTable").bootstrapTable('getSelections')[0].BKD_ID
                                },
                                beforeSend:function (){
                                    $('#myModal').modal('show');
                                },
                                success: function(result){
                                    //移除浅度克隆多出来的节点
                                    $('.modal-body')[1].remove();
                                    $('#myModal,#win').modal('hide');
                                    $('#firstTable').bootstrapTable('refresh');
                                    commonJS.confirm('消息',result.result,result.msg);
                                }
                            });
                        }
                    });
                });

                //发送财政
                $('#btn-sendCZ').on('click',function () {
                    if($('#firstTable').bootstrapTable('getSelections').length==0){
                        commonJS.confirm('警告','请选择数据！');
                    }
                    else{
                        var flag=true;//判断是否满足发财政条件
                        var sends=[];
                        var selections=$('#firstTable').bootstrapTable('getSelections');
                        for(var i=0;i<selections.length;i++){
                            sends.push(selections[i].BKD_ID);
                            if(selections[i].SP_STATUS!='03'||selections[i].PDF_ADDRESS==''){
                                flag=false;
                            }
                        }
                        if(flag==false){
                            commonJS.confirm('警告','未审核或未审批导致无法发送财政')
                        }
                        else{
                            $.ajax({
                                url: allUrl.sendCZ,
                                type:"post",
                                dataType:'json',
                                data:{
                                    bkdJson:JSON.stringify(sends)
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
                    }
                });

                //页签中的表格初始化
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    // 获取已激活的标签页的名称
                    var activeTab = $(e.target).text();
                    if (activeTab == '未发财政') {
                        $('#firstTable').bootstrapTable('refresh');
                        $('#btn-add,#btn-daily,#btn-sendCZ').prop('disabled',false);
                    }
                    else{
                        $('#secondTable').bootstrapTable('refresh');
                        $('#btn-add,#btn-daily,#btn-sendCZ').prop('disabled',true);
                    }
                });
            },

            init: function () {
                if (typeof JSON == 'undefined') {
                    $('head').append($("<script type='text/javascript' src='js/resource/json2.js'>"));
                }
                this.getComponents();
                this.getTab('firstTable',allUrl.query,colOne,'00');
                this.getTab('secondTable',allUrl.query,colTwo,'01');
                Dropzone.autoDiscover = false;
                this.initUploadOption()
                this.onEventListener();
            }
        }
    }();
    page.init();
});