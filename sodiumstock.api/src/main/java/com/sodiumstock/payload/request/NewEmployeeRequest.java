package com.sodiumstock.payload.request;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
public class NewEmployeeRequest {

    @NotBlank
    private String username;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotBlank
    @Email
    private String email;

    private String phoneNumber;

    private Set<String> roles;

    @NotBlank
    private String password;
}
