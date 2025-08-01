package __RestAPI.__Rest.dao;

import __RestAPI.__Rest.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "employees")
public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
}
