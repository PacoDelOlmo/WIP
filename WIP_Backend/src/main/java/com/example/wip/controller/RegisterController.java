package com.example.wip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.LoginDTO;
import com.example.wip.model.NewUserDTO;
import com.example.wip.model.UserDTO;
import com.example.wip.service.interfaces.UserService;

@RestController
@RequestMapping("api/register/user")
public class RegisterController {
    
     @Autowired
    UserService service;

    @PostMapping("/")
    public UserDTO register (@RequestBody NewUserDTO nuevoUsuario) {
        return service.registrarUsuario(nuevoUsuario);
    }
}
