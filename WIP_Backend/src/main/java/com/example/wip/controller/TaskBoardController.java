package com.example.wip.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TaskDTO;
import com.example.wip.model.TaskQueueDTO;
import com.example.wip.model.TaskboardDTO;
import com.example.wip.service.interfaces.TaskboardService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




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
    public TaskboardDTO accederTablero(@PathVariable long id) {
        return service.obtenerTablero(id);
    }

    @PostMapping("/tablero/{id}/nueva_lista")
    public TaskQueueDTO nuevaLista(@PathVariable long id, @RequestBody NewElementDTO lista) {
        return service.nuevaLista(id, lista);
    }

    @PutMapping("/tablero/{id}/lista/{idl}/editar")
    public TaskQueueDTO editarLista(@PathVariable long id, @PathVariable long idl, @RequestBody NewElementDTO lista) {
        return service.editarLista(id, idl, lista);
    }
    
    @PutMapping("/tablero/{id}/lista/{idl}/borrar")
    public TaskQueueDTO borrarLista(@PathVariable long id, @PathVariable long idl) {
        return service.borrarLista(id, idl);
    }

    @PostMapping("/tablero/{id}/lista/{idl}/nueva_tarea")
    public TaskDTO nuevaTarea(@PathVariable long id, @PathVariable long idl, @RequestBody NewElementDTO tarea) {
        return service.nuevaTarea(id, idl, tarea);
    }

    @PutMapping("/tablero/{id}/lista/{idl}/tarea/{idt}/editar_nombre")
    public TaskDTO editarNombreTarea(@PathVariable long id, @PathVariable long idl, @PathVariable long idt, @RequestBody NewElementDTO nombreTarea) {
        return service.editarNombreTarea(id, idl, idt, nombreTarea);
    }

    @PutMapping("/tablero/{id}/lista/{idl}/tarea/{idt}/editar")
    public TaskDTO editarTarea(@PathVariable long id, @PathVariable long idl, @PathVariable long idt, @RequestBody TaskDTO tarea) {
        return service.editarTarea(id, idl, idt, tarea);
    }

    @PutMapping("/tablero/{id}/lista/{idl}/tarea/{idt}/mover")
    public TaskDTO moverTarea(@PathVariable long id, @PathVariable long idl, @PathVariable long idt) {
        return service.moverTarea(id, idl, idt);
    }

    @PutMapping("/tablero/{id}/lista/{idl}/tarea/{idt}/actualizar_estado")
    public TaskDTO actualizarEstadoTarea(@PathVariable long id, @PathVariable long idl, @PathVariable long idt) {
        return service.actualizarEstadoTarea(id, idl, idt);
    }
    
    @PutMapping("/tablero/{id}/lista/{idl}/tarea/{idt}/borrar")
    public TaskDTO borrarTarea(@PathVariable long id, @PathVariable long idl, @PathVariable long idt) {
        return service.borrarTarea(id, idl, idt);
    }
    
}
