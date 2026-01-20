package com.example.wip.service;

import com.example.wip.entities.UserEntity;
import com.example.wip.model.UserDTO;

public class ConversorService {
    

    /*------------------------------
    ----------- ENTITY a DTO ------
    --------------------------------*/

    public UserDTO prueba(UserEntity entidad){
        UserDTO dto = new UserDTO();

        dto.setNombre(entidad.getNombre());
        dto.setApellido(entidad.getApellido());
        dto.setNickname(entidad.getNombreUsuario());

        return dto;
    }
}
