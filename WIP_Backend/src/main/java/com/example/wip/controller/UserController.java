package com.example.wip.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wip.model.ConfirmationObject;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TaskboardDTO;
import com.example.wip.model.UserCompleteDTO;
import com.example.wip.model.UserDTO;
import com.example.wip.model.UserMailDTO;
import com.example.wip.model.WorkspaceDTO;
import com.example.wip.service.interfaces.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;




@RestController
@RequestMapping("/api/users")
public class UserController {
    

    @Autowired
    UserService userService;

    @GetMapping("/")
    public List<UserDTO> obtenerUsuario() {
        return userService.obtenerUsuarios() ;
    }

    @GetMapping("/username/{nickname}")
    public UserDTO recuperarDatosUserName(@PathVariable String nickname){
        return userService.obtenerUsuarioPorNickName(nickname);
    }

    @GetMapping("/correo/{correo}")
    public UserDTO recuperarDatosCorreo(@PathVariable String correo){
        return userService.obtenerUsuarioPorCorreo(correo);
    }
    
    @GetMapping("/user/{id}")
    public UserCompleteDTO recuperarUsuarioPorId(@PathVariable long id){
        return userService.obtenerUsuarioPorId(id);
    }

    @PutMapping("/{id}/nuevo_correo")
    public ConfirmationObject actualizarCorreo(@PathVariable long id, @RequestBody UserMailDTO nuevoEmail) {
        return userService.actualizarCorreo(nuevoEmail);
    }

    @PutMapping("/{id}/nuevo_contrasena")
    public ConfirmationObject actualizarContrasena(@PathVariable long id, @RequestBody UserMailDTO nuevaContrasena) {
        return userService.actualizarContrasena(nuevaContrasena);
    }

    @PostMapping("/{id}/workspace/nuevo")
    public WorkspaceDTO postMethodName(@PathVariable long id, @RequestBody NewElementDTO workspace) {
        return userService.nuevoWorkspace(id, workspace);
    }

    @PostMapping("/{id}/workspace/{idw}/tablero/nuevo")
    public TaskboardDTO postMethodName(@PathVariable long id,@PathVariable long idw, @RequestBody NewElementDTO tablero) {
        return userService.nuevoTablero(id, idw, tablero);
    }

    @PutMapping("/{id}/workspace/{idw}/editar")
    public WorkspaceDTO postMethodName(@PathVariable long id,@PathVariable long idw, @RequestBody NewElementDTO nuevoNombre) {
        return userService.editarWorkspace(id, idw, nuevoNombre);
    }

        @PutMapping("/{id}/workspace/{idw}/tablero/{idt}/editar")
    public WorkspaceDTO postMethodName(@PathVariable long id, @PathVariable long idw, @PathVariable long idt, @RequestBody NewElementDTO nuevoNombre) {
        return userService.editarTablero(id, idw, idt, nuevoNombre);
    }
    
}
