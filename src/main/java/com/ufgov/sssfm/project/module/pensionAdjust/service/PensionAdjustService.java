package com.ufgov.sssfm.project.module.pensionAdjust.service;

import com.ufgov.sssfm.project.module.pensionAdjust.entity.FmAdjustGoldItem;
import com.ufgov.sssfm.project.module.pensionAdjust.entity.FmAdjustGold;

import java.util.List;
import java.util.Map;

public interface PensionAdjustService {

   //插入养老调剂金主表数据
    int insert_fmAdjustGoldItem(FmAdjustGoldItem fmAdjustGoldItem);
    //删除养老调剂金子表根据id
    int deletefmAdjustGoldItemByPK(String id);
    int insert_fmAdjustGold(FmAdjustGold fmAdjustGold);
    //删除养老调剂金主表根据id
    int deletefmAdjustGoldByPK(String id);
   //查询养老调剂金主表
    List query_persionAdjust_pagedata(Map map);
}
