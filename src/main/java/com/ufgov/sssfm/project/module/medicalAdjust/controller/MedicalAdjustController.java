package com.ufgov.sssfm.project.module.medicalAdjust.controller;

import com.ufgov.sssfm.project.module.medicalAdjust.service.MedicalAdjustService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description 医疗调剂金
 * @Author xucy
 * @Date 2018/8/11
 **/
@RestController
@Api(value = "医疗调剂金" ,tags = "医疗调剂金")
@RequestMapping("medicalAdjust/MedicalAdjustController")
public class MedicalAdjustController {

    private MedicalAdjustService medicalAdjustService;
}
