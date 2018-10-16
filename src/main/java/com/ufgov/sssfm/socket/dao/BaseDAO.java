package com.ufgov.sssfm.socket.dao;



import com.mysql.jdbc.PreparedStatement;
import com.ufgov.sssfm.socket.constant.Constant;
import com.ufgov.sssfm.socket.utils.ConvertUtil;
import com.ufgov.sssfm.socket.utils.DBUtils;
import com.ufgov.sssfm.socket.utils.FtpUtils;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BaseDAO {
    /*
     * 根据业务执行不同的sql，最终反馈listmap
     */
    public List<Map<String, String>> getData(String type) throws SQLException {
        Connection conn = null;
        ResultSet resultSet = null;
        List<Map<String, String>> lists = null;
        String sql = null;
        try {
            conn = DBUtils.getConnection();
            String[][] arr = Constant.INTFACESQL;
            for (String[] str : arr) {
                if (str[0].equals(type)) {
                    sql = str[1];
                }
            }
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            resultSet = pst.executeQuery();
            lists = ConvertUtil.rsToMaps(resultSet);
        } finally {
            DBUtils.close(conn, resultSet);
        }
        return lists;
    }

    /*
     * 根据业务执行不同的sql，最终反馈listmap
     */
    public boolean updateData(String type, String para) throws SQLException {
        Connection conn = null;
        int resultSet = 0;
        String sql = null;
        try {
            conn = DBUtils.getConnection();
            String[][] arr = Constant.INTFACESQL;
            for (String[] str : arr) {
                if (str[0].equals(type)) {
                    sql = str[1];
                }
            }
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, para);
            resultSet = pst.executeUpdate();
        } finally {
            DBUtils.close(conn, null);
        }
        return resultSet == 1;
    }

    /*
     * 根据业务执行不同的sql，最终反馈listmap
     */
    public List<Map<String, String>> getDataWhere(String type, String para) throws SQLException {
        Connection conn = null;
        ResultSet resultSet = null;
        List<Map<String, String>> lists = null;
        String sql = null;
        try {
            conn = DBUtils.getConnection();
            String[][] arr = Constant.INTFACESQL;
            for (String[] str : arr) {
                if (str[0].equals(type)) {
                    sql = str[1];
                }
            }
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, para);
            resultSet = pst.executeQuery();
            lists = ConvertUtil.rsToMaps(resultSet);
        } finally {
            DBUtils.close(conn, resultSet);
        }
        return lists;
    }

    /*
     * 插入日志表
     */
    public void insertLog(String sendContent, String result, String type, String returnContent, String pk) {
        Connection conn = null;
        String sql = "insert into interface_log(sendcontent,result,type,returncontent,pk) values (?,?,?,?,?)";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, sendContent);
            pst.setString(2, result);
            pst.setString(3, type);
            pst.setString(4, returnContent);
            pst.setString(5, pk);
            pst.executeUpdate();
        } catch (SQLException e) {
            // 插入日志异常

        } finally {
            DBUtils.close(conn, null);
        }
    }

    /*
     * 插入缴费汇总信息
     */
    public String insertTotalContr(String total_serial_no,
                                   String areamanagecode, String areamanagename, String type,
                                   String transfer_mon_date, String total_date, String contr_state,
                                   String contr_total, String actual_cash, String memo, String trancode) {
        Connection conn = null;
        String sql = "insert into totalcontrrecord(total_serial_no,areamanagecode,areamanagename,type,transfer_mon_date,total_date,contr_state,contr_total,actual_cash,memo,trancode,sendstatus) values (?,?,?,?,?,?,?,?,?,?,?,'0')";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, total_serial_no);
            pst.setString(2, areamanagecode);
            pst.setString(4, type);
            pst.setString(3, areamanagename);
            pst.setString(5, transfer_mon_date);
            pst.setString(6, total_date);
            pst.setString(7, contr_state);
            pst.setString(8, contr_total);
            pst.setString(9, actual_cash);
            pst.setString(10, memo);
            pst.setString(11, trancode);
            pst.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "9900";
        } finally {
            DBUtils.close(conn, null);
        }
        return "0000";
    }

    /*
     * 更新到账信息
     */
    public String updateContr(String total_serial_no, String transfer_mon_date,
                              String a_contr_total, String contr_state) {
        Connection conn = null;
        String querySql = "select * from totalcontrrecord where total_serial_no=?";
        String updatesql = "update totalcontrrecord set transfer_mon_date=?,contr_state=?,a_contr_total=? where total_serial_no=?";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(querySql);
            pst.setString(1, total_serial_no);
            ResultSet set = pst.executeQuery();
            if (set != null && set.next() == true) {
                java.sql.PreparedStatement ps = conn.prepareStatement(updatesql);
                ps.setString(4, total_serial_no);
                ps.setString(1, transfer_mon_date);
                ps.setString(3, a_contr_total);
                ps.setString(2, contr_state);
                ps.executeUpdate();
                return "0000";
            } else {
                return "5001";
            }
        } catch (SQLException e) {
            return "9900";
        } finally {
            DBUtils.close(conn, null);
        }
    }


    public String insertInstruct(String instruct_code, String instruct_date,
                                 String paybankaccname, String paybankaccno, String paybank,
                                 String gatheraccname, String gatherbankno, String gatherbank,
                                 String contrbalance, String memo) {
        Connection conn = null;
        String sql = "insert into instructrecord(instruct_code, instruct_date, paybankaccname,paybankaccno, paybank, gatheraccname, gatherbankno, gatherbank,	contrbalance, memo,sendstatus) values (?,?,?,?,?,?,?,?,?,?,'0')";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, instruct_code);
            pst.setString(2, instruct_date);
            pst.setString(3, paybankaccname);
           pst.setString(4, paybankaccno);
            pst.setString(5, paybank);
            pst.setString(6, gatheraccname);
            pst.setString(7, gatherbankno);
            pst.setString(8, gatherbank);
            pst.setString(9, contrbalance);
            pst.setString(10, memo);
            pst.executeUpdate();
        } catch (SQLException e) {
            return "9900";
        } finally {
            DBUtils.close(conn, null);
        }
        return "0000";
    }

    //数据入库 returninfo 表
    public void  insertReturnInfo(List <List> list, String  filename) {

        Connection conn = null;
        String  sql =  "insert into RETURNINFO ( AAZ061,AAB001,AAB099,AAB999,AAB069,AAA121,AAE036,AAE019,Real_contr_balance,Contr_feedback,memo,AREAMANAGECODE,gatherState,accountState ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            for(int n = 1; n < list.size(); n++) {
                String[] strs = filename.split("_");
                String areamanagec = strs[1];
                System.out.println(areamanagec);
                for(int k=0; k < list.get(n).size(); k++){
                    Object  tableCloumn = list.get(n).get(k);
                    System.out.print(tableCloumn);
                    pst.setObject(k+1, tableCloumn);

                }
                    pst.setObject(12, areamanagec);   //统筹区代码一开始没有
                    pst.setObject(13, 0);         //状态一开始没有
                    pst.setObject(14, 0);            //状态一开始没有
                    System.out.print(pst.toString());
                    pst.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
}
    //数据入库 AREAMANAGE_TOTAL_INFO 表  统筹区汇总信息
    public void  insertAREAMANAGE_TOTAL_INFO(List <List> list) {

        Connection conn = null;
        String  sql =  "insert into AREAMANAGE_TOTAL_INFO ( ACTUAL_SERIAL_NO,AREAMANAGECODE,AREAMANAGENAME,ACTUAL_TYPE,ACTUAL_TOTAL,MEMO，PINGZHENGHAO，ACTUALSTATE ) values (?,?,?,?,?,?,?,?)";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            for(int n = 1; n < list.size(); n++) {
                for(int k=0; k < list.get(n).size(); k++){
                    Object  tableCloumn = list.get(n).get(k);
                    System.out.print(tableCloumn);
                    pst.setObject(k+1, tableCloumn);
                }
                pst.setObject(7, "");  //PINGZHENGHAO 开始接收得为空
                pst.setObject(8, 0);  //状态 开始接收默认为0
                System.out.print(pst.toString());
                pst.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //数据入库 CORP_DETAIL 表  统筹区汇总信息单位明细
    public void  insertCORP_DETAIL(List <List> list) {

        Connection conn = null;
        String  sql =  "insert into CORP_DETAIL ( ACTUAL_SERIAL_NO,ACTUAL_CORP_SERIAL_NO,CORP_JGB_UNIQUE_CODE," +
                "CORP_NAME,CORP_SI_CODE,ACTUAL_START_DATE,ACTUAL_END_DATE,ACTUAL_BALANCE,MEMO ) " +
                "values (?,?,?,?,?,?,?,?,?)";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            for(int n = 1; n < list.size(); n++) {
                for(int k=0; k < list.get(n).size(); k++){
                    Object  tableCloumn = list.get(n).get(k);
                    System.out.print(tableCloumn);
                    pst.setObject(k+1, tableCloumn);
                }
                System.out.print(pst.toString());
                pst.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }


    }
    //数据入库 CORP_DETAIL_DEFAULT 表  统筹区汇总信息单位明细默认纪实/补记单位明细
    public void  insertCORP_DETAIL_DEFAULT(List <List> list) {

        Connection conn = null;
        String  sql =  "insert into CORP_DETAIL_DEFAULT ( ACTUAL_CORP_SERIAL_NO,AREAMANAGECODE,AREAMANAGENAME," +
                "ACTUAL_TYPE,CORP_JGB_UNIQUE_CODE,CORP_NAME,CORP_SI_CODE,ACTUAL_TOTAL,MEMO ) " +
                "values (?,?,?,?,?,?,?,?,?)";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            for(int n = 1; n < list.size(); n++) {
                for(int k=0; k < list.get(n).size(); k++){
                    Object  tableCloumn = list.get(n).get(k);
                    System.out.print(tableCloumn);
                    pst.setObject(k+1, tableCloumn);
                }
                System.out.print(pst.toString());
                pst.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }


    }
    //数据入库 PERSON_DETAIL 表  统筹区汇总信息个人明细
    public void  insertPERSON_DETAIL(List <List> list) {

        Connection conn = null;
        String  sql =  "insert into PERSON_DETAIL ( ACTUAL_CORP_SERIAL_NO,PSN_JGB_UNIQUE_CODE,NAME," +
                "PK_IDENTITY_TYPE,IDENTITY,ACTUAL_BANLANCE,MEMO ) " +
                "values (?,?,?,?,?,?,?)";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            for(int n = 1; n < list.size(); n++) {
                for(int k=0; k < list.get(n).size(); k++){
                    Object  tableCloumn = list.get(n).get(k);
                    System.out.print(tableCloumn);
                    pst.setObject(k+1, tableCloumn);
                }
                System.out.print(pst.toString());
                pst.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    //数据入库 person_detail_default 表  统筹区汇总信息个人明细默认记实补记
    public void  insertPERSON_DETAIL_DEFAULT(List <List> list) {

        Connection conn = null;
        String sql = "insert into PERSON_DETAIL_DEFAULT ( ACTUAL_CORP_SERIAL_NO,PSN_JGB_UNIQUE_CODE,NAME," +

                "PK_IDENTITY_TYPE,IDENTITY_NO,ACTUAL_BALANCE,MEMO ) " + "values (?,?,?,?,?,?,?)";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            for (int n = 1; n < list.size(); n++) {
                for (int k = 0; k < list.get(n).size(); k++) {
                    Object tableCloumn = list.get(n).get(k);
                    System.out.print(tableCloumn);
                    pst.setObject(k + 1, tableCloumn);
                }
                System.out.print(pst.toString());
                pst.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public void updateAREAMANAGE_TOTAL_INFO(String actual_serial_no,String pingzhanghao,String actualState ) {
        Connection conn = null;
        String querySql = "select * from AREAMANAGE_TOTAL_INFO where actual_serial_no=?";
        String updatesql = "update AREAMANAGE_TOTAL_INFO set PINGZHENGHAO=?,ACTUALSTATE=? where actual_serial_no=?";
        try {
            conn = DBUtils.getConnection();
            java.sql.PreparedStatement pst = conn.prepareStatement(querySql);
            pst.setString(1, actual_serial_no);
            ResultSet set = pst.executeQuery();
            if (set != null && set.next() == true) {
                java.sql.PreparedStatement ps = conn.prepareStatement(updatesql);
                ps.setString(3, actual_serial_no);
                ps.setString(1, pingzhanghao);
                ps.setString(2, actualState);
                ps.executeUpdate();

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtils.close(conn, null);
        }
    }
  }

