package com.ufgov.sssfm.project.module.pensionAdjust.controller;

import com.ufgov.sssfm.project.module.pensionAdjust.service.PensionAdjustService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
