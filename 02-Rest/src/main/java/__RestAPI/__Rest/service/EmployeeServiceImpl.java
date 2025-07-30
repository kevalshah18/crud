package __RestAPI.__Rest.service;

import __RestAPI.__Rest.dao.EmployeeDAO;
import __RestAPI.__Rest.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
private EmployeeDAO employeeDAO;

@Autowired
public EmployeeServiceImpl(EmployeeDAO theEmployeeDAO){
    employeeDAO = theEmployeeDAO;
}
@Override
    public List<Employee> findAll(){
    return null;
}

}
