package com.ufgov.sssfm.project.module.outcomeinfo.mapper;


import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PaymentPlanMapper {
        //获取银行名称，做下拉框
        List query_bankName();

        //获取银行信息,做下拉框
        List query_bankInfo(Map map);

}
