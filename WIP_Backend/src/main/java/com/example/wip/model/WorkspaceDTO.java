package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class WorkspaceDTO {
    
    private long id;
    private String nombre;
    private List<TaskboardDTO> tableros;

    public WorkspaceDTO(){
        this.setTableros(new ArrayList<TaskboardDTO>());
    }

    

    public WorkspaceDTO(long id, String nombre, List<TaskboardDTO> tableros) {
        this.id = id;
        this.nombre = nombre;
        this.tableros = tableros;
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
    

    
}
