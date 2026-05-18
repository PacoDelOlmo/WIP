package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.ConfirmationObject;
import com.example.wip.model.ElementDTO;
import com.example.wip.model.LoginDTO;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.NewUserDTO;
import com.example.wip.model.RecoverContrasenaDTO;
import com.example.wip.model.UserCompleteDTO;
import com.example.wip.model.UserDTO;
import com.example.wip.model.UserMailDTO;
import com.example.wip.model.UserPasswordDTO;
import com.example.wip.model.UserRecoverDTO;


public interface UserService {

    List<UserDTO> obtenerUsuarios();
    UserDTO obtenerUsuarioPorNickName(String userName);
    UserDTO obtenerUsuarioPorCorreo(String correo);
    LoginDTO comprobarLogin(String correo, String contrasena);
    UserDTO registrarUsuario(NewUserDTO usuario);
    UserCompleteDTO obtenerUsuarioPorId(long id);
    ConfirmationObject actualizarCorreo(UserMailDTO nuevoEmail);
    ConfirmationObject actualizarContrasena(UserPasswordDTO nuevaContrasena);
    List<ElementDTO> buscarElementos(long idUser, NewElementDTO busqueda);
    boolean validarDatos(UserRecoverDTO datos);
    boolean reestablecerContrasena(RecoverContrasenaDTO datos);
    ConfirmationObject actualizarNickname(UserMailDTO nuevoNickname);
}
