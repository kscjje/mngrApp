package egovframework;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

//weblogic 설정
//https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-weblogic

@EnableAspectJAutoProxy
@EnableTransactionManagement
@SpringBootApplication
public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(EgovBootApplication.class);
    }

}


//war 실행 모드 설정
//https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-convert-an-existing-application-to-spring-boot

//@EnableAspectJAutoProxy
//@EnableTransactionManagement
//@SpringBootApplication
//@EnableScheduling
//public class ServletInitializer extends SpringBootServletInitializer {
//
//    @Override
//    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
//        return configureApplication(builder);
//    }
//
//    public static void main(String[] args) {
//        configureApplication(new SpringApplicationBuilder()).run(args);
//    }
//
//    private static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder) {
//    	return builder.sources(ServletInitializer.class);
//        //return builder.sources(Application.class).bannerMode(Banner.Mode.OFF);
//    }
//
//}

