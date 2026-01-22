package com.example.wip.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.TaskDTO;
import com.example.wip.service.interfaces.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    TaskService service;

    @GetMapping("/usuario/{id}")
    public List<TaskDTO> tareasUsuario(@PathVariable long id) {
        return service.tareasPorUsuario(id);
    }
    
    @GetMapping("/")
    public List<TaskDTO> getAllTareas() {
        return service.getAll();
    }
    
}
