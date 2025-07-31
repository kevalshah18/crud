package __RestAPI.__Rest.dao;

import __RestAPI.__Rest.entity.Employee;

import java.util.List;

public interface EmployeeDAO {
    List<Employee> findAll();

    Employee findById(Integer id);

    Employee save(Employee theEmployee);

    void deleteById(Integer id);
}
