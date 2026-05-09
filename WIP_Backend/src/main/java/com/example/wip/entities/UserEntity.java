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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "APP_USER")
public class UserEntity implements Serializable{
    

        private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    private long idUsuario;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "APELLIDO")
    private String apellido;

    @Column(name = "NOMBRE_USUARIO")
    private String nombreUsuario;

    @Column(name = "CORREO")
    private String correo;

    @Column(name = "CONTRASENA")
    private String contrasena;

    @OneToMany(mappedBy = "propietario")
    private List<WorkspaceEntity> espaciosTrabajo = new ArrayList<WorkspaceEntity>();

    @OneToMany(mappedBy = "autor")
    private List<TaskEntity> tareas = new ArrayList<TaskEntity>();

    @OneToMany(mappedBy = "autor")
    private List<CommentEntity> comentarios = new ArrayList<CommentEntity>();

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public List<WorkspaceEntity> getEspaciosTrabajo() {
        return espaciosTrabajo;
    }

    public void setEspaciosTrabajo(List<WorkspaceEntity> espaciosTrabajo) {
        this.espaciosTrabajo = espaciosTrabajo;
    }

    public List<TaskEntity> getTareas() {
        return tareas;
    }

    public void setTareas(List<TaskEntity> tareas) {
        this.tareas = tareas;
    }

    public List<CommentEntity> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<CommentEntity> comentarios) {
        this.comentarios = comentarios;
    }

    
}
