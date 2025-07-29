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
//            deleteStudent(studentDAO);
        };
    }

    private void deleteStudent(StudentDAO studentDAO){
        studentDAO.delete(5);
    }

    private void updateStudent(StudentDAO studentDAO){
        int studentId = 1;
        Student student = studentDAO.findById(studentId);
        student.setLastName("NewSurName");
        studentDAO.update(student);
    }

    private void findAllStudents(StudentDAO studentDAO) {
        for(Student student: studentDAO.findAll()){
            System.out.println(student);
        }
    }
    private void findByLastName(StudentDAO studentDAO){
        for (Student student : studentDAO.findByName("Thakkar")){
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
