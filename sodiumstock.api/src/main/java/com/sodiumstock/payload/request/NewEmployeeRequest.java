package com.sodiumstock.payload.request;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class NewEmployeeRequest {

    @NotBlank
    private String username;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private String phoneNumber;

    @NotBlank
    @Email
    private String email;

    private String role;

    @NotBlank
    private String password;
}
