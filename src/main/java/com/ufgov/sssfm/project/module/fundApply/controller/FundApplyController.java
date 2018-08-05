package com.ufgov.sssfm.project.module.fundApply.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ufgov.sssfm.project.module.fundApply.entity.FmBkApply;
import com.ufgov.sssfm.project.module.fundApply.service.FundApplyService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * @Description 生成用款单控制层
 * @Author xucy
 * @Date 2018/8/5
 **/
@RestController
@RequestMapping("fundApply/FundApplyController")
@Api(value = "生成用款单",tags = "生成用款单")
public class FundApplyController {

    @Autowired
    private FundApplyService fundApplyService;


    @PostMapping("/insert_FmBkApply")
    public String insert_FmBkApply(String bkdJson){
        JSONObject jsonObject=new JSONObject();
        try{
            FmBkApply fmBkApply = JSON.parseObject(bkdJson,FmBkApply.class);
            //判断是否存在拨款单Id,如果存在，则先删除，后插入。不存在，直接插入
            if((fmBkApply.getBkdId().length()<=0)){
                fmBkApply.setBkdId(UUID.randomUUID()+"");
                fundApplyService.insert_FmBkApply(fmBkApply);
            }else{
                //删除
                fundApplyService.deleteBKApplyByPK(fmBkApply.getBkdId());
                //插入
                fundApplyService.insert_FmBkApply(fmBkApply);
            }

        }catch (Exception e){
            jsonObject.put("result","插入数据库失败");
            return jsonObject.toString();
        }

        jsonObject.put("result","生成拨款单成功");
        return jsonObject.toString();

    }

    //编辑查出单条拨款申请单
    @PostMapping("/selectBKApplyByPK")
    public String selectBKApplyByPK(String bkdId){

        FmBkApply fmBkApply=fundApplyService.selectBKApplyByPK(bkdId);
        JSONObject jsonObject=(JSONObject)JSON.toJSON(fmBkApply);

        return jsonObject.toString();
    }

    //根据时间查出所有的拨款申请单
    @PostMapping("/selectAllBkApplyTime")
    public String selectAllBkApplyTime(){
        JSONObject jsonObject=new JSONObject();

        Map map=new HashMap();
        List resultList=fundApplyService.selectAllBkApplyTime(map);

        jsonObject.put("result",resultList);
        return jsonObject.toString();
    }

    //根据bkd_id删除拨款申请单
    @PostMapping("/deleteBKApplyByPK")
    public String deleteBKApplyByPK(String bkdId){
        JSONObject jsonObject=new JSONObject();

        try {
            fundApplyService.deleteBKApplyByPK(bkdId);
        }catch (Exception e){
            jsonObject.put("result","删除失败");
            return jsonObject.toString();
        }
        jsonObject.put("result","删除成功");
        return jsonObject.toString();
    }

}
