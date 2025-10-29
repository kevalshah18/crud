package __RestAPI.__Rest.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    // Pointcut for all REST controllers
    @Pointcut("execution(* __RestAPI.__Rest.rest..*(..))")
    public void restEndpoints() {}

    @Around("restEndpoints()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;

        logger.info("[{}] executed in {} ms", joinPoint.getSignature(), duration);
        return result;
    }
}
