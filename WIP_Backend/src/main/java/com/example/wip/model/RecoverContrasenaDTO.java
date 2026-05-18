package com.example.wip.model;

public class RecoverContrasenaDTO {

    private String correo;
    private String nuevaPass;

    public RecoverContrasenaDTO() {
    }
    
    public RecoverContrasenaDTO(String correo, String nuevaPass) {
        this.correo = correo;
        this.nuevaPass = nuevaPass;
    }

    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getNuevaPass() {
        return nuevaPass;
    }
    public void setNuevaPass(String nuevaPass) {
        this.nuevaPass = nuevaPass;
    }
}
