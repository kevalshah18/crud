package com.project.crud.dao;

import com.project.crud.entity.Student;

import java.util.List;

public interface StudentDAO {
    void save(Student student);

    Student findById(Integer id);

    List<Student> findAll();

    List<Student> findByName(String lastName);

    void update(Student theStudent);

    void delete(Integer id);
}
