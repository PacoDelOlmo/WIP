package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class TaskDTO {

    private String titulo;
    private String descripcion;
    private boolean completada;
    private UserDTO creador;
    private List<TagDTO> etiquetas;
    private List<CommentDTO> comentarios;

    public TaskDTO() {
        this.setEtiquetas(new ArrayList<TagDTO>());
        this.setComentarios(new ArrayList<CommentDTO>());
    }

    public TaskDTO(String titulo, String descripcion, boolean completada, UserDTO creador, List<TagDTO> etiquetas,
            List<CommentDTO> comentarios) {
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
        this.setCreador(creador);
        this.setCompletada(completada);
        this.setEtiquetas(etiquetas);
        this.setComentarios(comentarios);
    }


    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public boolean isCompletada() {
        return completada;
    }
    public void setCompletada(boolean completada) {
        this.completada = completada;
    }
    public UserDTO getCreador() {
        return creador;
    }
    public void setCreador(UserDTO creador) {
        this.creador = creador;
    }
    public List<TagDTO> getEtiquetas() {
        return etiquetas;
    }
    public void setEtiquetas(List<TagDTO> etiquetas) {
        this.etiquetas = etiquetas;
    }
    public List<CommentDTO> getComentarios() {
        return comentarios;
    }
    public void setComentarios(List<CommentDTO> comentarios) {
        this.comentarios = comentarios;
    }

    
}
