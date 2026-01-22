package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.UserDTO;

public interface UserService {

    List<UserDTO> obtenerUsuarios();
    UserDTO obtenerUsuarioPorNickName(String userName);
    UserDTO obtenerUsuarioPorCorreo(String correo);
    
}
