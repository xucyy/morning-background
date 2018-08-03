package com.ufgov.sssfm.demoaxis2.web.impl;

import com.ufgov.sssfm.common.utils.nx.AnalysisMsgUtil;
import com.ufgov.sssfm.common.utils.nx.NxConstants;
import com.ufgov.sssfm.common.utils.nx.NxXmlUtil;
import com.ufgov.sssfm.common.utils.nx.OSSFileUtil;
import com.ufgov.sssfm.common.utils.nx.bean.AnalysisReceiveMsgBig;
import com.ufgov.sssfm.common.utils.nx.bean.AnalysisReceiveMsgSmall;
import com.ufgov.sssfm.demoaxis2.web.SiReceiveService;
import com.ufgov.sssfm.project.module.incomeinfo.entity.Ad68Fa;
import com.ufgov.sssfm.project.module.incomeinfo.entity.Ad68Son;
import com.ufgov.sssfm.project.module.queryutils.bean.FmInterfaceUtils;
import com.ufgov.sssfm.project.module.queryutils.mapper.FmInterfaceUtilsMapper;
import com.ylzinfo.esb.server.ReaderSoapXmlOut4NX;
import org.apache.axiom.om.OMElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description 人社接收业务数据webservice
 * @Author xucy
 * @Date 2018/8/3
 **/
@Service("siReceiveService")
public class SiReceiveServiceImpl implements SiReceiveService {

    @Autowired
    private FmInterfaceUtilsMapper fmInterfaceUtilsMapper;

    //业务平台通过webservice发送业务数据
    public String getYWDataRecieveMessage(OMElement element) {
        /**
         * 1、解析报文，读取数据,2、数据处理，业务流程
         *
         */
        //得到请求报文中的参数
        AnalysisReceiveMsgBig analysisReceiveMsgBig=AnalysisMsgUtil.getRecieveMessage(element);
        //得到请求报文中的各个上传文件的信息
        List<AnalysisReceiveMsgSmall> listSmall=analysisReceiveMsgBig.getAnalysisReceiveMsgSmallList();

        //得到请求下载文件的报文头
        FmInterfaceUtils fmInterfaceUtils=getRequestParam("rs_cz", "download");

        for(int z=0;z<listSmall.size();z++){
            AnalysisReceiveMsgSmall analysisReceiveMsgSmall=new AnalysisReceiveMsgSmall();
            analysisReceiveMsgSmall=listSmall.get(z);

            String ossstr=analysisReceiveMsgSmall.getOssstr();

            //根据ossstr字符串去下载文件到本地
            String filePath= OSSFileUtil.download(ossstr,fmInterfaceUtils);
            String bse173 = analysisReceiveMsgBig.getBse173();

            if(NxConstants.AD68_WEB_SERVICE.equals(bse173)){
                long start = System.currentTimeMillis();
                List<Ad68Fa> ad68FaList = NxXmlUtil.xmlToBeanListAd68(filePath, Ad68Fa.class, NxConstants.AD68_SAX_HANDLER);

                for(int i=0;i<ad68FaList.size();i++){
                    Ad68Fa ad68Fa=ad68FaList.get(i);
//                    ad68FaMapper.insert(ad68Fa);
                    for(int j=0;j<ad68Fa.getAd68SonList().size();j++){
                        Ad68Son ad68Son= ad68Fa.getAd68SonList().get(j);
//                        ad68SonMapper.insert(ad68Son);
                        System.out.println(ad68Son.getAaz223());
                    }
                }
                long end = System.currentTimeMillis();
                System.out.println("共耗时："+(end-start)+"毫秒");

            }else if(NxConstants.JF07_WEB_SERVICE.equals(bse173)){

            }
        }


        /**
         * 3、返回处理结果信息
         */
        //TODO
        try {
            Map<String,String> paraMap=new HashMap<String, String>();
            String returnstr = ReaderSoapXmlOut4NX.buildSoapXMl4Single(paraMap);
            return returnstr;
        } catch (Exception e) {
            e.printStackTrace();
            return ReaderSoapXmlOut4NX.buildSoapXMl4Error(900, "构造返回报文出错！");
        }

    }


    //得到请求报文中的header信息，不对外暴露
    private FmInterfaceUtils getRequestParam(String transtowhere,String  usertowhere ){

        Map map=new HashMap();
        map.put("TRANSTOWHERE",transtowhere);
        map.put("USERTOWHERE",usertowhere);
        FmInterfaceUtils fmInterfaceUtils=fmInterfaceUtilsMapper.selectByPrimaryKey(map);

        return fmInterfaceUtils;
    }
}
