package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class WorkspaceDTO {
    
    private long id;
    private String nombre;
    private List<TaskboardDTO> tableros;
    private long idPropietario;
    private String color;

    public WorkspaceDTO(){
        this.setTableros(new ArrayList<TaskboardDTO>());
    }

    

    public WorkspaceDTO(long id, String nombre, List<TaskboardDTO> tableros, long idPropietario, String color) {
        this.id = id;
        this.nombre = nombre;
        this.tableros = tableros;
        this.idPropietario = idPropietario;
        this.setColor(color);
    }



    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public List<TaskboardDTO> getTableros() {
        return tableros;
    }
    public void setTableros(List<TaskboardDTO> tableros) {
        this.tableros = tableros;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getIdPropietario() {
        return idPropietario;
    }

    public void setIdPropietario(long idPropietario) {
        this.idPropietario = idPropietario;
    }

    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }


}
