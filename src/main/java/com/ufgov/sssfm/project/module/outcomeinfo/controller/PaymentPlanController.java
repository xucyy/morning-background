package com.ufgov.sssfm.project.module.outcomeinfo.controller;

import com.ufgov.sssfm.project.module.outcomeinfo.service.PaymentPlanService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description 生成支付计划控制层
 * @Author xucy
 * @Date 2018/8/2
 **/
@RestController
@Api(value = "生成支付计划" ,tags = "生成支付计划")
@RequestMapping("outcomeinfo/PaymentPlanController")
public class PaymentPlanController {

    @Autowired
    private PaymentPlanService paymentPlanService;

}
