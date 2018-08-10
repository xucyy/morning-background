package com.ufgov.sssfm.project.module.pensionAdjust.service.impl;


import com.ufgov.sssfm.project.module.pensionAdjust.entity.FmAdjustGoldItem;
import com.ufgov.sssfm.project.module.pensionAdjust.entity.FmAdjustGold;
import com.ufgov.sssfm.project.module.pensionAdjust.mapper.PensionAdjustMapper;
import com.ufgov.sssfm.project.module.pensionAdjust.service.PensionAdjustService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @Description 养老调剂金业务层
 * @Author xucy
 * @Date 2018/8/9
 **/
@Service("pensionAdjustService")
public class PensionAdjustServiceImpl implements PensionAdjustService {
    @Autowired
    private PensionAdjustMapper pensionAdjustMapper;
    @Override
    public int insert_fmAdjustGoldItem(FmAdjustGoldItem fmAdjustGoldItem) {
        return pensionAdjustMapper.insert_fmAdjustGoldItem(fmAdjustGoldItem);
    }
    @Override
    public int deletefmAdjustGoldItemByPK(String Id) {
        return pensionAdjustMapper.deletepensionAdjustMapperByPK(Id);
    }
    @Override
    public int insert_fmAdjustGold(FmAdjustGold fmAdjustGold) {
        return pensionAdjustMapper.insert_fmAdjustGold(fmAdjustGold);
    }
    @Override
    public int deletefmAdjustGoldByPK(String Id) {
        return pensionAdjustMapper.deletepensionAdjustMapperZhuByPK(Id);
    }
    @Override
     public List  query_persionAdjust_pagedata(Map map){
        return pensionAdjustMapper.query_persionAdjust_pagedata(map);
    }
    @Override
    public List  query_persionAdjust_item(String id){
        return pensionAdjustMapper.query_persionAdjust_item(id);
    }
    @Override
    public List  query_persionAdjust_item_table(String id){
        return pensionAdjustMapper.query_persionAdjust_item_table(id);
    }
    public  List tijiao_persionAdjust(FmAdjustGold fmAdjustGold){
        return pensionAdjustMapper.update_fmAdjustGold(fmAdjustGold);
    }
    public int delete_persionAdjust(String id){
        return pensionAdjustMapper.delete_persionAdjust(id);
    }
    public int delete_persionAdjust_item(String id){
        return pensionAdjustMapper.delete_persionAdjust_item(id);
    }
    public int shenhe_persionAdjust(String id,String spStatus){
        return pensionAdjustMapper.shenhe_persionAdjust(id,spStatus);
    }
}
