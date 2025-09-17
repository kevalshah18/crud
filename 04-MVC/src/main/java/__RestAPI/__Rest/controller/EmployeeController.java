package __RestAPI.__Rest.controller;

import __RestAPI.__Rest.entity.Employee;
import __RestAPI.__Rest.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
        return "employee/list-employees";
    }
    @GetMapping("/showFormForAdd")
    public String showFormForAdd(Model theModel){
        //create model attribuite for binding the form data
        Employee theEmployee = new Employee();
        theModel.addAttribute("employee",theEmployee);
        return "employee/employees-form";
    }

    @GetMapping("/showFormForUpdate")
    public String showFormForUpdate(@RequestParam("employeeId")int id,Model theModel){
        Employee employee = employeeService.findById(id);
        theModel.addAttribute("employee",employee);
        return "employee/employees-form";
    }


    @PostMapping("/save")
    public String addEmployee(@ModelAttribute Employee employee){
        //save the employee

        employeeService.save(employee);
        return "redirect:/employees/list";
    }

    @GetMapping("/delete")
    public String delete(@RequestParam("employeeId")int Id){
        employeeService.deleteById(Id);
        return "redirect:/employees/list";
    }
}
