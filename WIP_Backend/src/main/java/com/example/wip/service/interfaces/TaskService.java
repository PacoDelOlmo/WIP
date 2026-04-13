package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TaskDTO;

public interface TaskService {

    
    List<TaskDTO> tareasPorUsuario(long idUsuario);
    List<TaskDTO> getAll();
    TaskDTO nuevaTarea(long id, long idl, NewElementDTO tarea);
    TaskDTO editarNombreTarea(long id, long idl, long idt, NewElementDTO nombreTarea);
    TaskDTO editarTarea(long id, long idl, long idt, TaskDTO tarea);
    TaskDTO moverTarea(long id, long idl, long idt);
    TaskDTO actualizarEstadoTarea(long id, long idl, long idt);
    TaskDTO borrarTarea(long id, long idl, long idt);
}
