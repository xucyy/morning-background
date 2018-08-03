$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'baseInfo/fmsicompany/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true, hidden: true},
			{ label: '单位名称', name: 'dwmc', index: 'DWMC', width: 80 },
			{ label: '统一社会信用代码', name: 'tyshxydm', index: 'TYSHXYDM', width: 80 }, 			
			{ label: '组织机构代码', name: 'zzjgdm', index: 'ZZJGDM', width: 80 },
            { label: '单位编码', name: 'dwbm', index: 'DWBM', width: 80 },
			{ label: '险种', name: 'xz', index: 'XZ', width: 80 }, 			
			{ label: '行政区划', name: 'xzqh', index: 'XZQH', width: 80 }, 			
			{ label: '社保登记日期  ', name: 'sbdjrq', index: 'SBDJRQ',width: 80 },
			{ label: '创建日期', name: 'createDate', index: 'CREATE_DATE',formatter:function(CREATE_DATE, options, row){return new Date(CREATE_DATE).toLocaleDateString()}, width: 80 },
			{ label: '参保状态', name: 'dataFlag', index: 'DATA_FLAG', width: 80 ,
                formatter:function(value,options,rowData){if( value==='42' ){return '停用';}else if (value==='11'){return '启用';}}},
			{ label: '状态', name: 'dataStatus', index: 'DATA_STATUS',width: 80 ,
				formatter:function(value,options,rowData){if( value==='00' ){return '初始状态';}else if (value==='01'){return '发送地税成功';}else{return '地税拒收';}}},
			{ label: '错误信息', name: 'errorMsg', index: 'ERROR_MSG', width: 80 },
			{ label: '社保经办机构代码', name: 'sbjbjgdm', index: 'SBJBJGDM', width: 80 }, 			
			{ label: '传递时间', name: 'cdsj', index: 'CDSJ', formatter:function(CDSJ, options, row){return new Date(CDSJ).toLocaleDateString()}, width: 80 }
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
        	// $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		fmSiCompany: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.fmSiCompany = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.fmSiCompany.id == null ? "baseInfo/fmsicompany/save" : "baseInfo/fmsicompany/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.fmSiCompany),
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
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "baseInfo/fmsicompany/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
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
		getInfo: function(id){
			$.get(baseURL + "baseInfo/fmsicompany/info/"+id, function(r){
                vm.fmSiCompany = r.fmSiCompany;
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