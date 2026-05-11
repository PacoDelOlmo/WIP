package com.example.wip.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "TASK")
public class TaskEntity implements Serializable{
    

        private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TASK")
    private long idTarea;

    @Column(name = "TITULO")
    private String titulo;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    @Column(name = "COMPLETADA")
    private boolean completada;

    @Column(name = "FECHA_CREACION")
    private LocalDateTime fechaCreacion;

    @Column(name = "POSICION")
    private long posicion; 

    @ManyToOne
    @JoinColumn(name = "ID_TASKQUEUE")
    private TaskqueueEntity listaTareas;

    @ManyToOne
    @JoinColumn(name = "AUTOR")
    private UserEntity autor;

    @ManyToMany
    @JoinTable(
        name = "TASKTAG",
        joinColumns = @JoinColumn(name = "ID_TASK"),
        inverseJoinColumns = @JoinColumn(name = "ID_TAG")
    )
    private List<TagEntity> etiquetas = new ArrayList<TagEntity>();

    @OneToMany(mappedBy = "tarea", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentEntity> comentarios = new ArrayList<CommentEntity>();

    public long getIdTarea() {
        return idTarea;
    }

    public void setIdTarea(long idTarea) {
        this.idTarea = idTarea;
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

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public long getPosicion() {
        return posicion;
    }

    public void setPosicion(long posicion) {
        this.posicion = posicion;
    }

    public TaskqueueEntity getListaTareas() {
        return listaTareas;
    }

    public void setListaTareas(TaskqueueEntity listaTareas) {
        this.listaTareas = listaTareas;
    }

    public UserEntity getAutor() {
        return autor;
    }

    public void setAutor(UserEntity autor) {
        this.autor = autor;
    }

    public List<TagEntity> getEtiquetas() {
        return etiquetas;
    }

    public void setEtiquetas(List<TagEntity> etiquetas) {
        this.etiquetas = etiquetas;
    }

    public List<CommentEntity> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<CommentEntity> comentarios) {
        this.comentarios = comentarios;
    }

    
}
