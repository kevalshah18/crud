package com.project.crud.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    @NonNull
    private String firstName;

    @Column(name = "last_name")
    @NonNull
    private String lastName;

    @Column(name="email")
    @NonNull
    private String email;
}
