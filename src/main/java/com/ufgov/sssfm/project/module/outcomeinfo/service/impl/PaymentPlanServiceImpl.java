package com.ufgov.sssfm.project.module.outcomeinfo.service.impl;

import com.ufgov.sssfm.project.module.outcomeinfo.mapper.PaymentPlanMapper;
import com.ufgov.sssfm.project.module.outcomeinfo.service.PaymentPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description 生成支付计划业务层
 * @Author xucy
 * @Date 2018/8/2
 **/
@Service("paymentPlanService")
public class PaymentPlanServiceImpl implements PaymentPlanService {

        @Autowired
        private PaymentPlanMapper paymentPlanMapper;



}
