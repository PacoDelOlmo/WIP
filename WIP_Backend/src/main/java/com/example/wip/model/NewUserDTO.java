package com.example.wip.model;

public class NewUserDTO {
    
    private String nombre;
    private String apellido;
    private String nombreUsuario;
    private String correo;
    private String contrasena;

    
    public NewUserDTO() {
    }

    public NewUserDTO(String nombre, String apellido, String nombreUsuario, String correo, String contrasena) {
        this.setNombre(nombre);
        this.setApellido(apellido);
        this.setNombreUsuario(nombreUsuario);
        this.setCorreo(correo);
        this.setContrasena(contrasena);
    }


    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getNombreUsuario() {
        return nombreUsuario;
    }
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    public String getApellido() {
        return apellido;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    
}
