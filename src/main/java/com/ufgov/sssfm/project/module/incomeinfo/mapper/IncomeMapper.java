package com.ufgov.sssfm.project.module.incomeinfo.mapper;


import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface IncomeMapper {

    List query_ad68_pagedata(Map map);

    int query_ad68_pagedata_total(Map map);

    List query_ad68_pagedata_item(Map map);

    int query_ad68_pagedata_item_total(Map map);
}
