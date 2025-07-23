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
            createStudent(studentDAO);
        };
    }

    private void createStudent(StudentDAO studentDAO) {
        Student tempStudent = new Student("Ramakant","Thakkar","Rama@gmail.com");
        Student tempStuden1 = new Student("Radhe","Tiwari","Radhe@gmail.com");
        Student tempStuden2 = new Student("Jitu","Telecom","Jitu@gmail.com");
        studentDAO.save(tempStudent);
        studentDAO.save(tempStuden1);
        studentDAO.save(tempStuden2);
    }
}
