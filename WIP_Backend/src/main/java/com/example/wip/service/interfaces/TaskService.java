package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.TaskDTO;

public interface TaskService {

    
    List<TaskDTO> tareasPorUsuario(long idUsuario);
    List<TaskDTO> getAll();
}
