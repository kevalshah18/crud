package __RestAPI.__Rest.controller;

import __RestAPI.__Rest.entity.Employee;
import __RestAPI.__Rest.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/employees")
public class EmployeeController {


    private EmployeeService employeeService;

    public EmployeeController(EmployeeService theEmployeeService){
        employeeService = theEmployeeService;
    }

    @GetMapping("/list")
    public String listEmployees(Model model){
        List<Employee> theEmployees = employeeService.findAll();
        model.addAttribute("employees",theEmployees);
        return "list-employees";
    }
}
