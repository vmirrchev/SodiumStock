package com.sodiumstock;


import com.sodiumstock.model.ERole;
import com.sodiumstock.model.Employee;
import com.sodiumstock.model.Role;
import com.sodiumstock.repository.EmployeeRepository;
import com.sodiumstock.repository.RoleRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class InitializeService {

    private Environment environment;
    private PasswordEncoder encoder;
    private EmployeeRepository employeeRepository;
    private RoleRepository roleRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void createMasterUser (){
        roleRepository.save(new Role(ERole.ROLE_ADMIN));

        Employee employee = new Employee(
                environment.getProperty("masterUsername"),
                "Vasil",
                "Mirchev",
                "sodiumstock@admin.com",
                "0883551909",
                encoder.encode(environment.getProperty("masterPassword")));

        Set<Role> roles = new HashSet<>();
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        roles.add(adminRole);
        employee.setRoles(roles);

        employeeRepository.save(employee);
    }
}
