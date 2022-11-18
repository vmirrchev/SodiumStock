package com.sodiumstock.controller;

import com.sodiumstock.model.Role;
import com.sodiumstock.repository.RoleRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RoleController {

        private final RoleRepository roleRepository;

        public RoleController(RoleRepository roleRepository) {
            this.roleRepository = roleRepository;
        }

        @PostMapping("/auth/role/create")
        @PreAuthorize("hasRole('ADMIN')")
        public Role addNewRole(@RequestBody Role role) {
            return roleRepository.save(role);
        }
}
