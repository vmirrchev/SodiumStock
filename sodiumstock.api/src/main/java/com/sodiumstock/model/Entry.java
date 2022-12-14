package com.sodiumstock.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "entries")
public class Entry implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "compound_id", referencedColumnName = "id")
    private Compound compound;

    @NotNull
    private Date entryDate;

    @NotNull
    private Date expirationDate;

    public Entry(Employee employee, Compound compound, Date entryDate, Date expirationDate) {
        this.employee = employee;
        this.compound = compound;
        this.entryDate = entryDate;
        this.expirationDate = expirationDate;
    }
}
