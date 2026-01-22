package com.example.wip.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.TaskboardDTO;
import com.example.wip.service.interfaces.TaskboardService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/taskboard")
public class TaskBoardController {

    @Autowired
    TaskboardService service;

    @GetMapping("/")
    public List<TaskboardDTO> getTodosLosTableros() {
        return service.todosTableros();
    }

    @GetMapping("/tablero/{id}")
    public TaskboardDTO getMethodName(@PathVariable long id) {
        return service.obtenerTablero(id);
    }
    
    
    
}
