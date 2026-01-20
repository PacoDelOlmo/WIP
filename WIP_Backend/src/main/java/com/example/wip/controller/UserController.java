package com.example.wip.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.UserDTO;
import com.example.wip.service.interfaces.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/users")
public class UserController {
    

    @Autowired
    UserService userService;

    @GetMapping("/")
    public List<UserDTO> obtenerUsuario() {
        return userService.obtenerUsuarios() ;
    }
    
}
