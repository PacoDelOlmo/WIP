package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.UserEntity;
import com.example.wip.model.UserDTO;
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
            listaUsuarios.add(conversor.prueba(u));
        }

        return listaUsuarios;
    }
    
}
