package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class TaskboardDTO {
    
    private String nombreTablero;
    private List<TaskQueueDTO> listaTareas;

    

    public TaskboardDTO() {
        this.setListaTareas(new ArrayList<TaskQueueDTO>());
    }

    public TaskboardDTO(String nombreTablero, List<TaskQueueDTO> listaTareas) {
        this.setNombreTablero(nombreTablero);
        this.setListaTareas(listaTareas);
    }


    public String getNombreTablero() {
        return nombreTablero;
    }
    public void setNombreTablero(String nombreTablero) {
        this.nombreTablero = nombreTablero;
    }
    public List<TaskQueueDTO> getListaTareas() {
        return listaTareas;
    }
    public void setListaTareas(List<TaskQueueDTO> listaTareas) {
        this.listaTareas = listaTareas;
    }

    
}
