package egovframework;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import egovframework.com.config.EgovWebApplicationInitializer;

//@ServletComponentScan
//@SpringBootApplication
//@Import({EgovWebApplicationInitializer.class})
@EnableAspectJAutoProxy
@EnableTransactionManagement
@SpringBootApplication
public class EgovBootApplication {
	public static void main(String[] args) {
		System.out.println("##### EgovBootApplication Start #####"); 
		SpringApplication springApplication = new SpringApplication(EgovBootApplication.class);
		springApplication.setBannerMode(Banner.Mode.OFF);
		//springApplication.setLogStartupInfo(false);
		springApplication.run(args);

		System.out.println("##### EgovBootApplication End #####");
	}
}

//public class EgovBootApplication {
//}
