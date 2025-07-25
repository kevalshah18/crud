package com.project.crud.dao;

import com.project.crud.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class StudentDAOImpl implements StudentDAO {
    private EntityManager entityManager;

    @Autowired
    public StudentDAOImpl(EntityManager entityManager){
        this.entityManager=entityManager;
    }

    @Override
    @Transactional
    public  void save(Student student){
    entityManager.persist(student);
    }

    @Override
    public Student findById(Integer id) {
       return entityManager.find(Student.class,id);
    }

    public List<Student> findAll(){
        TypedQuery<Student> query = entityManager.createQuery("FROM Student",Student.class);
        return query.getResultList();
    }

    @Override
    public List<Student> findByName(String lastName) {
        TypedQuery<Student> query = entityManager.createQuery("FROM Student where lastName =:theData",Student.class);

        query.setParameter("theData",lastName);
        return query.getResultList();
    }

    @Override
    @Transactional
    public void update(Student theStudent) {
        entityManager.merge(theStudent);
    }

}
