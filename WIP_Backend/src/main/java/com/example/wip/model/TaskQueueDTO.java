package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class TaskQueueDTO {
    
    private long id;
    private String titulo;
    private List<TaskDTO> tareas;
    private String color;

    public TaskQueueDTO() {
        this.setTareas(new ArrayList<TaskDTO>());
    }

    public TaskQueueDTO(String titulo, List<TaskDTO> tareas, long id, String color) {
        this.setTitulo(titulo);
        this.setTareas(tareas);
        this.setId(id);
        this.setColor(color);
    }


    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public List<TaskDTO> getTareas() {
        return tareas;
    }
    public void setTareas(List<TaskDTO> tareas) {
        this.tareas = tareas;
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
