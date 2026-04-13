package com.example.wip.service.serviceImplement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.wip.entities.TaskboardEntity;
import com.example.wip.entities.TaskqueueEntity;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TaskQueueDTO;
import com.example.wip.repository.TaskRepository;
import com.example.wip.repository.TaskboardRepository;
import com.example.wip.repository.TaskqueueRepository;
import com.example.wip.repository.UserRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.TaskQueueService;

@Service
public class TaskQueueServiceImplement implements TaskQueueService{
    

        @Autowired
    TaskboardRepository tbRepo;

    @Autowired
    TaskqueueRepository tqRepo;

    @Autowired
    TaskRepository tRepo;

    @Autowired
    UserRepository uRepo;

    ConversorService conversor = new ConversorService();

    @Override
    public TaskQueueDTO nuevaLista(long id, NewElementDTO lista) {
        Optional<TaskboardEntity> tablero = tbRepo.findById(id);
        TaskqueueEntity nuevaListaTareas = new TaskqueueEntity();

        if (tablero.isPresent()){
            nuevaListaTareas.setTablero(tablero.get());
            nuevaListaTareas.setNombreLista(lista.getTittle());
            tqRepo.save(nuevaListaTareas);
        }

        return conversor.entityADto(nuevaListaTareas);

    }


    @Override
    public TaskQueueDTO editarLista(long id, long idl, NewElementDTO lista) {
        Optional<TaskboardEntity> tablero = tbRepo.findById(id);
        Optional<TaskqueueEntity> listaTareas = tqRepo.findById(idl);

        if (tablero.isPresent() && listaTareas.isPresent()){
            if (tablero.get() == listaTareas.get().getTablero()){
                listaTareas.get().setNombreLista(lista.getTittle());
                tqRepo.save(listaTareas.get());
            }

        }

        return conversor.entityADto(listaTareas.get());
    }


    @Override
    public TaskQueueDTO borrarLista(long id, long idl) {
        Optional<TaskboardEntity> tablero = tbRepo.findById(id);
        Optional<TaskqueueEntity> listaTareas = tqRepo.findById(idl);

        if (tablero.isPresent() && listaTareas.isPresent()){
            if (tablero.get() == listaTareas.get().getTablero()){
                tqRepo.delete(listaTareas.get());
            }

        }

        return conversor.entityADto(listaTareas.get()); 
    }

}
