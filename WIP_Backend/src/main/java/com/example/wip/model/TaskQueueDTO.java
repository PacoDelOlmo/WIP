package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class TaskQueueDTO {
    
    private String titulo;
    private List<TaskDTO> tareas;

    public TaskQueueDTO() {
        this.setTareas(new ArrayList<TaskDTO>());
    }

    public TaskQueueDTO(String titulo, List<TaskDTO> tareas) {
        this.setTitulo(titulo);
        this.setTareas(tareas);
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

    
}
