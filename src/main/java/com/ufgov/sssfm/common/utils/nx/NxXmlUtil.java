package com.ufgov.sssfm.common.utils.nx;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import com.ufgov.sssfm.common.utils.nx.annotation.ChildernAnnotation;
import com.ufgov.sssfm.common.utils.nx.sax.DefaultSAXParserHandler;
import com.ufgov.sssfm.common.utils.nx.sax.ParserHandlerFactory;
import org.xml.sax.SAXException;


/**
 * @author firmboy
 * @create 2018-06-27 上午9:25
 **/
public class NxXmlUtil {


    /**
     *
     * @param path
     * @param tClass
     * @param <T>
     * @return
     */
    public static <T> T xmlToBean(String path, Class<T> tClass,String handlerType){
        Map<String,Object> map = null;
        try {
            map = parseXml(new File(path),handlerType);
        } catch (IllegalAccessException e) {
            //解析出错
            e.printStackTrace();
        }
        return parse(map,tClass);
    }
    
    public static <T> List<T>  xmlToBeanListAd68(String path, Class<T> tClass,String handlerType){
    	ArrayList<Map<String, Object>> maps = null;
    	List<T> returnList=new ArrayList<T>();
        try {
            maps = parseXmlList(new File(path),handlerType);
        } catch (IllegalAccessException e) {
            //解析出错
            e.printStackTrace();
        }
        for(int i=0;i<maps.size();i++){
        	returnList.add(parse(maps.get(i),tClass));
        }
        return returnList;
    }
    
    public static <T> List<T>  xmlToBeanListJF07(String path, Class<T> tClass,String handlerType){
    	ArrayList<Map<String, Object>> maps = null;
    	List<T> returnList=new ArrayList<T>();
        try {
            maps = parseXmlList(new File(path),handlerType);
        } catch (IllegalAccessException e) {
            //解析出错
            e.printStackTrace();
        }
        for(int i=0;i<maps.size();i++){
        	maps.get(i);
        	System.out.println(maps.get(i));
        	returnList.add(parse(maps.get(i),tClass));
        }
        return returnList;
    }

    /**
     *
     * @param map
     * @param tClass
     * @param <T>
     * @return
     */
    public static <T> T parse(Map map,Class<T> tClass) {
        Constructor c = null;
        Object o = null;
        Constructor<?>[] constructors = tClass.getConstructors();
        for (Constructor constructor:constructors){
            Class[] parameterTypes = constructor.getParameterTypes();
            if(parameterTypes.length==0){
                //空的构造函数
                c = constructor;
            }
        }
        if(c == null){
            throw new IllegalStateException("类中没有空构造函数");
        }
        try {
            o = c.newInstance(new Object[]{});
        } catch (InstantiationException | IllegalAccessException |InvocationTargetException e) {
            e.printStackTrace();
        }
        //将map中的属性赋值到对象中区
        Field[] subFields = tClass.getDeclaredFields();
        Class<? super T> superclass = tClass.getSuperclass();
        Field[] superFields = superclass.getDeclaredFields();


        Field[] fields = new Field[subFields.length+superFields.length];
        int i = 0;
        for (Field field:subFields){
            fields[i++] = field;
        }
        for (Field field:superFields){
            fields[i++] = field;
        }
        for (Field field:fields){
            Class type = field.getType();
            field.setAccessible(true);
            if (type.isAssignableFrom(List.class)){
                //说明是数组，需要重新调用
                Type genericType = field.getGenericType();
                if(genericType instanceof ParameterizedType){
                    ParameterizedType pt = (ParameterizedType) genericType;
                    Class genericClazz = (Class) pt.getActualTypeArguments()[0];
                    ArrayList results = new ArrayList();
                    if(genericClazz.isAnnotationPresent(ChildernAnnotation.class)){
                    	List<Map<String,Object>> list = (List<Map<String,Object>>)map.get("Children");
                        for (Map<String,Object> detail:list){
                            Object result = parse(detail, genericClazz);
                            results.add(result);
                        }
                        try {
                            field.set(o,results);
                        } catch (IllegalAccessException e) {
                            e.printStackTrace();
                        }
                    }else{
                    	List<Map<String,Object>> list = (List<Map<String,Object>>)map.get("Details");
                        for (Map<String,Object> detail:list){
                            Object result = parse(detail, genericClazz);
                            results.add(result);
                        }
                    }
                    try {
                        field.set(o,results);
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    }
                }
            }else if(type.isAssignableFrom(Date.class)){
                try {
                    SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
                    if(map.get(field.getName()).toString().length()>0&&(!map.get(field.getName()).toString().contains("\n"))){
                    	Date date = format.parse(map.get(field.getName()).toString().substring(0,8));
                        field.set(o,date);
                    }else{
                    	field.set(o,null);
                    }
                    
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }catch (ParseException e) {
                    e.printStackTrace();
                }
            }else if(type.isAssignableFrom(BigDecimal.class)){
                try {
                	
                   field.set(o,new BigDecimal(map.get(field.getName()).toString()));
                    
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }else {
                try {
                    field.set(o,map.get(field.getName()));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }

        return (T)o;
    }



    public static Map<String,Object> parseXml(File file,String handlerType) throws IllegalAccessException {
        ArrayList<Map<String, Object>> maps = null;
        if(!file.exists()){
            throw new IllegalAccessException("文件访问不到");
        }
        SAXParserFactory factory = SAXParserFactory.newInstance();
        try {
            SAXParser parser = factory.newSAXParser();
            ParserHandlerFactory parserHandlerFactory = new ParserHandlerFactory();
            DefaultSAXParserHandler handler = parserHandlerFactory.getHandler(handlerType);
            parser.parse(file.getAbsolutePath(), handler);
            maps = handler.getMaps();
        } catch (ParserConfigurationException | SAXException  |IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return maps.get(0);
    }
    
    //返回包含多个map的List
    public static ArrayList<Map<String, Object>>  parseXmlList(File file,String handlerType) throws IllegalAccessException {
        ArrayList<Map<String, Object>> maps = null;
        if(!file.exists()){
            throw new IllegalAccessException("文件访问不到");
        }
        SAXParserFactory factory = SAXParserFactory.newInstance();
        try {
            SAXParser parser = factory.newSAXParser();
            ParserHandlerFactory parserHandlerFactory = new ParserHandlerFactory();
            DefaultSAXParserHandler handler = parserHandlerFactory.getHandler(handlerType);
            parser.parse(file.getAbsolutePath(), handler);
            maps = handler.getMaps();
        } catch (ParserConfigurationException | SAXException  |IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return maps;
    }

}
