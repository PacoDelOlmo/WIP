package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TaskboardDTO;

public interface TaskboardService {

    List<TaskboardDTO> todosTableros();
    TaskboardDTO obtenerTablero (long indice);
    TaskboardDTO nuevoTablero(long id, long idw, NewElementDTO tablero);
    TaskboardDTO editarTablero(long id, long idw, long idt, NewElementDTO nuevoNombre);
}
