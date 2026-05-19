package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.NewElementDTO;
import com.example.wip.model.NewTaskDTO;
import com.example.wip.model.TaskDTO;

public interface TaskService {

    
    List<TaskDTO> tareasPorUsuario(long idUsuario);
    List<TaskDTO> getAll();
    TaskDTO nuevaTarea(long id, long idl, NewTaskDTO tarea);
    TaskDTO editarNombreTarea(long id, long idl, long idt, NewElementDTO nombreTarea);
    TaskDTO editarTarea(long id, long idl, long idt, TaskDTO tarea);
    TaskDTO moverTarea(long id, long idl, long idt);
    TaskDTO actualizarEstadoTarea(long id, long idl, long idt);
    boolean borrarTarea(long id, long idl, long idt);
    TaskDTO editarColorTarea(long id, long idl, long idt, NewElementDTO nuevoColor);
}
