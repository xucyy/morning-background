package com.ufgov.sssfm.project.module.pathconversion;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Description 新建菜单请求路径转发
 * @Author xucy
 * @Date 2018/8/3
 **/

@Controller
@RequestMapping("/module/PathConversion")
public class PathConversionController {
    //生成支付计划页面跳转
    @RequiresPermissions("module:genPayPlan:view")
    @GetMapping("/genPayPlan")
    public String genPayPlan()
    {
        return "module/genPayPlan" + "/genPayPlan";
    }

    //收入查询页面跳转
    @RequiresPermissions("module:incomePlanCZ:view")
    @GetMapping("/incomePlanCZ")
    public String incomePlanCZ()
    {
        return "module/incomePlanCZ" + "/incomePlanCZ";
    }

    //支出查询页面跳转
    @RequiresPermissions("module:outcomePlanCZ:view")
    @GetMapping("/outcomePlanCZ")
    public String outcomePlanCZ()
    {
        return "module/outcomePlanCZ" + "/outcomePlanCZ";
    }

    //基金拨付申请页面跳转
    @RequiresPermissions("module:fundApply:view")
    @GetMapping("/fundApply")
    public String fundApply()
    {
        return "module/fundApply" + "/fundApply";
    }
}
