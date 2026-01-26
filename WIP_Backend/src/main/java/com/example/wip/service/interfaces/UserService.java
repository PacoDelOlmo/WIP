package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.LoginDTO;
import com.example.wip.model.NewUserDTO;
import com.example.wip.model.UserDTO;

public interface UserService {

    List<UserDTO> obtenerUsuarios();
    UserDTO obtenerUsuarioPorNickName(String userName);
    UserDTO obtenerUsuarioPorCorreo(String correo);
    LoginDTO comprobarLogin(String correo, String contrasena);
    UserDTO registrarUsuario(NewUserDTO usuario);
}
