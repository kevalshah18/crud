package __RestAPI.__Rest.service;

import __RestAPI.__Rest.entity.Employee;

import java.util.List;


public interface EmployeeService {
    List<Employee> findAll();

    Employee findById(Integer id);

    Employee save(Employee theEmployee);

    void deleteById(Integer id);


}