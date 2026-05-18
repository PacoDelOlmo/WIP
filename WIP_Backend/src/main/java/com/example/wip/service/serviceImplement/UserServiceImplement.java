package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.UserEntity;
import com.example.wip.model.ConfirmationObject;
import com.example.wip.model.ElementDTO;
import com.example.wip.model.LoginDTO;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.NewUserDTO;
import com.example.wip.model.RecoverContrasenaDTO;
import com.example.wip.model.TaskDTO;
import com.example.wip.model.TaskQueueDTO;
import com.example.wip.model.TaskboardDTO;
import com.example.wip.model.UserCompleteDTO;
import com.example.wip.model.UserDTO;
import com.example.wip.model.UserMailDTO;
import com.example.wip.model.UserPasswordDTO;
import com.example.wip.model.UserRecoverDTO;
import com.example.wip.model.WorkspaceDTO;
import com.example.wip.repository.UserRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.UserService;

@Service
@Primary
public class UserServiceImplement implements UserService {

    @Autowired
    private UserRepository repo;

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
    public List<ElementDTO> buscarElementos(long idUser, NewElementDTO busqueda) {
        List<ElementDTO> elementosCoincidientes = new ArrayList<ElementDTO>();
        Optional<UserEntity> usuarioDB = repo.findById(idUser);
        UserCompleteDTO usuarioDto = new UserCompleteDTO();
        String contenidoBusqueda = busqueda.getTittle().toLowerCase();

        if (usuarioDB.isPresent()){
            usuarioDto = conversor.userCompleteEntityADto(usuarioDB.get());

            for (WorkspaceDTO ws : usuarioDto.getWorkspace()){

                if (ws.getNombre().toLowerCase().contains(contenidoBusqueda)){
                    elementosCoincidientes.add(new ElementDTO(ws.getId(), ws.getNombre(), "WorkSpace"));
                }

                for (TaskboardDTO tablero : ws.getTableros()){
                    if (tablero.getNombreTablero().toLowerCase().contains(contenidoBusqueda)){
                        elementosCoincidientes.add(new ElementDTO(tablero.getId(), tablero.getNombreTablero(), "TaskBoard"));
                    }

                    for (TaskQueueDTO lista : tablero.getListaTareas()){
                        if (lista.getTitulo().toLowerCase().contains(contenidoBusqueda)){
                            elementosCoincidientes.add(new ElementDTO(tablero.getId(), lista.getTitulo(), "TaskQueue"));
                        }

                        for(TaskDTO tarea : lista.getTareas()){
                            if (tarea.getTitulo().toLowerCase().contains(contenidoBusqueda)){
                                elementosCoincidientes.add(new ElementDTO(tablero.getId(), tarea.getTitulo(), "Task"));
                            }
                        }
                    }
                }
            }
        } 

        return elementosCoincidientes;
    }

    @Override
    public boolean validarDatos(UserRecoverDTO datos) {
        boolean datosCorrectos = false;
        UserEntity usuario = repo.findByCorreo(datos.getCorreo()); 

        if (usuario != null){
            if (usuario.getCorreo().equalsIgnoreCase(datos.getCorreo()) 
                && usuario.getNombreUsuario().equalsIgnoreCase(datos.getUsuario())){
                    datosCorrectos = true;
            }
        }

        return datosCorrectos; 
    }

    @Override
    public boolean reestablecerContrasena(RecoverContrasenaDTO datos) {
        boolean datosCorrectos = false;
        UserEntity usuario = repo.findByCorreo(datos.getCorreo()); 

        if (usuario != null){
            if (usuario.getCorreo().equalsIgnoreCase(datos.getCorreo())){
                usuario.setContrasena(datos.getNuevaPass());
                repo.save(usuario);
                datosCorrectos = true;
            }
        }

        return datosCorrectos; 
    }

    @Override
    public ConfirmationObject actualizarNickname(UserMailDTO nuevoNickname) {
        ConfirmationObject confirmacion = new ConfirmationObject();
        Optional<UserEntity> usuario = repo.findById(nuevoNickname.getId());

        if (usuario.isPresent()){
            usuario.get().setNombreUsuario(nuevoNickname.getMail());
            repo.save(usuario.get());
            confirmacion.setCorrect(true);
            confirmacion.setDescription("Correo acutalizado de forma correcta");
            confirmacion.setIdUser(nuevoNickname.getId());
        } else {
            confirmacion.setCorrect(false);
            confirmacion.setDescription("ERROR: Correo no acutalizado");
            confirmacion.setIdUser(nuevoNickname.getId());
        }

        return confirmacion;
    }

}
