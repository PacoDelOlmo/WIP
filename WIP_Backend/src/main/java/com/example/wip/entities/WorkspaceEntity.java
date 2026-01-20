package com.example.wip.entities;

import java.io.Serializable;
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
@Table(name = "WORKSPACE")
public class WorkspaceEntity implements Serializable{

        private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_WORKSPACE")
    private long idEspacioTrabajo;

    @Column(name = "NOMBRE")
    private String nombreEspacioTrabajo;

    @ManyToOne
    @JoinColumn(name = "PROPIETARIO")
    private UserEntity propietario;

    @OneToMany(mappedBy = "espacioTrabajo")
    private Set<TaskboardEntity> tableros = new HashSet<TaskboardEntity>();

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

    public Set<TaskboardEntity> getTableros() {
        return tableros;
    }

    public void setTableros(Set<TaskboardEntity> tableros) {
        this.tableros = tableros;
    }

    
}
