package __RestAPI.__Rest.entity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StudentRestController {

    @GetMapping("/student")
    public void getMapingData(){
        System.out.println("Helllow");
    }
}
