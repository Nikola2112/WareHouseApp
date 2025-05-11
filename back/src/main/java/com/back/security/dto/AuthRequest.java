package com.back.security.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class AuthRequest {

    @NotBlank(message = "Ім'я обов'язкове")
    private String firstName;

    @NotBlank(message = "Прізвище обов'язкове")
    private String lastName;

    @NotBlank(message = "Email обов'язковий")
    @Email(message = "Некоректний email")
    private String email;

    @NotBlank(message = "Пароль обов'язковий")
    @Size(min = 6, message = "Пароль має містити щонайменше 6 символів")
    private String password;
}



