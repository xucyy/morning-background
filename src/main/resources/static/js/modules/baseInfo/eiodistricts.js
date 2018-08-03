$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'baseInfo/eiodistricts/list',
        datatype: "json",
        colModel: [			
			{ label: '年度', name: 'nd', index: 'ND', width: 50, hidden: true},
			{ label: '区划代码', name: 'distCode', index: 'DIST_CODE', key: true,width: 80 },
			{ label: '区划名称', name: 'distName', index: 'DIST_NAME', width: 80 },
			// { label: '单位代码', name: 'coCode', index: 'CO_CODE', width: 80 },
			{ label: '单位名称', name: 'coName', index: 'CO_NAME', width: 80 },
			{ label: '财政直管县', name: 'isPfManage', index: 'IS_PF_MANAGE', width: 80 },
			// { label: '是否贫困县;0 否,1 是', name: 'isPoor', index: 'IS_POOR', width: 80 },
			// { label: '贫困县类别;00 国定贫困县,01 燕山太行山连片贫困区,02 省定贫困县', name: 'poorType', index: 'POOR_TYPE', width: 80 },
			{ label: '资源枯竭工矿区', name: 'isResdepArea', index: 'IS_RESDEP_AREA', width: 80 },
			/*{ label: '录入人ID', name: 'inputorId', index: 'INPUTOR_ID', width: 80 },
			{ label: '录入人', name: 'inputorName', index: 'INPUTOR_NAME', width: 80 },
			{ label: '录入日期', name: 'cdate', index: 'CDATE', width: 80 },*/
            { label: '国定贫困县', name: 'isPoorCountry', index: 'IS_POOR_COUNTRY', width: 80 },
            { label: '省定贫困县', name: 'isPoorPro', index: 'IS_POOR_PRO', width: 80 },
            { label: '燕山太行连片贫困县', name: 'isPoorOther', index: 'IS_POOR_OTHER', width: 80 },
			/*{ label: '', name: 'createBatch', index: 'CREATE_BATCH', width: 80 },
			{ label: '', name: 'splitBatch', index: 'SPLIT_BATCH', width: 80 },
			{ label: '', name: 'logicPDistCode', index: 'LOGIC_P_DIST_CODE', width: 80 },*/
			{ label: '是否可用', name: 'isUsed', index: 'IS_USED', width: 80 },
			// { label: '父代码', name: 'pDistCode', index: 'p_dist_code', width: 80 },
			{ label: '级次', name: 'levelNum', index: 'level_num', width: 80 }, 			
			{ label: '是否末级', name: 'isLeaf', index: 'is_leaf', width: 80 },
            { label: '备注', name: 'remark', index: 'REMARK', width: 80 }
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
		eioDistricts: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.eioDistricts = {};
		},
		update: function (event) {
			var nd = getSelectedRow();
			if(nd == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(nd)
		},
		saveOrUpdate: function (event) {
			var url = vm.eioDistricts.nd == null ? "baseInfo/eiodistricts/save" : "baseInfo/eiodistricts/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.eioDistricts),
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
			var nds = getSelectedRows();
			if(nds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "baseInfo/eiodistricts/delete",
                    contentType: "application/json",
				    data: JSON.stringify(nds),
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
		getInfo: function(nd){
			$.get(baseURL + "baseInfo/eiodistricts/info/"+nd, function(r){
                vm.eioDistricts = r.eioDistricts;
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