package egovframework.uv.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@PropertySource("classpath:application.properties")
public class UvBaseProperty {
    static Environment environment;

    @Autowired
    public void setEnvironment(Environment env) {
        environment = env;
    }

    @Autowired
    public static String getProperty(String key) {
        return environment.getProperty(key);
    }
}
