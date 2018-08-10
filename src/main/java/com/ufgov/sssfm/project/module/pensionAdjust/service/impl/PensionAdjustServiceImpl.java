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
}
