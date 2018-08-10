package com.ufgov.sssfm.project.module.pensionAdjust.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        //养老调剂金修改查询主表
        @PostMapping("/query_persionAdjust_pagedata")
        public String  query_persionAdjust_pagedata(String timeStart, String timeEnd){
                JSONObject jsonObject = new JSONObject();
                Map map = new HashMap();
                map.put("timeStart", timeStart);
                map.put("timeEnd", timeEnd);
                List query_list= pensionAdjustService.query_persionAdjust_pagedata(map);
                jsonObject.put("result",query_list);
                return jsonObject.toString();
        }
        //养老调剂金修改查询子表
        @PostMapping("/query_persionAdjust_item")
        public String  query_persionAdjust_item(String id){
            JSONObject jsonObject = new JSONObject();
            List query_list= pensionAdjustService.query_persionAdjust_item(id);
            List TABLE = pensionAdjustService.query_persionAdjust_item_table(id);
            //query_list.add(TABLE);
            jsonObject.put("result",query_list);
            jsonObject.put("TABLE",TABLE);
            return jsonObject.toString();
        }
        //养老调剂金修提交
        @PostMapping("/tijiao_persionAdjust")
        public String  tijiao_persionAdjust(String pensionAdjustJson){
            JSONObject jsonObject = new JSONObject();
            try{
                FmAdjustGold fmAdjustGold = JSON.parseObject(pensionAdjustJson,FmAdjustGold.class);
                List query_list= pensionAdjustService.tijiao_persionAdjust(fmAdjustGold);
            }catch (Exception e){
                jsonObject.put("result","数据库更新失败");
                return jsonObject.toString();
            }
            jsonObject.put("result","养老调剂金单提交成功");
            return jsonObject.toString();
        }
        //养老调剂金删除
        @PostMapping("/delete_persionAdjust")
        public String  delete_persionAdjust(String id){
            JSONObject jsonObject = new JSONObject();
            try{
                pensionAdjustService.delete_persionAdjust(id);
                pensionAdjustService.delete_persionAdjust_item(id);
            }catch (Exception e){
                jsonObject.put("result","数据库删除失败");
                return jsonObject.toString();
            }
            jsonObject.put("result","养老调剂金单删除成功");
            return jsonObject.toString();
        }
        //养老调剂金删除
        @PostMapping("/shenhe_persionAdjust")
        public String  shenhe_persionAdjust(String id,String spStatus){
            JSONObject jsonObject = new JSONObject();
            try{

                pensionAdjustService.shenhe_persionAdjust(id,spStatus);
            }catch (Exception e){
                jsonObject.put("result","数据库更新失败");
                return jsonObject.toString();
            }
            jsonObject.put("result","养老调剂金单审核成功");
            return jsonObject.toString();
        }
        @PostMapping("/insert_PensionAdjust")
        //新增和编辑  的保存
        public String insert_PensionAdjust(String pensionAdjustJson){
                JSONObject jsonObject=new JSONObject();
                try{
                        FmAdjustGold fmAdjustGold = JSON.parseObject(pensionAdjustJson,FmAdjustGold.class);
                        JSONObject jsonObject1=(JSONObject)JSONArray.parseObject(pensionAdjustJson);
                         JSONArray personObject = (JSONArray) jsonObject1.get("table");
                        //判断是否存在拨款单Id,如果存在，则先删除，后插入。不存在，直接插入
                        String id = (UUID.randomUUID()+"").replaceAll("-","");
                        if((fmAdjustGold.getId().length()<=0)){
                                fmAdjustGold.setId(id);
                                pensionAdjustService.insert_fmAdjustGold(fmAdjustGold);
                                for(int i=0;i<personObject.size();i++){
                                    String personOb = personObject.get(i)+"";
                                    FmAdjustGoldItem fmAdjustGoldItem = JSON.parseObject(personOb,FmAdjustGoldItem.class);
                                    fmAdjustGoldItem.setId(id);
                                    pensionAdjustService.insert_fmAdjustGoldItem(fmAdjustGoldItem);
                                }
                        }else{
                                //删除
                               //ensionAdjustService.deletefmAdjustGoldByPK(fmAdjustGold.getId());
                                //插入
                               //ensionAdjustService.insert_fmAdjustGold(fmAdjustGold);
                            pensionAdjustService.deletefmAdjustGoldItemByPK(fmAdjustGold.getId());
                            //插入
                            for( int m=0;m<personObject.size();m++){
                                String personOb = personObject.get(m)+"";
                                FmAdjustGoldItem fmAdjustGoldItem = JSON.parseObject(personOb,FmAdjustGoldItem.class);
                                pensionAdjustService.insert_fmAdjustGoldItem(fmAdjustGoldItem);
                            }
                        }

                }catch (Exception e){
                        jsonObject.put("result","插入数据库失败");
                        return jsonObject.toString();
                }
                jsonObject.put("result","生成养老调剂金单成功");
                return jsonObject.toString();

        }

}
