package com.example.wip.entities;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
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

    @ManyToMany(mappedBy = "etiquetas")
    private List<TaskEntity> tareas;

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

    public List<TaskEntity> getTareas() {
        return tareas;
    }

    public void setTareas(List<TaskEntity> tareas) {
        this.tareas = tareas;
    }


    
}
