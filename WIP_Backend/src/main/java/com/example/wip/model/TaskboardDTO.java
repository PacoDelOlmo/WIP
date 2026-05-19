package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class TaskboardDTO {
    
    private long id;
    private String nombreTablero;
    private List<TaskQueueDTO> listaTareas;
    private String color;

    

    public TaskboardDTO() {
        this.setListaTareas(new ArrayList<TaskQueueDTO>());
    }

    public TaskboardDTO(long id, String nombreTablero, List<TaskQueueDTO> listaTareas, String color) {
        this.setId(id);
        this.setNombreTablero(nombreTablero);
        this.setListaTareas(listaTareas);
        this.setColor(color);
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    
}
