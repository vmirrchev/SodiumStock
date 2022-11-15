package com.sodiumstock.repository;

import com.sodiumstock.model.Compound;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompoundRepository extends JpaRepository<Compound, Long> {
}
