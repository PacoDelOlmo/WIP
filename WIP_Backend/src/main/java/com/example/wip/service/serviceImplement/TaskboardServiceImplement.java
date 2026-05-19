package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.TaskEntity;
import com.example.wip.entities.TaskboardEntity;
import com.example.wip.entities.TaskqueueEntity;
import com.example.wip.entities.UserEntity;
import com.example.wip.entities.WorkspaceEntity;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.OrdenListasDTO;
import com.example.wip.model.OrdenTareasListaDTO;
import com.example.wip.model.TaskboardDTO;
import com.example.wip.repository.TaskRepository;
import com.example.wip.repository.TaskboardRepository;
import com.example.wip.repository.TaskqueueRepository;
import com.example.wip.repository.UserRepository;
import com.example.wip.repository.WorkspaceRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.TaskboardService;

@Service
@Primary
public class TaskboardServiceImplement implements TaskboardService {

    @Autowired
    TaskboardRepository repo;

    @Autowired
    TaskqueueRepository tqRepo;

    @Autowired
    TaskRepository tRepo;

    @Autowired
    UserRepository uRepo;

    @Autowired
    WorkspaceRepository wRepo;

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
    public TaskboardDTO nuevoTablero(long id, long idw, NewElementDTO tablero) {
        TaskboardEntity nuevoTablero = new TaskboardEntity();
        Optional<UserEntity> usuario = uRepo.findById(id);
        Optional<WorkspaceEntity> workspace = wRepo.findById(idw);

        if (usuario.isPresent() && workspace.isPresent()){
            if (usuario.get().getIdUsuario() == workspace.get().getPropietario().getIdUsuario() && workspace.get().getIdEspacioTrabajo() == idw){
                nuevoTablero.setNombreTablero(tablero.getTittle());
                nuevoTablero.setEspacioTrabajo(workspace.get());
                nuevoTablero.setColor("#A8D1D5");
                repo.save(nuevoTablero);
            }
        }

        return conversor.entityADto(nuevoTablero);
    }

    @Override
    public TaskboardDTO editarTablero(long id, long idw, long idt, NewElementDTO nuevoNombre) {
        Optional<UserEntity> usuario = uRepo.findById(id);
        Optional<WorkspaceEntity> workspace = wRepo.findById(idw);
        Optional<TaskboardEntity> tablero = repo.findById(idt);

        if (usuario.isPresent() && workspace.isPresent() && tablero.isPresent()){
            if (usuario.get().getIdUsuario() == id && workspace.get().getIdEspacioTrabajo() == idw && tablero.get().getIdTablero() == idt){
                tablero.get().setNombreTablero(nuevoNombre.getTittle());
                repo.save(tablero.get());
            }
        }

        return conversor.entityADto(tablero.get());
    }


    @Override
    public long obtenerIdWorkSpace(long id) {
        Optional<TaskboardEntity> tablero = repo.findById(id);
        if (tablero.isPresent()){
            return tablero.get().getEspacioTrabajo().getIdEspacioTrabajo();
        }
        return -1;
    }


    @Override
    public boolean borrarTablero(long id) {
        Optional<TaskboardEntity> tablero = repo.findById(id);

        if (tablero.isPresent()){
            repo.delete(tablero.get());
            return true;
        } else {
            return false;
        }
    }


    @Override
    public boolean actualizarOrdenListas(long id, OrdenListasDTO nuevoOrden) {
        boolean actualizado = false; 
        Optional<TaskboardEntity> tablero = repo.findById(id); 

        if (tablero.isPresent()){

            for (int i = 0; i < nuevoOrden.getListas().size(); i++){
                for (TaskqueueEntity lista : tablero.get().getListasTareas()){
                    if (lista.getIdListaTareas() == nuevoOrden.getListas().get(i)) {
                        lista.setPosicion(i);
                    }
                }
            }

            repo.save(tablero.get());

            actualizado = true;
        }



        return actualizado;
    }


    @Override
    public boolean actuaizarOrdenTareasLista(long idTablero, long idLista, OrdenTareasListaDTO nuevoOrden) {
        Optional<TaskboardEntity> tableroOpt = repo.findById(idTablero); 

    if (tableroOpt.isPresent()) {
        TaskboardEntity tablero = tableroOpt.get();
        TaskqueueEntity listaActual = null;

        for (TaskqueueEntity l : tablero.getListasTareas()) {
            if (l.getIdListaTareas() == idLista) {
                listaActual = l;
                break;
            }
        }

        if (listaActual != null) {
            List<TaskEntity> listaOrdenada = new ArrayList<>();

            for (int i = 0; i < nuevoOrden.getTareas().size(); i++) {
                Optional<TaskEntity> tareaOpt = tRepo.findById(nuevoOrden.getTareas().get(i));

                if (tareaOpt.isPresent()) {
                    TaskEntity tarea = tareaOpt.get();
                    
                    tarea.setPosicion(i); 
                    tarea.setListaTareas(listaActual); 
                    
                    listaOrdenada.add(tarea);
                }
            }

            listaActual.getTareas().clear();
            listaActual.getTareas().addAll(listaOrdenada);
            
            repo.save(tablero);
            return true;
            }
        }
        
        return false;
    }
}

