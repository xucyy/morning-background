package com.ufgov.sssfm.project.module.outcomeinfo.service;


import java.util.List;
import java.util.Map;

public interface PaymentPlanService {

        List query_bankName();

        //获取银行信息,做下拉框
        List query_bankInfo(Map map);
}
