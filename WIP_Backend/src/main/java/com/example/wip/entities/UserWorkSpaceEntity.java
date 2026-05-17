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
@Table(name = "USER_WORKSPACE")
public class UserWorkSpaceEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private UserEntity usuario;

    @ManyToOne
    @JoinColumn(name = "ID_WORKSPACE", nullable = false)
    private WorkspaceEntity workspace;

    @Column(name = "ROL", nullable = false)
    private String rol;


    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public UserEntity getUsuario() { return usuario; }
    public void setUsuario(UserEntity usuario) { this.usuario = usuario; }

    public WorkspaceEntity getWorkspace() { return workspace; }
    public void setWorkspace(WorkspaceEntity workspace) { this.workspace = workspace; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
