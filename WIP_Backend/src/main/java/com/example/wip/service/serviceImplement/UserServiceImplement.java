package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.UserEntity;
import com.example.wip.model.LoginDTO;
import com.example.wip.model.NewUserDTO;
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

    public boolean loginCorrecto (String datos, String password){
        boolean loginCorrecto = false;



        return loginCorrecto;
    }

    @Override
    public UserDTO obtenerUsuarioPorNickName(String userName){
        List<UserEntity> usuariosDB = new ArrayList<UserEntity>(repo.buscarPorUsuario(userName));
        List<UserDTO> listaUsuarios = new ArrayList<UserDTO>();

        for (UserEntity u : usuariosDB){
            listaUsuarios.add(conversor.prueba(u));
        }

        return listaUsuarios.get(0);
    }

    @Override
    public UserDTO obtenerUsuarioPorCorreo(String correo){
        List<UserEntity> usuariosDB = new ArrayList<UserEntity>(repo.buscarPorCorreo(correo));
        List<UserDTO> listaUsuarios = new ArrayList<UserDTO>();

        for (UserEntity u : usuariosDB){
            listaUsuarios.add(conversor.prueba(u));
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
            repo.save(conversor.DtoAEntity(usuario)); // configurar esto
        }else {
            return new UserDTO(-1, null, null, null, registroCorrecto);
        }

        UserDTO nuevoUsuario = conversor.prueba(repo.findByCorreo(usuario.getCorreo())); //confiurar esto

        return nuevoUsuario;
    }

    
}
