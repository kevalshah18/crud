package __RestAPI.__Rest.aspect;

import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ExceptionAspect {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionAspect.class);

    @AfterThrowing(pointcut = "execution(* __RestAPI.__Rest.rest..*(..))", throwing = "ex")
    public void logException(Exception ex) {
        logger.error("Exception occurred: {}", ex.getMessage(), ex);
    }
}
