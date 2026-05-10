package com.example.wip.model;

import java.util.List;

public class OrdenTareasListaDTO {

    private long idLista;
    private List<Long> tareas;

    public OrdenTareasListaDTO(long idLista, List<Long> tareas) {
        this.idLista = idLista;
        this.tareas = tareas;
    }

    public OrdenTareasListaDTO() {
    }

    
    public long getIdLista() {
        return idLista;
    }
    public void setIdLista(long idLista) {
        this.idLista = idLista;
    }
    public List<Long> getTareas() {
        return tareas;
    }
    public void setTareas(List<Long> tareas) {
        this.tareas = tareas;
    } 
}
