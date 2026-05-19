package com.example.wip.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
@Table(name = "WORKSPACE")
public class WorkspaceEntity implements Serializable{

        private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_WORKSPACE")
    private long idEspacioTrabajo;

    @Column(name = "NOMBRE")
    private String nombreEspacioTrabajo;

    @Column(name = "color", length = 7)
    private String color;

    @ManyToOne
    @JoinColumn(name = "PROPIETARIO")
    private UserEntity propietario;

    @OneToMany(mappedBy = "espacioTrabajo")
    private List<TaskboardEntity> tableros = new ArrayList<TaskboardEntity>();

    @OneToMany(mappedBy = "workspace")
    private List<UserWorkSpaceEntity> miembros = new ArrayList<UserWorkSpaceEntity>();

    public long getIdEspacioTrabajo() {
        return idEspacioTrabajo;
    }

    public void setIdEspacioTrabajo(long idEspacioTrabajo) {
        this.idEspacioTrabajo = idEspacioTrabajo;
    }

    public String getNombreEspacioTrabajo() {
        return nombreEspacioTrabajo;
    }

    public void setNombreEspacioTrabajo(String nombreEspacioTrabajo) {
        this.nombreEspacioTrabajo = nombreEspacioTrabajo;
    }

    public UserEntity getPropietario() {
        return propietario;
    }

    public void setPropietario(UserEntity propietario) {
        this.propietario = propietario;
    }

    public List<TaskboardEntity> getTableros() {
        return tableros;
    }

    public void setTableros(List<TaskboardEntity> tableros) {
        this.tableros = tableros;
    }

    public List<UserWorkSpaceEntity> getMiembros() {
        return miembros;
    }

    public void setMiembros(List<UserWorkSpaceEntity> miembros) {
        this.miembros = miembros;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    
}
