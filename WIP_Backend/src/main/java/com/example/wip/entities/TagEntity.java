package com.example.wip.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TAG")
public class TagEntity implements Serializable {

        private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TAG")
    private long idEtiqueta;

    @Column(name = "ETIQUETA")
    private String etiqueta;

    @ManyToOne
    @JoinColumn(name = "ID_TASK")
    private TaskEntity tarea;

    public long getIdEtiqueta() {
        return idEtiqueta;
    }

    public void setIdEtiqueta(long idEtiqueta) {
        this.idEtiqueta = idEtiqueta;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public TaskEntity getTarea() {
        return tarea;
    }

    public void setTarea(TaskEntity tarea) {
        this.tarea = tarea;
    }


    
}
