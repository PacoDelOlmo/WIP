package com.example.wip.model;

public class UserWorkSpaceDTO {
    
    private UserDTO usuario;
    private String rol;

    

    public UserWorkSpaceDTO() {
    }

    public UserWorkSpaceDTO(UserDTO usuario, String rol) {
        this.usuario = usuario;
        this.rol = rol;
    }

    public UserDTO getUsuario() {
        return usuario;
    }
    public void setUsuario(UserDTO usuario) {
        this.usuario = usuario;
    }
    public String getRol() {
        return rol;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }

}
