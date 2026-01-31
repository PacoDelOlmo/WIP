package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TaskDTO;
import com.example.wip.model.TaskQueueDTO;
import com.example.wip.model.TaskboardDTO;

public interface TaskboardService {

    List<TaskboardDTO> todosTableros();
    TaskboardDTO obtenerTablero (long indice);
    TaskQueueDTO nuevaLista(long id, NewElementDTO lista);
    TaskQueueDTO editarLista(long id, long idl, NewElementDTO lista);
    TaskQueueDTO borrarLista(long id, long idl);
    TaskDTO nuevaTarea(long id, long idl, NewElementDTO tarea);
    TaskDTO editarNombreTarea(long id, long idl, long idt, NewElementDTO nombreTarea);
    TaskDTO editarTarea(long id, long idl, long idt, TaskDTO tarea);
    TaskDTO moverTarea(long id, long idl, long idt);
    TaskDTO actualizarEstadoTarea(long id, long idl, long idt);
    TaskDTO borrarTarea(long id, long idl, long idt);
}
