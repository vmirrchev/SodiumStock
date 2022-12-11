package com.sodiumstock.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.sql.Date;

@Data
public class EntryRequest {

    @NotBlank
    private Long employeeId;

    @NotBlank
    private Long compoundId;

    @NotBlank
    private Date entryDate;

    @NotBlank
    private Date expirationDate;
}
