package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.UserEntity;
import com.example.wip.entities.UserWorkSpaceEntity;
import com.example.wip.entities.WorkspaceEntity;
import com.example.wip.model.WorkspaceDTO;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.UserWorkSpaceDTO;
import com.example.wip.repository.UserRepository;
import com.example.wip.repository.UserWorkSpaceRepository;
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

    @Autowired
    UserWorkSpaceRepository uWsRepo;

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
    public List<WorkspaceDTO> obtenerWorkspaceUsuario(long usuario) {
        List<WorkspaceDTO> espaciosTrabajo = new ArrayList<WorkspaceDTO>();
        List<WorkspaceEntity> espaciosEntity = new ArrayList<WorkspaceEntity>(repo.findAll());

        for (WorkspaceEntity w : espaciosEntity){
            if (w.getPropietario().getIdUsuario() == usuario){
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
            nuevoWorkspace = repo.save(nuevoWorkspace);

            UserWorkSpaceEntity nuevoMiembro = new UserWorkSpaceEntity();
            nuevoMiembro.setRol("Propietario");
            nuevoMiembro.setUsuario(usuario.get());
            nuevoMiembro.setWorkspace(nuevoWorkspace);

            nuevoMiembro = uWsRepo.save(nuevoMiembro);

            usuario.get().getParticipacionesWorkspace().add(nuevoMiembro);
            nuevoWorkspace.getMiembros().add(nuevoMiembro);

            uRepo.save(usuario.get());
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

    @Override
    public boolean compartirTableros(long id, String correo) {
        boolean compartido = false;
        UserEntity user = uRepo.findByCorreo(correo);
        Optional<WorkspaceEntity> workspace = repo.findById(id);

        if ( user.getCorreo().equals(correo)  && workspace.isPresent()){
            boolean tienePermisos = false;

            for (UserWorkSpaceEntity miembro : workspace.get().getMiembros()){
                if(miembro.getUsuario().getIdUsuario() == user.getIdUsuario()){
                    tienePermisos = true;
                }
            }

            if(!tienePermisos){
                UserWorkSpaceEntity nuevoMiembro = new UserWorkSpaceEntity();
                nuevoMiembro.setRol("Colaborador");
                nuevoMiembro.setUsuario(user);
                nuevoMiembro.setWorkspace(workspace.get());

                nuevoMiembro = uWsRepo.save(nuevoMiembro);

                user.getParticipacionesWorkspace().add(nuevoMiembro);
                workspace.get().getMiembros().add(nuevoMiembro);

                uRepo.save(user);
                repo.save(workspace.get());

                compartido = true;
            }
        }

        return compartido;
    }

    @Override
    public boolean quitarAcceso(long id, long idUser) {
        boolean revocado = false;
        Optional<UserEntity> user = uRepo.findById(idUser);
        Optional<WorkspaceEntity> workspace = repo.findById(id);

        if ( user.isPresent() && workspace.isPresent()){
            boolean tienePermisos = false;

            for (UserWorkSpaceEntity miembro : workspace.get().getMiembros()){
                if(miembro.getUsuario().getIdUsuario() == user.get().getIdUsuario() && miembro.getRol().equalsIgnoreCase("Colaborador")){
                    tienePermisos = true;
                }
            }

            if(tienePermisos){
                List<UserWorkSpaceEntity> colaborador = uWsRepo.findByUsuarioAndWorkspace(user.get(), workspace.get());
                
                if (!colaborador.isEmpty()){
                    if (colaborador.get(0).getUsuario().getIdUsuario() == idUser && colaborador.get(0).getWorkspace().getIdEspacioTrabajo() == id){
                        uWsRepo.delete(colaborador.get(0));
                    }
                }

                user.get().getParticipacionesWorkspace().remove(colaborador.get(0));
                workspace.get().getMiembros().remove(colaborador.get(0));

                uRepo.save(user.get());
                repo.save(workspace.get());

                revocado = true;
            }
        }

        return revocado;
    }

    @Override
    public List<UserWorkSpaceDTO> mostrarPermisos(long id) {
        Optional<WorkspaceEntity> workspace = repo.findById(id);
        List<UserWorkSpaceDTO> permisos = new ArrayList<UserWorkSpaceDTO>();

        if (!workspace.get().getMiembros().isEmpty()){
            permisos = conversor.entityADto(workspace.get().getMiembros());
        }


        return permisos;
    }


}
