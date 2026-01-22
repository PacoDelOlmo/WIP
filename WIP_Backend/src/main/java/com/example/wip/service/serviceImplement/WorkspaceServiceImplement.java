package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.WorkspaceEntity;
import com.example.wip.model.WorkspaceDTO;
import com.example.wip.model.UserDTO;
import com.example.wip.repository.WorkspaceRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.WorkspaceService;

@Service
@Primary
public class WorkspaceServiceImplement implements WorkspaceService {

    @Autowired
    WorkspaceRepository repo;

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
    
}
