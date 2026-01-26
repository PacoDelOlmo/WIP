package com.example.wip.model;

public class LoginDTO {

    private String correo;
    private boolean correcto;
    private long idUsuario;
    

    public LoginDTO() {
    }

    public LoginDTO(String correo, boolean correcto, long idUsuario) {
        this.setCorreo(correo);
        this.setCorrecto(correcto);
        this.setIdUsuario(idUsuario);
    }


    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public boolean isCorrecto() {
        return correcto;
    }

    public void setCorrecto(boolean correcto) {
        this.correcto = correcto;
    }

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
        this.idUsuario = idUsuario;
    }

    
    
}
