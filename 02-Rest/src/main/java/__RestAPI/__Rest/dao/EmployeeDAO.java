package __RestAPI.__Rest.dao;

import __RestAPI.__Rest.entity.Employee;

import java.util.List;

public interface EmployeeDAO {
    List<Employee> findAll();
}
