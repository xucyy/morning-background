$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'baseInfo/ad68/list',
        datatype: "json",
        colModel: [			
			{ label: 'baz802', name: 'baz802', index: 'BAZ802', width: 50, key: true },
			{ label: '操作序号', name: 'baz002', index: 'BAZ002', width: 80 }, 			
			{ label: '险种类型', name: 'aae140', index: 'AAE140', width: 80 }, 			
			{ label: '会计期间', name: 'bad481', index: 'BAD481', width: 80 }, 			
			{ label: '台账年月', name: 'aae002', index: 'AAE002', width: 80 }, 			
			{ label: '收支类别', name: 'bad304', index: 'BAD304', width: 80 }, 			
			{ label: '业务类别', name: 'bad305', index: 'BAD305', width: 80 }, 			
			{ label: '业务批次号', name: 'bad306', index: 'BAD306', width: 80 }, 			
			{ label: '业务单据号', name: 'bad307', index: 'BAD307', width: 80 }, 			
			{ label: '当事人角色类型', name: 'aaa033', index: 'AAA033', width: 80 }, 			
			{ label: '当事人ID', name: 'aaz010', index: 'AAZ010', width: 80 }, 			
			{ label: '主体名称', name: 'bae040', index: 'BAE040', width: 80 }, 			
			{ label: '身份证号', name: 'aac147', index: 'AAC147', width: 80 }, 			
			{ label: '单位编号', name: 'aab001', index: 'AAB001', width: 80 }, 			
			{ label: '收支金额', name: 'aae019', index: 'AAE019', width: 80 }, 			
			{ label: '发送银行金额', name: 'bad315', index: 'BAD315', width: 80 }, 			
			{ label: '发放方式（11-银行 22-单位代发 51-财政代发）', name: 'aae145', index: 'AAE145', width: 80 }, 			
			{ label: '财务银行类别', name: 'bad737', index: 'BAD737', width: 80 }, 			
			{ label: '银行类别', name: 'bae010', index: 'BAE010', width: 80 }, 			
			{ label: '银行名称', name: 'bab024', index: 'BAB024', width: 80 }, 			
			{ label: '银行户名', name: 'aae009', index: 'AAE009', width: 80 }, 			
			{ label: '银行账号', name: 'aae010', index: 'AAE010', width: 80 }, 			
			{ label: '银行编码', name: 'aae008', index: 'AAE008', width: 80 }, 			
			{ label: '银行所在省', name: 'bad558', index: 'BAD558', width: 80 }, 			
			{ label: '银行所在市', name: 'bad559', index: 'BAD559', width: 80 }, 			
			{ label: '支付行号', name: 'bad560', index: 'BAD560', width: 80 }, 			
			{ label: '领取人姓名（地税征收职工姓名）', name: 'aae133', index: 'AAE133', width: 80 }, 			
			{ label: '邮政地址', name: 'aae006', index: 'AAE006', width: 80 }, 			
			{ label: '邮政编码', name: 'aae007', index: 'AAE007', width: 80 }, 			
			{ label: '摘要', name: 'bad316', index: 'BAD316', width: 80 }, 			
			{ label: '结算方式（01 支票02 网银03 不支付）', name: 'bad002', index: 'BAD002', width: 80 }, 			
			{ label: '财务汇总批次号', name: 'bad709', index: 'BAD709', width: 80 }, 			
			{ label: '财务接口流水号', name: 'aae076', index: 'AAE076', width: 80 }, 			
			{ label: '单据状态', name: 'bad309', index: 'BAD309', width: 80 }, 			
			{ label: '银行到帐状态(0-失败,1-成功）', name: 'aae536', index: 'AAE536', width: 80 }, 			
			{ label: '到帐日期', name: 'aab191', index: 'AAB191', width: 80 }, 			
			{ label: '对账状态（默认值为0，财务取数后标记为1.对账成功后标记为2）', name: 'bad765', index: 'BAD765', width: 80 }, 			
			{ label: '对账时间', name: 'bad766', index: 'BAD766', width: 80 }, 			
			{ label: '接收日期', name: 'bad734', index: 'BAD734', width: 80 }, 			
			{ label: '发送银行途径（0-批次汇总 1-零星支付）', name: 'bad735', index: 'BAD735', width: 80 }, 			
			{ label: '接收类别（0-定时接收 1-手工接收 2-财务生成 3-部分还款数据接收 4-预存款数据接收）', name: 'bad736', index: 'BAD736', width: 80 }, 			
			{ label: '账务处理类型（0-正常 1-冲销）', name: 'bad738', index: 'BAD738', width: 80 }, 			
			{ label: '汇总截止日期', name: 'bad740', index: 'BAD740', width: 80 }, 			
			{ label: '经办人', name: 'aae011', index: 'AAE011', width: 80 }, 			
			{ label: '经办时间', name: 'aae036', index: 'AAE036', width: 80 }, 			
			{ label: '经办机构编码', name: 'aab034', index: 'AAB034', width: 80 }, 			
			{ label: '统筹区', name: 'aaa027', index: 'AAA027', width: 80 }, 			
			{ label: '备注', name: 'aae013', index: 'AAE013', width: 80 }, 			
			{ label: '报盘文件序号', name: 'bad410', index: 'BAD410', width: 80 }, 			
			{ label: '财务收支类别', name: 'bad411', index: 'BAD411', width: 80 }, 			
			{ label: '银行处理失败原因', name: 'bad412', index: 'BAD412', width: 80 }, 			
			{ label: '社保管理银行帐号ID', name: 'baz801', index: 'BAZ801', width: 80 }, 			
			{ label: '外部数据标志', name: 'bae354', index: 'BAE354', width: 80 }, 			
			{ label: '财务险种', name: 'bad725', index: 'BAD725', width: 80 }, 			
			{ label: '对应费款所属期', name: 'aae003', index: 'AAE003', width: 80 }, 			
			{ label: '凭证号', name: 'yac900', index: 'YAC900', width: 80 }, 			
			{ label: '制单人', name: 'yac901', index: 'YAC901', width: 80 }, 			
			{ label: '制单时间', name: 'yac902', index: 'YAC902', width: 80 }, 			
			{ label: '费款所属期起', name: 'sfssqQsrq', index: 'SFSSQ_QSRQ', width: 80 }, 			
			{ label: '费款所属期止', name: 'sfssqZzrq', index: 'SFSSQ_ZZRQ', width: 80 }, 			
			{ label: '主体社保号', name: 'aac002', index: 'AAC002', width: 80 }, 			
			{ label: '统一社会信用代码', name: 'yga003', index: 'YGA003', width: 80 }, 			
			{ label: '纳税人识别号', name: 'yga001', index: 'YGA001', width: 80 }, 			
			{ label: '单位缴费金额', name: 'dwjfje', index: 'DWJFJE', width: 80 },
			{ label: '个人缴费金额', name: 'grjfje', index: 'GRJFJE', width: 80 },
			{ label: '利息', name: 'lx', index: 'LX', width: 80 },
			{ label: '滞纳金', name: 'znj', index: 'ZNJ', width: 80 },
			{ label: '缴费人数', name: 'jfrs', index: 'JFRS', width: 80 }, 			
			{ label: '"数据状态"', name: 'dataStatus', index: 'DATA_STATUS', width: 80 },
			{ label: '针对data_status为02，', name: 'errorMsg', index: 'ERROR_MSG', width: 80 },
			{ label: '征收方式', name: 'aab033', index: 'AAB033', width: 80 }, 			
			{ label: '社保卡发卡地', name: 'aab301', index: 'AAB301', width: 80 }, 			
			{ label: '对公对私标志（1-对公 2-对私）', name: 'yac002', index: 'YAC002', width: 80 }, 			
			{ label: '抽单止付原因', name: 'stopPayReason', index: 'STOP_PAY_REASON', width: 80 }, 			
			{ label: '单位类型', name: 'aab019', index: 'AAB019', width: 80 }, 			
			{ label: '编制归属', name: 'yac022', index: 'YAC022', width: 80 }, 			
			{ label: '地税使用征收品目：120：0138；180：0139', name: 'levyType', index: 'LEVY_TYPE', width: 80 }, 			
			{ label: '缴款序号', name: 'aae244', index: 'AAE244', width: 80 }, 			
			{ label: '财政代扣标志（0-否(非统发) 1-是(统发)）', name: 'yac024', index: 'YAC024', width: 80 }, 			
			{ label: '经费来源（1-全额拨款 2-差额拨款 3-自收自支）', name: 'aab113', index: 'AAB113', width: 80 }, 			
			{ label: '人工对账过程中生成id', name: 'checkupId', index: 'CHECKUP_ID', width: 80 }, 			
			{ label: '', name: 'aab024', index: 'AAB024', width: 80 }, 			
			{ label: '合单号', name: 'yac027', index: 'YAC027', width: 80 }, 			
			{ label: '个人部分应缴金额', name: 'aab122', index: 'AAB122', width: 80 }, 			
			{ label: '单位部分应缴金额', name: 'aab138', index: 'AAB138', width: 80 }, 			
			{ label: '个人部分实缴金额', name: 'aab153', index: 'AAB153', width: 80 }, 			
			{ label: '单位部分实缴金额', name: 'aab203', index: 'AAB203', width: 80 }, 			
			{ label: '实缴到帐金额（不包括代收部门计算的滞纳金和代收部门计算的利息）', name: 'aab190', index: 'AAB190', width: 80 }, 			
			{ label: '实缴凭证单据号', name: 'bae301', index: 'BAE301', width: 80 }, 			
			{ label: '代收部门计算的滞纳金', name: 'aab162', index: 'AAB162', width: 80 }, 			
			{ label: '代收部门计算的利息', name: 'aab139', index: 'AAB139', width: 80 }, 			
			{ label: '个人缴费基数（单位缴费时，指单位所有人员基数和，个人缴费时，指个人基数）', name: 'aab120', index: 'AAB120', width: 80 }, 			
			{ label: '单位缴费基数（单位缴费时，指单位缴费基数，个人缴费时，指个人基数）', name: 'aab121', index: 'AAB121', width: 80 }, 			
			{ label: '单位缴费费率', name: 'aaa083', index: 'AAA083', width: 80 }, 			
			{ label: '个人缴费费率', name: 'aaa084', index: 'AAA084', width: 80 }, 			
			{ label: '总费率', name: 'aaa085', index: 'AAA085', width: 80 }, 			
			{ label: '费款所属期串', name: 'aae012', index: 'AAE012', width: 80 }, 			
			{ label: '社保核定流水号', name: 'aae060l', index: 'AAE060L', width: 80 }, 			
			{ label: '创建时间', name: 'createDate', index: 'CREATE_DATE', width: 80 }, 			
			{ label: '税务开票经办人', name: 'swkpjbr', index: 'SWKPJBR', width: 80 }, 			
			{ label: '税务开票日期', name: 'swkprq', index: 'SWKPRQ', width: 80 },
			{ label: '收款国库代码', name: 'skgkdm', index: 'SKGKDM', width: 80 }, 			
			{ label: '入库销号经办人', name: 'rkxhjbr', index: 'RKXHJBR', width: 80 }, 			
			{ label: '地税应收传递时间', name: 'dsYscdsj', index: 'DS_YSCDSJ', width: 80 }, 			
			{ label: '费款限缴日期(失效日期)', name: 'aae032', index: 'AAE032', width: 80 }, 			
			{ label: '缴费人类型', name: 'jfrlx', index: 'JFRLX', width: 80 }, 			
			{ label: '地税备注', name: 'dsBz', index: 'DS_BZ', width: 80 },
			{ label: '正常缴费:01,补缴:03 账套类别', name: 'bae446', index: 'BAE446', width: 80 }, 			
			{ label: '入库销号日期', name: 'rkxhrq', index: 'RKXHRQ', width: 80 }, 			
			{ label: '月末对账的标识', name: 'monthDzStatus', index: 'MONTH_DZ_STATUS', width: 80 }, 			
			{ label: '发送ID，一个文件一个ID(地税实缴反馈加到文件名中)', name: 'fsid', index: 'FSID', width: 80 }, 			
			{ label: '', name: 'fsId', index: 'FS_ID', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		ad68: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.ad68 = {};
		},
		update: function (event) {
			var baz802 = getSelectedRow();
			if(baz802 == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(baz802)
		},
		saveOrUpdate: function (event) {
			var url = vm.ad68.baz802 == null ? "baseInfo/ad68/save" : "baseInfo/ad68/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.ad68),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var baz802s = getSelectedRows();
			if(baz802s == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "baseInfo/ad68/delete",
                    contentType: "application/json",
				    data: JSON.stringify(baz802s),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(baz802){
			$.get(baseURL + "baseInfo/ad68/info/"+baz802, function(r){
                vm.ad68 = r.ad68;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});