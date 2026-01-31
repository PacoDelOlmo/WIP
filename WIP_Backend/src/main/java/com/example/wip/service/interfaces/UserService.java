package com.example.wip.service.interfaces;

import java.util.List;

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

public interface UserService {

    List<UserDTO> obtenerUsuarios();
    UserDTO obtenerUsuarioPorNickName(String userName);
    UserDTO obtenerUsuarioPorCorreo(String correo);
    LoginDTO comprobarLogin(String correo, String contrasena);
    UserDTO registrarUsuario(NewUserDTO usuario);
    UserCompleteDTO obtenerUsuarioPorId(long id);
    ConfirmationObject actualizarCorreo(UserMailDTO nuevoEmail);
    ConfirmationObject actualizarContrasena(UserPasswordDTO nuevaContrasena);
    WorkspaceDTO nuevoWorkspace(long id, NewElementDTO workspace);
    TaskboardDTO nuevoTablero(long id, long idw, NewElementDTO tablero);
    WorkspaceDTO editarWorkspace(long id, long idw, NewElementDTO nuevoNombre);
    TaskboardDTO editarTablero(long id, long idw, long idt, NewElementDTO nuevoNombre);
}
