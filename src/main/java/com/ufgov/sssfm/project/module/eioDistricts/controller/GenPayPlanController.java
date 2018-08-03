package com.ufgov.sssfm.project.module.eioDistricts.controller;

import com.ufgov.sssfm.framework.aspectj.lang.annotation.Log;
import com.ufgov.sssfm.framework.aspectj.lang.constant.BusinessType;
import com.ufgov.sssfm.framework.web.controller.BaseController;
import com.ufgov.sssfm.framework.web.domain.AjaxResult;
import com.ufgov.sssfm.framework.web.page.TableDataInfo;
import com.ufgov.sssfm.project.module.eioDistricts.domain.EioDistricts;
import com.ufgov.sssfm.project.module.eioDistricts.service.IEioDistrictsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 基金委托运营地区 信息操作处理
 * 
 * @author fanhla
 * @date 2018-08-02
 */
@Api(value="行政区划",tags ="行政区划")
@Controller
@RequestMapping("/module/genPayPlan")
public class GenPayPlanController extends BaseController
{
    private String prefix = "module/play";

	
	@RequiresPermissions("module:genPayPlan:view")
	@GetMapping()
	public String eioDistricts()
	{
	    return prefix + "/genPayPlan";
	}
	

}
