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
@Table(name = "TASKQUEUE")
public class TaskqueueEntity implements Serializable{
    
        

        private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TASKQUEUE")
    private long idListaTareas;

    @Column(name = "NOMBRE")
    private String nombreLista;

    @Column(name = "FECHA_CREACION")
    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "ID_TASKBOARD")
    private TaskboardEntity tablero;

    @OneToMany(mappedBy = "listaTareas")
    private Set<TaskEntity> tareas = new HashSet<TaskEntity>();

    public long getIdListaTareas() {
        return idListaTareas;
    }

    public void setIdListaTareas(long idListaTareas) {
        this.idListaTareas = idListaTareas;
    }

    public String getNombreLista() {
        return nombreLista;
    }

    public void setNombreLista(String nombreLista) {
        this.nombreLista = nombreLista;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public TaskboardEntity getTablero() {
        return tablero;
    }

    public void setTablero(TaskboardEntity tablero) {
        this.tablero = tablero;
    }

    
}
