package com.example.wip.model;

public class ElementDTO {

    private long id;
    private String titulo;
    private String tipo;
    
    public ElementDTO() {
    }
    
    public ElementDTO(long id, String titulo, String tipo) {
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

}
