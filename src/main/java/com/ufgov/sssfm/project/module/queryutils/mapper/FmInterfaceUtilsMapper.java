package com.ufgov.sssfm.project.module.queryutils.mapper;


import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FmInterfaceUtilsMapper {

    List selectValsByPK(Map map);

}
