package com.example.wip.model;

public class NewTaskDTO {

    private String titulo;
    private long creador;

    public NewTaskDTO() {
    }

    public NewTaskDTO(String titulo, long creador) {
        this.setTitulo(titulo);
        this.setCreador(creador);
    }

    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public long getCreador() {
        return creador;
    }
    public void setCreador(long creador) {
        this.creador = creador;
    }

    

}
