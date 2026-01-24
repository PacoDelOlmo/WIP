package com.example.wip.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.LoginDTO;
import com.example.wip.service.interfaces.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/login/user")
public class LoginController {
    
    @Autowired
    UserService service;

    @GetMapping("/{correo}&{contrasena}")
    public LoginDTO login (@PathVariable String correo, @PathVariable String contrasena){
        return service.comprobarLogin(correo, contrasena);
    }
}
