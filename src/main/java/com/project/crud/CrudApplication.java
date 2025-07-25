package com.project.crud;

import com.project.crud.dao.StudentDAO;
import com.project.crud.entity.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudApplication.class, args);

    }

    @Bean
    public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
        return runner -> {
            findByLastName(studentDAO,"Thakkar");
        };
    }

    private void findAllStudents(StudentDAO studentDAO) {
        for(Student student: studentDAO.findAll()){
            System.out.println(student);
        }
    }
    private void findByLastName(StudentDAO studentDAO,String lastName){
        for (Student student : studentDAO.findByName(lastName)){
            System.out.println(student);
        }

    }


    private void ReadStudent(StudentDAO studentDAO) {
        Student tempStudent = new Student("Navneet","Thakkar","Navvie@gmail.com");

        studentDAO.save(tempStudent);

        int intId= tempStudent.getId();
        System.out.println("Id found :"+intId);

        System.out.println(studentDAO.findById(intId));
    }

}
