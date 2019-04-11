package com.morning.background;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 启动程序
 *
 * @author xucy
 */
@SpringBootApplication
@EnableTransactionManagement
public class SssfmApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(SssfmApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SssfmApplication.class);
    }
}
