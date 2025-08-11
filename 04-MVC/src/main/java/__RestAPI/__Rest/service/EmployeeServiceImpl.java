package __RestAPI.__Rest.service;

import __RestAPI.__Rest.dao.EmployeeRepository;
import __RestAPI.__Rest.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository theEmployeeRepository) {
        employeeRepository = theEmployeeRepository;
    }

    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAllByOrderByLastNameAsc();
    }

    @Override
    public Employee findById(Integer id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        Employee emp = null;
        if(employee.isPresent()){
            emp=employee.get();
        }else{
            throw new RuntimeException("Not found for Id : "+id);
        }
        return emp;
    }

    @Override
    public Employee save(Employee theEmployee) {
        return employeeRepository.save(theEmployee);
    }

    @Override
    public void deleteById(Integer id) {
        employeeRepository.deleteById(id);
    }

}
