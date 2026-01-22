package com.example.wip.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.WorkspaceDTO;
import com.example.wip.service.interfaces.WorkspaceService;


@RestController
@RequestMapping("/api/workspace")
public class WorkspaceController {
    
    @Autowired
    WorkspaceService service;

    @GetMapping("/")
    public List<WorkspaceDTO> getTableros() {
        return service.obtenerTodosWorkspace();
    }
    
    @GetMapping("/usuario/{user}")
    public List<WorkspaceDTO> getTablerosPorUsuario(@PathVariable String user){
        return service.obtenerWorkspaceUsuario(user);
    }
}
