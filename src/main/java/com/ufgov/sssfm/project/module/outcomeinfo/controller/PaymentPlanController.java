package com.ufgov.sssfm.project.module.outcomeinfo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ufgov.sssfm.project.module.outcomeinfo.service.PaymentPlanService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        //获取银行名称下拉框
        @PostMapping("/query_bankName")
        @ApiOperation(value = "获取银行名称下拉框",notes = "获取银行名称下拉框")
        public String  query_bankName(){
            JSONObject jsonObject=new JSONObject();
            List resultList= paymentPlanService.query_bankName();
            jsonObject.put("result",resultList);
            return jsonObject.toJSONString();
        }

        //获取银行信息
        @PostMapping("/query_bankInfo")
        @ApiOperation(value = "获取银行信息",notes = "获取银行信息")
        public String  query_bankInfo(String bankCode){
            JSONObject jsonObject=new JSONObject();
            Map map=new HashMap();
            map.put("bankCode",bankCode);
            List resultList= paymentPlanService.query_bankInfo(map);
            jsonObject.put("result",resultList);
            return jsonObject.toJSONString();
        }
}
