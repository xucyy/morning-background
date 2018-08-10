package com.ufgov.sssfm.project.module.pensionAdjust.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ufgov.sssfm.project.module.pensionAdjust.entity.FmAdjustGoldItem;
import com.ufgov.sssfm.project.module.pensionAdjust.entity.FmAdjustGold;
import com.ufgov.sssfm.project.module.pensionAdjust.service.PensionAdjustService;
import com.ufgov.sssfm.project.module.queryutils.service.FmBankXmlLogService;
import com.ufgov.sssfm.project.module.queryutils.service.FmInterfaceUtilsService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * @Description 养老调剂金控制层
 * @Author xucy
 * @Date 2018/8/9
 **/
@RestController
@Api(value = "养老调剂金控制层",tags = "养老调剂金控制层")
@RequestMapping("persionAdjust/PersionAdjustController")
public class PensionAdjustController {

        @Autowired
        private PensionAdjustService pensionAdjustService;
        @Autowired
        private FmInterfaceUtilsService fmInterfaceUtilsService;

        @Autowired
        private FmBankXmlLogService fmBankXmlLogService;
        @PostMapping("/insert_PensionAdjust")
        //新增和编辑  的保存
        public String insert_PensionAdjust(String pensionAdjustJson){
                JSONObject jsonObject=new JSONObject();
                try{
                        FmAdjustGold fmAdjustGold = JSON.parseObject(pensionAdjustJson,FmAdjustGold.class);
                        FmAdjustGoldItem fmAdjustGoldItem = JSON.parseObject(pensionAdjustJson,FmAdjustGoldItem.class);
                        //判断是否存在拨款单Id,如果存在，则先删除，后插入。不存在，直接插入
                        if((fmAdjustGoldItem.getId().length()<=0)){
                                String id = UUID.randomUUID()+"";
                                fmAdjustGold.setId(id);
                                fmAdjustGoldItem.setId(id);
                                pensionAdjustService.insert_fmAdjustGoldItem(fmAdjustGoldItem);
                                pensionAdjustService.insert_fmAdjustGold(fmAdjustGold);
                        }else{
                                //删除
                                pensionAdjustService.deletefmAdjustGoldItemByPK(fmAdjustGoldItem.getId());
                                pensionAdjustService.deletefmAdjustGoldByPK(fmAdjustGold.getId());
                                //插入
                                pensionAdjustService.insert_fmAdjustGoldItem(fmAdjustGoldItem);
                                pensionAdjustService.insert_fmAdjustGold(fmAdjustGold);
                        }

                }catch (Exception e){
                        jsonObject.put("result","插入数据库失败");
                        return jsonObject.toString();
                }

                jsonObject.put("result","生成养老调剂金单成功");
                return jsonObject.toString();

        }

}
