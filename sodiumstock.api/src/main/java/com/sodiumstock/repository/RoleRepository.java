package com.sodiumstock.repository;

import com.sodiumstock.model.ERole;
import com.sodiumstock.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
