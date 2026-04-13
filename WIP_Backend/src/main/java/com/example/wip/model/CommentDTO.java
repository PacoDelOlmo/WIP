package com.example.wip.model;

public class CommentDTO {
    
    private long id;
    private String contenido;
    private UserDTO user;
    private String fecha;

    
    public CommentDTO() {
    }

    
    public CommentDTO(long id, String contenido, UserDTO user, String fecha) {
        this.setId(id);
        this.setContenido(contenido);
        this.setUser(user);
        this.setFecha(fecha);
    }

    public String getContenido() {
        return contenido;
    }
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
    public UserDTO getUser() {
        return user;
    }
    public void setUser(UserDTO user) {
        this.user = user;
    }
    public String getFecha() {
        return fecha;
    }
    public void setFecha(String fecha) {
        this.fecha = fecha;
    }


    public long getId() {
        return id;
    }


    public void setId(long id) {
        this.id = id;
    }

    
}
