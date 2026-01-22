package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class WorkspaceDTO {
    
    private String nombre;
    private List<TaskboardDTO> tableros;

    public WorkspaceDTO(){
        this.setTableros(new ArrayList<TaskboardDTO>());
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

    
}
