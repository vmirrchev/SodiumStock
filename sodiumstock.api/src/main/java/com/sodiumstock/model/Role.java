package com.sodiumstock.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@Table(name = "roles")
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //DB property will be of type VARCHAR
    @Enumerated(EnumType.STRING)
    private ERole name;

    @JsonIgnore
    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
    private Set<Employee> employees;
}
