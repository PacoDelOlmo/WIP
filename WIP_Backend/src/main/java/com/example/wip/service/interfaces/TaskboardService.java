package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.TaskboardDTO;

public interface TaskboardService {

    List<TaskboardDTO> todosTableros();
    TaskboardDTO obtenerTablero (long indice);
}
