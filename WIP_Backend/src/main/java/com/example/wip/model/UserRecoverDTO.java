package com.example.wip.model;

public class UserRecoverDTO {

    private String correo;
    private String usuario;

    public UserRecoverDTO() {
    }
    
    public UserRecoverDTO(String correo, String usuario) {
        this.correo = correo;
        this.usuario = usuario;
    }

    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    
}
