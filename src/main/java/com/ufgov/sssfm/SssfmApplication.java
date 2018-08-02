package com.ufgov.sssfm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 启动程序
 *
 * @author ruoyi
 */
@SpringBootApplication
@EnableTransactionManagement
public class SssfmApplication {

    public static void main(String[] args) {
        SpringApplication.run(SssfmApplication.class, args);
    }
}
