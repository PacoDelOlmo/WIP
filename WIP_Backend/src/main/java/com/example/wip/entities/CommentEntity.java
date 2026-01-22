package com.example.wip.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "COMMENT")
public class CommentEntity implements Serializable{
    
        private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_COMMENT")
    private long idComentario;

    @Column(name ="CONTENIDO")
    private String contenido;

    @Column(name = "FECHA")
    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "ID_TASK")
    private TaskEntity tarea;

    @ManyToOne
    @JoinColumn(name = "AUTOR")
    private UserEntity autor;


    public long getIdComentario() {
        return idComentario;
    }

    public void setIdComentario(long idComentario) {
        this.idComentario = idComentario;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public TaskEntity getTarea() {
        return tarea;
    }

    public void setTarea(TaskEntity tarea) {
        this.tarea = tarea;
    }

    public UserEntity getAutor() {
        return autor;
    }

    public void setAutor(UserEntity autor) {
        this.autor = autor;
    }

    
}
