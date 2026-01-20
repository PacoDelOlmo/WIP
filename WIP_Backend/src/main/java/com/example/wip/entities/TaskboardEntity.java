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
@Table(name = "TASKBOARD")
public class TaskboardEntity implements Serializable{
    

        private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TASKBOARD")
    private long idTablero;

    @Column(name = "NOMBRE")
    private String nombreTablero;

    @Column(name = "FECHA_CREACION")
    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "ID_WORKSPACE")
    private WorkspaceEntity espacioTrabajo;

    @OneToMany(mappedBy = "tablero")
    private Set<TaskqueueEntity> listasTareas = new HashSet<TaskqueueEntity>();

    public long getIdTablero() {
        return idTablero;
    }

    public void setIdTablero(long idTablero) {
        this.idTablero = idTablero;
    }

    public String getNombreTablero() {
        return nombreTablero;
    }

    public void setNombreTablero(String nombreTablero) {
        this.nombreTablero = nombreTablero;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Set<TaskqueueEntity> getListasTareas() {
        return listasTareas;
    }

    public void setListasTareas(Set<TaskqueueEntity> listasTareas) {
        this.listasTareas = listasTareas;
    }

    public WorkspaceEntity getEspacioTrabajo() {
        return espacioTrabajo;
    }

    public void setEspacioTrabajo(WorkspaceEntity espacioTrabajo) {
        this.espacioTrabajo = espacioTrabajo;
    }

    
}
