package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.UserEntity;
import com.example.wip.entities.WorkspaceEntity;
import com.example.wip.model.WorkspaceDTO;
import com.example.wip.model.NewElementDTO;
import com.example.wip.repository.UserRepository;
import com.example.wip.repository.WorkspaceRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.WorkspaceService;

@Service
@Primary
public class WorkspaceServiceImplement implements WorkspaceService {

    @Autowired
    WorkspaceRepository repo;

    @Autowired
    UserRepository uRepo;

    ConversorService conversor = new ConversorService();

    @Override
    public List<WorkspaceDTO> obtenerTodosWorkspace() {
        List<WorkspaceDTO> espaciosTrabajo = new ArrayList<WorkspaceDTO>();
        List<WorkspaceEntity> espaciosEntity = new ArrayList<WorkspaceEntity>(repo.findAll());

        for (WorkspaceEntity w : espaciosEntity){
            espaciosTrabajo.add(conversor.entityADto(w));
        }

        return espaciosTrabajo;
    }

    @Override
    public List<WorkspaceDTO> obtenerWorkspaceUsuario(String usuario) {
        List<WorkspaceDTO> espaciosTrabajo = new ArrayList<WorkspaceDTO>();
        List<WorkspaceEntity> espaciosEntity = new ArrayList<WorkspaceEntity>(repo.findAll());

        for (WorkspaceEntity w : espaciosEntity){
            if (w.getPropietario().getNombreUsuario().equals(usuario)){
                espaciosTrabajo.add(conversor.entityADto(w));
            }
        }

        return espaciosTrabajo;
    }
    
    @Override
    public WorkspaceDTO nuevoWorkspace(long id, NewElementDTO workspace) {
        WorkspaceEntity nuevoWorkspace = new WorkspaceEntity();
        Optional<UserEntity> usuario = uRepo.findById(id);

        if (usuario.isPresent()){
            nuevoWorkspace.setPropietario(usuario.get());
            nuevoWorkspace.setNombreEspacioTrabajo(workspace.getTittle());
            repo.save(nuevoWorkspace);
        }

        return conversor.entityADto(nuevoWorkspace);
    }

    @Override
    public WorkspaceDTO editarWorkspace(long id, long idw, NewElementDTO nuevoNombre) {
        Optional<UserEntity> usuario = uRepo.findById(id);
        Optional<WorkspaceEntity> workspace = repo.findById(idw);

        if (usuario.isPresent() && workspace.isPresent()){
            if (usuario.get().getIdUsuario() == workspace.get().getPropietario().getIdUsuario() && workspace.get().getIdEspacioTrabajo() == idw){
                workspace.get().setNombreEspacioTrabajo(nuevoNombre.getTittle());
                repo.save(workspace.get());
            }
        }

        return conversor.entityADto(workspace.get());
    }
}
