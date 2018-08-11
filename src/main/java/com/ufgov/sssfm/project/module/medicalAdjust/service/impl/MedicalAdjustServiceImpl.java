package com.ufgov.sssfm.project.module.medicalAdjust.service.impl;

import com.ufgov.sssfm.project.module.medicalAdjust.mapper.MedicalAdjustMapper;
import com.ufgov.sssfm.project.module.medicalAdjust.service.MedicalAdjustService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description 医疗调剂金业务层
 * @Author xucy
 * @Date 2018/8/11
 **/
@Service("medicalAdjustService")
public class MedicalAdjustServiceImpl implements MedicalAdjustService {

    @Autowired
    private MedicalAdjustMapper medicalAdjustMapper;
}
