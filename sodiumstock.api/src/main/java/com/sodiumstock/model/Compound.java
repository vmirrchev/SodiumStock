package com.sodiumstock.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@Table(name = "compounds", uniqueConstraints = {
        @UniqueConstraint(columnNames = "casName"),
        @UniqueConstraint(columnNames = "casNumber"),
        @UniqueConstraint(columnNames = "molecularFormula")
})
public class Compound implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String casName;

    @NotNull
    private String casNumber;

    @NotNull
    private String molecularFormula;

    @NotNull
    private double molarMass;

    @NotNull
    private double boilingPoint;

    @NotNull
    private double meltingPoint;

    @NotNull
    private double density;

    @ElementCollection
    private List<String> otherNames;

    @NotNull
    private String imageUrl;

    @JsonIgnore
    @OneToMany(mappedBy = "compound")
    private Set<Entry> entries;
}
