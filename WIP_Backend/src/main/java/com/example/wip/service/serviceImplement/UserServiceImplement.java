package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.TaskboardEntity;
import com.example.wip.entities.UserEntity;
import com.example.wip.entities.WorkspaceEntity;
import com.example.wip.model.ConfirmationObject;
import com.example.wip.model.LoginDTO;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.NewUserDTO;
import com.example.wip.model.TaskboardDTO;
import com.example.wip.model.UserCompleteDTO;
import com.example.wip.model.UserDTO;
import com.example.wip.model.UserMailDTO;
import com.example.wip.model.UserPasswordDTO;
import com.example.wip.model.WorkspaceDTO;
import com.example.wip.repository.TaskboardRepository;
import com.example.wip.repository.UserRepository;
import com.example.wip.repository.WorkspaceRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.UserService;

@Service
@Primary
public class UserServiceImplement implements UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private WorkspaceRepository wRepo;

    @Autowired
    private TaskboardRepository tbRepo;

    private ConversorService conversor = new ConversorService();

    @Override
    public List<UserDTO> obtenerUsuarios() {
        List<UserEntity> usuariosDB = new ArrayList<UserEntity>(repo.findAll());
        List<UserDTO> listaUsuarios = new ArrayList<UserDTO>();

        for (UserEntity u : usuariosDB){
            listaUsuarios.add(conversor.entityADto(u));
        }

        return listaUsuarios;
    }

    public boolean loginCorrecto (String datos, String password){
        boolean loginCorrecto = false;



        return loginCorrecto;
    }

    @Override
    public UserDTO obtenerUsuarioPorNickName(String userName){
        List<UserEntity> usuariosDB = new ArrayList<UserEntity>(repo.buscarPorUsuario(userName));
        List<UserDTO> listaUsuarios = new ArrayList<UserDTO>();

        for (UserEntity u : usuariosDB){
            listaUsuarios.add(conversor.entityADto(u));
        }

        return listaUsuarios.get(0);
    }

    @Override
    public UserDTO obtenerUsuarioPorCorreo(String correo){
        List<UserEntity> usuariosDB = new ArrayList<UserEntity>(repo.buscarPorCorreo(correo));
        List<UserDTO> listaUsuarios = new ArrayList<UserDTO>();

        for (UserEntity u : usuariosDB){
            listaUsuarios.add(conversor.entityADto(u));
        }

        return listaUsuarios.get(0);
    }

    @Override
    public LoginDTO comprobarLogin(String correo, String contrasena){
        List<UserEntity> usuariosDB = new ArrayList<UserEntity>(repo.findAll());
        LoginDTO login = new LoginDTO(correo, false, -1);

        for (UserEntity u : usuariosDB){
            if (u.getCorreo().equals(correo) && u.getContrasena().equals(contrasena)){
                login.setCorrecto(true);
                login.setCorreo(correo);
                login.setIdUsuario(u.getIdUsuario());
            }
        }

        return login;
    }

    @Override
    public UserDTO registrarUsuario(NewUserDTO usuario) {
        boolean registroCorrecto = false;
        List<UserEntity> usuariosDB = new ArrayList<UserEntity>(repo.findAll());
        for (UserEntity u : usuariosDB){

            if (u.getCorreo().equals(usuario.getCorreo()) ||
                u.getNombreUsuario().equals(usuario.getNombreUsuario())){
                    registroCorrecto = false;
            } else {
                registroCorrecto = true;
            }
        }

        if (registroCorrecto){
            repo.save(conversor.DtoAEntity(usuario));
        }else {
            return new UserDTO(-1, null, null, null, registroCorrecto);
        }

        UserDTO nuevoUsuario = conversor.entityADto(repo.findByCorreo(usuario.getCorreo()));

        return nuevoUsuario;
    }

    @Override
    public UserCompleteDTO obtenerUsuarioPorId(long id) {
        Optional<UserEntity> usuarioDB = repo.findById(id);
        UserCompleteDTO usuarioDto = new UserCompleteDTO();

        if (usuarioDB.isPresent()){
            usuarioDto = conversor.userCompleteEntityADto(usuarioDB.get());
        } 

        return usuarioDto;
    }

    @Override
    public ConfirmationObject actualizarCorreo(UserMailDTO nuevoEmail) {
        ConfirmationObject confirmacion = new ConfirmationObject();
        Optional<UserEntity> usuario = repo.findById(nuevoEmail.getId());

        if (usuario.isPresent()){
            usuario.get().setCorreo(nuevoEmail.getMail());
            repo.save(usuario.get());
            confirmacion.setCorrect(true);
            confirmacion.setDescription("Correo acutalizado de forma correcta");
            confirmacion.setIdUser(nuevoEmail.getId());
        } else {
            confirmacion.setCorrect(false);
            confirmacion.setDescription("ERROR: Correo no acutalizado");
            confirmacion.setIdUser(nuevoEmail.getId());
        }

        return confirmacion;
    }

    @Override
    public ConfirmationObject actualizarContrasena(UserPasswordDTO nuevaContrasena) {
                ConfirmationObject confirmacion = new ConfirmationObject();
        Optional<UserEntity> usuario = repo.findById(nuevaContrasena.getId());

        confirmacion.setCorrect(false);
        confirmacion.setDescription("ERROR: Correo no acutalizado");
        confirmacion.setIdUser(nuevaContrasena.getId());

        if (usuario.isPresent()){
            if (usuario.get().getContrasena().equals(nuevaContrasena.getOldPassword())){
                usuario.get().setContrasena(nuevaContrasena.getNewPassword());
                repo.save(usuario.get());
                confirmacion.setCorrect(true);
                confirmacion.setDescription("Correo acutalizado de forma correcta");
                confirmacion.setIdUser(nuevaContrasena.getId());
            }
        }

        return confirmacion;
    }

    @Override
    public WorkspaceDTO nuevoWorkspace(long id, NewElementDTO workspace) {
        WorkspaceEntity nuevoWorkspace = new WorkspaceEntity();
        Optional<UserEntity> usuario = repo.findById(id);

        if (usuario.isPresent()){
            nuevoWorkspace.setPropietario(usuario.get());
            nuevoWorkspace.setNombreEspacioTrabajo(workspace.getTittle());
            wRepo.save(nuevoWorkspace);
        }

        return conversor.entityADto(nuevoWorkspace);
    }

    @Override
    public TaskboardDTO nuevoTablero(long id, long idw, NewElementDTO tablero) {
        TaskboardEntity nuevoTablero = new TaskboardEntity();
        Optional<UserEntity> usuario = repo.findById(id);
        Optional<WorkspaceEntity> workspace = wRepo.findById(idw);

        if (usuario.isPresent() && workspace.isPresent()){
            if (usuario.get().getIdUsuario() == workspace.get().getPropietario().getIdUsuario() && workspace.get().getIdEspacioTrabajo() == idw){
                nuevoTablero.setNombreTablero(tablero.getTittle());
                nuevoTablero.setEspacioTrabajo(workspace.get());
                tbRepo.save(nuevoTablero);
            }
        }

        return conversor.entityADto(nuevoTablero);
    }

    @Override
    public WorkspaceDTO editarWorkspace(long id, long idw, NewElementDTO nuevoNombre) {
        Optional<UserEntity> usuario = repo.findById(id);
        Optional<WorkspaceEntity> workspace = wRepo.findById(idw);

        if (usuario.isPresent() && workspace.isPresent()){
            if (usuario.get().getIdUsuario() == workspace.get().getPropietario().getIdUsuario() && workspace.get().getIdEspacioTrabajo() == idw){
                workspace.get().setNombreEspacioTrabajo(nuevoNombre.getTittle());
                wRepo.save(workspace.get());
            }
        }

        return conversor.entityADto(workspace.get());
    }

    @Override
    public TaskboardDTO editarTablero(long id, long idw, long idt, NewElementDTO nuevoNombre) {
        Optional<UserEntity> usuario = repo.findById(id);
        Optional<WorkspaceEntity> workspace = wRepo.findById(idw);
        Optional<TaskboardEntity> tablero = tbRepo.findById(idt);

        if (usuario.isPresent() && workspace.isPresent() && tablero.isPresent()){
            if (usuario.get().getIdUsuario() == id && workspace.get().getIdEspacioTrabajo() == idw && tablero.get().getIdTablero() == idt){
                tablero.get().setNombreTablero(nuevoNombre.getTittle());
                tbRepo.save(tablero.get());
            }
        }

        return conversor.entityADto(tablero.get());
    }

    
}
