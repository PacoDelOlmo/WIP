package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.TaskEntity;
import com.example.wip.model.TaskDTO;
import com.example.wip.repository.TaskRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.TaskService;

@Service
@Primary
public class TaskServiceImplement implements TaskService {

    @Autowired
    TaskRepository repo;

    ConversorService conversor = new ConversorService();

    @Override
    public List<TaskDTO> tareasPorUsuario(long idUsuario) {
        List<TaskDTO> tareas = new ArrayList<TaskDTO>();
        List<TaskEntity> allTasks = new ArrayList<TaskEntity>(repo.buscarPorAutorId(idUsuario));

        for (TaskEntity t : allTasks){
            tareas.add(conversor.entityADto(t));
        }

        return tareas;
    }
    

    @Override
    public List<TaskDTO> getAll() {
        List<TaskDTO> tareas = new ArrayList<TaskDTO>();
        List<TaskEntity> allTasks = new ArrayList<TaskEntity>(repo.findAll());
        for (TaskEntity t : allTasks){
            tareas.add(conversor.entityADto(t));
        }
        return tareas;
    }
}
