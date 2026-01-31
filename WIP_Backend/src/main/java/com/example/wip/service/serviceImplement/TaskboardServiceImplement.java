package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.TaskboardEntity;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TaskDTO;
import com.example.wip.model.TaskQueueDTO;
import com.example.wip.model.TaskboardDTO;
import com.example.wip.repository.TaskboardRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.TaskboardService;

@Service
@Primary
public class TaskboardServiceImplement implements TaskboardService {

    @Autowired
    TaskboardRepository repo;

    ConversorService conversor = new ConversorService();


    @Override
    public TaskboardDTO obtenerTablero(long indice) {
        TaskboardDTO tablero = null;
        Optional<TaskboardEntity> tableroEntidad = repo.findById(indice);

        if (tableroEntidad.isPresent()){
            tablero = conversor.entityADto(tableroEntidad.get());
        }

        return tablero;
    }


    @Override
    public List<TaskboardDTO> todosTableros() {
        List<TaskboardEntity> tablerosEntidad = new ArrayList<TaskboardEntity>(repo.findAll());
        List<TaskboardDTO> tableros = new ArrayList<TaskboardDTO>();

        for (TaskboardEntity t : tablerosEntidad){
            tableros.add(conversor.entityADto(t));
        }

        return tableros;
    }


    @Override
    public TaskQueueDTO nuevaLista(long id, NewElementDTO lista) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'nuevaLista'");
    }


    @Override
    public TaskQueueDTO editarLista(long id, long idl, NewElementDTO lista) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'editarLista'");
    }


    @Override
    public TaskQueueDTO borrarLista(long id, long idl) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'borrarLista'");
    }


    @Override
    public TaskDTO nuevaTarea(long id, long idl, NewElementDTO tarea) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'nuevaTarea'");
    }


    @Override
    public TaskDTO editarNombreTarea(long id, long idl, long idt, NewElementDTO nombreTarea) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'editarNombreTarea'");
    }


    @Override
    public TaskDTO editarTarea(long id, long idl, long idt, TaskDTO tarea) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'editarTarea'");
    }


    @Override
    public TaskDTO moverTarea(long id, long idl, long idt) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'moverTarea'");
    }


    @Override
    public TaskDTO actualizarEstadoTarea(long id, long idl, long idt) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'actualizarEstadoTarea'");
    }


    @Override
    public TaskDTO borrarTarea(long id, long idl, long idt) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'borrarTarea'");
    }
    
}
