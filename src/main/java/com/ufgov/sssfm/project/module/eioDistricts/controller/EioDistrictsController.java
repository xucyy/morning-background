package com.ufgov.sssfm.project.module.eioDistricts.controller;

import java.util.List;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ufgov.sssfm.framework.aspectj.lang.annotation.Log;
import com.ufgov.sssfm.framework.aspectj.lang.constant.BusinessType;
import com.ufgov.sssfm.project.module.eioDistricts.domain.EioDistricts;
import com.ufgov.sssfm.project.module.eioDistricts.service.IEioDistrictsService;
import com.ufgov.sssfm.framework.web.controller.BaseController;
import com.ufgov.sssfm.framework.web.page.TableDataInfo;
import com.ufgov.sssfm.framework.web.domain.AjaxResult;

/**
 * 基金委托运营地区 信息操作处理
 * 
 * @author fanhla
 * @date 2018-08-02
 */
@Controller
@RequestMapping("/module/eioDistricts")
public class EioDistrictsController extends BaseController
{
    private String prefix = "module/eioDistricts";
	
	@Autowired
	private IEioDistrictsService eioDistrictsService;
	
	@RequiresPermissions("module:eioDistricts:view")
	@GetMapping()
	public String eioDistricts()
	{
	    return prefix + "/eioDistricts";
	}
	
	/**
	 * 查询基金委托运营地区列表
	 */
	@RequiresPermissions("module:eioDistricts:list")
	@PostMapping("/list")
	@ResponseBody
	public TableDataInfo list(EioDistricts eioDistricts)
	{
		startPage();
        List<EioDistricts> list = eioDistrictsService.selectEioDistrictsList(eioDistricts);
		return getDataTable(list);
	}
	
	/**
	 * 新增基金委托运营地区
	 */
	@GetMapping("/add")
	public String add()
	{
	    return prefix + "/add";
	}
	
	/**
	 * 新增保存基金委托运营地区
	 */
	@RequiresPermissions("module:eioDistricts:add")
	@Log(title = "基金委托运营地区", action = BusinessType.INSERT)
	@PostMapping("/add")
	@ResponseBody
	public AjaxResult addSave(EioDistricts eioDistricts)
	{		
		return toAjax(eioDistrictsService.insertEioDistricts(eioDistricts));
	}

	/**
	 * 修改基金委托运营地区
	 */
	@GetMapping("/edit/{nD}")
	public String edit(@PathVariable("nD") Integer nD, ModelMap mmap)
	{
		EioDistricts eioDistricts = eioDistrictsService.selectEioDistrictsById(nD);
		mmap.put("eioDistricts", eioDistricts);
	    return prefix + "/edit";
	}
	
	/**
	 * 修改保存基金委托运营地区
	 */
	@RequiresPermissions("module:eioDistricts:edit")
	@Log(title = "基金委托运营地区", action = BusinessType.UPDATE)
	@PostMapping("/edit")
	@ResponseBody
	public AjaxResult editSave(EioDistricts eioDistricts)
	{		
		return toAjax(eioDistrictsService.updateEioDistricts(eioDistricts));
	}
	
	/**
	 * 删除基金委托运营地区
	 */
	@RequiresPermissions("module:eioDistricts:remove")
	@Log(title = "基金委托运营地区", action = BusinessType.DELETE)
	@PostMapping( "/remove")
	@ResponseBody
	public AjaxResult remove(String ids)
	{		
		return toAjax(eioDistrictsService.deleteEioDistrictsByIds(ids));
	}
	
}
