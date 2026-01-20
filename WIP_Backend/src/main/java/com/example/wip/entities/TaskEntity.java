package com.example.wip.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    @ManyToOne
    @JoinColumn(name = "ID_TASKQUEUE")
    private TaskqueueEntity listaTareas;

    @ManyToOne
    @JoinColumn(name = "AUTOR")
    private UserEntity autor;

    @OneToMany(mappedBy = "tarea")
    private Set<TagEntity> etiquetas = new HashSet<TagEntity>();

    @OneToMany(mappedBy = "tarea")
    private Set<CommentEntity> comentarios = new HashSet<CommentEntity>();

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

    public Set<TagEntity> getEtiquetas() {
        return etiquetas;
    }

    public void setEtiquetas(Set<TagEntity> etiquetas) {
        this.etiquetas = etiquetas;
    }

    public Set<CommentEntity> getComentarios() {
        return comentarios;
    }

    public void setComentarios(Set<CommentEntity> comentarios) {
        this.comentarios = comentarios;
    }

    
}
