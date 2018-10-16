package com.ufgov.sssfm.socket;

import com.ufgov.sssfm.socket.constant.Constant;
import com.ufgov.sssfm.socket.dao.BaseDAO;
import com.ufgov.sssfm.socket.utils.FtpUtils;
import com.ufgov.sssfm.socket.utils.XMLUtil;
import org.w3c.dom.Document;

import javax.xml.transform.dom.DOMSource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.util.List;

public class SocketOperate extends Thread {
    private Socket socket;

    public SocketOperate(Socket socket) {
        this.socket = socket;
    }

    @SuppressWarnings("unused")
    public void run() {
        System.out.println("---------------进入---------------");
        /*
        try{
            InputStream in= socket.getInputStream();
            PrintWriter out=new PrintWriter(socket.getOutputStream());
            while(true){
                //读取客户端发送的信息
                String strXML = "";
                byte[] temp = new byte[1024];
                int length = 0;
                while((length = in.read(temp)) != -1){
                    strXML += new String(temp,0,length);
                }
                if("end".equals(strXML)){
                    System.out.println("准备关闭socket");
                    break;
                }
                if("".equals(strXML))
                    continue;
                System.out.println("客户端发来："+strXML.toString());
                // 发送给客户端数据
                //DataOutputStream out2 = new DataOutputStream(socket.getOutputStream());
                //out2.writeUTF("hi,i am hserver!i say:" + "是你吗 小伙子");
                out.print("Hi, I have received your message!");
                out.flush();
                out.close();
            }
            socket.close();
            System.out.println("socket stop.....");
        }catch(IOException ex){
            ex.printStackTrace();
        }finally{

        }
        */

        try {
            // 读取客户端数据
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String clientInputStr = input.readLine();//这里要注意和客户端输出流的写方法对应,否则会抛 EOFException
            // 处理客户端数据
            System.out.println("客户端发过来的内容:" + clientInputStr);
            XMLUtil util = new XMLUtil();
            String appCode = "";
            String typeCode = util.analysisTypeCode(clientInputStr);
            String fileName="";                //需要读取得文件名
//            if (typeCode.equals("njc4")) {
//                // 缴费汇总
//                appCode = util.analysisTotalContrXml(clientInputStr);
//            } else if (typeCode.equals("njc6")) {
//                // 汇款指令
//                appCode = util.analysisInstructXml(clientInputStr);
//            } else {
//                appCode = "9999";
//            }


            if (typeCode.equals("22215")) {
                BaseDAO daoinsert = new BaseDAO();
                //String table_name="";           //通过sockek 获取要插入的表

                FtpUtils ftp = new FtpUtils();
                List <List> listdata; //获取Ftp s缴费信息数据
                listdata = ftp.readTxtFile(fileName);
                daoinsert.insertReturnInfo(listdata, fileName); //数据入库 returninfo 表
            }else if (typeCode.equals("22216")){
                FtpUtils ftp = new FtpUtils();
                List <List> listdata; //获取Ftp s缴费信息数据
                listdata = ftp.readTxtFile(fileName);
                BaseDAO daoinsert = new BaseDAO();
                daoinsert.insertAREAMANAGE_TOTAL_INFO(listdata); //数据入库数据入库 统筹区汇总信息 areamanage_total_info 表
            }else if (typeCode.equals("22217")) {
                FtpUtils ftp = new FtpUtils();
                List<List> listdata; //获取Ftp s缴费信息数据
                listdata = ftp.readTxtFile(fileName);
                BaseDAO daoinsert = new BaseDAO();
                daoinsert.insertCORP_DETAIL(listdata); //数据入库 统筹区汇总信息 单位详细CORP_DETAIL表
            }else if (typeCode.equals("22218")) {
                FtpUtils ftp = new FtpUtils();
                List<List> listdata; //获取Ftp s缴费信息数据
                listdata = ftp.readTxtFile(fileName);
                BaseDAO daoinsert = new BaseDAO();
                daoinsert.insertCORP_DETAIL_DEFAULT(listdata); //数据入库单位详细 默认CORP_DETAIL_DEFAULT表
            }else if (typeCode.equals("22219")) {
                FtpUtils ftp = new FtpUtils();
                List<List> listdata; //获取Ftp s缴费信息数据
                listdata = ftp.readTxtFile(fileName);
                BaseDAO daoinsert = new BaseDAO();
                daoinsert.insertPERSON_DETAIL(listdata); //数据入库g个人详细信息表person_detail
            }else if (typeCode.equals("22220")) {
                FtpUtils ftp = new FtpUtils();
                List<List> listdata; //获取Ftp s缴费信息数据
                listdata = ftp.readTxtFile(fileName);
                BaseDAO daoinsert = new BaseDAO();
                daoinsert.insertPERSON_DETAIL_DEFAULT(listdata); //数据入库g个人详细信息表person_detail_default（默认）
            }else if (typeCode.equals("jishi1")) {
                FtpUtils ftp = new FtpUtils();
                List<List> listdata; //获取Ftp s缴费信息数据
                listdata = ftp.readTxtFile(fileName);
                String actual_serial_no ="110314005";
                String pingzhanghao = "110314006";
                String actualState = "1";
                BaseDAO daoinsert = new BaseDAO();
                daoinsert.updateAREAMANAGE_TOTAL_INFO(actual_serial_no,pingzhanghao, actualState); //数据更新，当财务系统及纪实理生成凭证号，更改纪实统筹区汇总表数据凭证号和状态字段）
            }else if (typeCode.equals("jishi2")) {
                FtpUtils ftp = new FtpUtils();
                List<List> listdata; //获取Ftp s缴费信息数据
                listdata = ftp.readTxtFile(fileName);
                String actual_serial_no ="110314002";
                String pingzhanghao = "110314003";
                String actualState = "2";
                BaseDAO daoinsert = new BaseDAO();
                daoinsert.updateAREAMANAGE_TOTAL_INFO( actual_serial_no,pingzhanghao,actualState); //数据更新，当财务系统补记处理生成凭证号，更改补记统筹区汇总表数据凭证号和状态字段）
            }


            String appsg = "";
            String[][] arr = Constant.RETURNCODE;
            for (String[] str : arr) {
                if (str[0].equals(appCode)) {
                    appsg = str[1];
                }
            }
            Document returnDoc = util.getReturnXML(clientInputStr, appCode, appsg);
            DOMSource source = new DOMSource(returnDoc);


            // 向客户端回复信息
            PrintStream out = new PrintStream(socket.getOutputStream());
            //System.out.print("请输入:\t");
            // 发送键盘输入的一行
            //String s = new BufferedReader(new InputStreamReader(System.in)).readLine();
            out.println("I have received!");

            /*
            String returnXml = out.getBuffer().toString().replaceAll("standalone=\"no\"", "");
            lenStr = Integer.toHexString(returnXml.getBytes("UTF-8").length);
            if (lenStr.length() < 8) {
                for ( int i = lenStr.length(); i < 8 ; i++) {
                    lenStr = "0" + lenStr;
                }
            }
            returnXml = lenStr + returnXml;
            out.println(returnXml);
            */
            out.close();
            input.close();
        } catch (Exception e) {
            System.out.println("服务器 run 异常: " + e.getMessage());
        } finally {
            if (socket != null) {
                try {
                    socket.close();
                } catch (Exception e) {
                    socket = null;
                    System.out.println("服务端 finally 异常:" + e.getMessage());
                }
            }
        }
    }
}
