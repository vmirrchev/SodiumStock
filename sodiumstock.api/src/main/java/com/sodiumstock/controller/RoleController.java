package com.sodiumstock.controller;

import com.sodiumstock.model.Role;
import com.sodiumstock.repository.RoleRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/role")
public class RoleController {

        private final RoleRepository roleRepository;

        public RoleController(RoleRepository roleRepository) {
            this.roleRepository = roleRepository;
        }

        @PostMapping
        public Role addNewRole(@RequestBody Role role) {
            return roleRepository.save(role);
        }
}
