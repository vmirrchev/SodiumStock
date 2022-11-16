package com.sodiumstock.repository;

import com.sodiumstock.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);

    Optional<Employee> findByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByUsername(String email);
}
