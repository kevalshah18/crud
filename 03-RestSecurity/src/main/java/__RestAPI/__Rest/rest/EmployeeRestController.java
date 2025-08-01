package __RestAPI.__Rest.rest;

import __RestAPI.__Rest.entity.Employee;
import __RestAPI.__Rest.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EmployeeRestController {

    private EmployeeService employeeService;
    private ObjectMapper objectMapper;

    @Autowired
    public EmployeeRestController(EmployeeService theEmployeeService, ObjectMapper theObjectMapper) {
        employeeService = theEmployeeService;
        objectMapper = theObjectMapper;
    }

    @GetMapping("/employees")
    public List<Employee> findAll() {
        return employeeService.findAll();
    }

    @GetMapping("/employees/{employeeId}")
    public Employee findEmployeeById(@PathVariable Integer employeeId){
        return employeeService.findById(employeeId);
    }

    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee){
        employee.setId(0);
        return employeeService.save(employee);
    }

    @PutMapping("/employees")
    public Employee updateEmployee(@RequestBody Employee employee){
//        Employee updateEmployee = employeeService.findById(employee.getId());
//        updateEmployee.setFirstName(employee.getFirstName());
//        updateEmployee.setLastName(employee.getLastName());
//        updateEmployee.setEmail(employee.getEmail());
//
//        return employeeService.save(updateEmployee);

        return employeeService.save(employee);
    }

    @PatchMapping("/employees/{employeeId}")
    public Employee patchUpdateEmployee(@PathVariable Integer employeeId,
                                        @RequestBody Map<String,Object> patchPayLoad){
        Employee tempEmployee = employeeService.findById(employeeId);

        if(tempEmployee==null){
            throw new RuntimeException("Employee not found. Id : "+employeeId);
        }
        if(patchPayLoad.containsKey("id")){
            throw new RuntimeException("Employee Id is not allowed :"+patchPayLoad.get("id"));
        }
        Employee updatedEmployee = apply(patchPayLoad,tempEmployee);

       return employeeService.save(updatedEmployee);
    }

    @DeleteMapping("/employees/{employeeId}")
    public String deleteEmployee(@PathVariable Integer employeeId){
        Employee tempEmployee = employeeService.findById(employeeId);

        if(tempEmployee==null){
            throw  new RuntimeException("Employee Id not found :"+employeeId);
        }
        employeeService.deleteById(employeeId);

        return "Deleted Employee id :"+employeeId;
    }

    private Employee apply(Map<String,Object> patchPayLoad, Employee employee){
        // Convert from Employee to JSON object Node
        ObjectNode employeeNode = objectMapper.convertValue(employee,ObjectNode.class);

        // Convert from patchPayLoad map to JSON Object Node
        ObjectNode patchNode = objectMapper.convertValue(patchPayLoad,ObjectNode.class);

        // Merge the patch updates into the employee node

        employeeNode.setAll(patchNode);
        return objectMapper.convertValue(employeeNode,Employee.class);

    }
}
