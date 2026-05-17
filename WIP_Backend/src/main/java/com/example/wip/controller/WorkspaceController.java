package com.example.wip.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.UserWorkSpaceDTO;
import com.example.wip.model.WorkspaceDTO;
import com.example.wip.service.interfaces.WorkspaceService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/workspace")
public class WorkspaceController {
    
    @Autowired
    WorkspaceService service;

    @GetMapping("/")
    public List<WorkspaceDTO> getTableros() {
        return service.obtenerTodosWorkspace();
    }

    @GetMapping("/obtener/{id}")
    public WorkspaceDTO getWorkSpacePorID(@PathVariable long id) {
        return service.obtenerWorkSpace(id);
    }

    @GetMapping("/usuario/{user}")
    public List<WorkspaceDTO> getWorkSpacesPorUsuario(@PathVariable long user){
        return service.obtenerWorkspaceUsuario(user);
    }

    @PostMapping("/{id}/compartir/user/{correo}")
    public boolean compartirWorkSpace(@PathVariable long id, @PathVariable String correo) {
        return service.compartirTableros(id, correo);
    }

    @PutMapping("/{id}/user/{idUser}/quitar")
    public boolean quitarAcceso(@PathVariable long id, @PathVariable long idUser) {
        return service.quitarAcceso(id, idUser);
    }
    
    @GetMapping("/{id}/permisos")
    public List<UserWorkSpaceDTO> mostrarPermisos(@PathVariable long id) {
        return service.mostrarPermisos(id);
    }
    
}
