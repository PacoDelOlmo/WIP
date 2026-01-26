package com.example.wip.service;

import com.example.wip.entities.CommentEntity;
import com.example.wip.entities.TagEntity;
import com.example.wip.entities.TaskEntity;
import com.example.wip.entities.TaskboardEntity;
import com.example.wip.entities.TaskqueueEntity;
import com.example.wip.entities.UserEntity;
import com.example.wip.entities.WorkspaceEntity;
import com.example.wip.model.CommentDTO;
import com.example.wip.model.NewUserDTO;
import com.example.wip.model.TagDTO;
import com.example.wip.model.TaskDTO;
import com.example.wip.model.TaskQueueDTO;
import com.example.wip.model.TaskboardDTO;
import com.example.wip.model.UserDTO;
import com.example.wip.model.WorkspaceDTO;

public class ConversorService {
    

    /*------------------------------
    ----------- ENTITY a DTO ------
    --------------------------------*/

    public UserDTO entityADto(UserEntity entidad){
        UserDTO dto = new UserDTO();

        dto.setId(entidad.getIdUsuario());
        dto.setNombre(entidad.getNombre());
        dto.setApellido(entidad.getApellido());
        dto.setNickname(entidad.getNombreUsuario());
        dto.setCorrect(true);

        return dto;
    }

    public WorkspaceDTO entityADto (WorkspaceEntity entidad){
        WorkspaceDTO dto = new WorkspaceDTO();
        
        dto.setNombre(entidad.getNombreEspacioTrabajo());
        for (TaskboardEntity tb : entidad.getTableros()){
            dto.getTableros().add(entityADto(tb));
        }

        return dto;
    }

    public TaskboardDTO entityADto (TaskboardEntity entidad){
        TaskboardDTO dto = new TaskboardDTO();

        dto.setNombreTablero(entidad.getNombreTablero());
        
        for(TaskqueueEntity t : entidad.getListasTareas()){
            dto.getListaTareas().add(entityADto(t));
        }

        return dto;
    }

    public TaskQueueDTO entityADto (TaskqueueEntity entidad){
        TaskQueueDTO dto = new TaskQueueDTO();
        
        dto.setTitulo(entidad.getNombreLista());
        
        for(TaskEntity t : entidad.getTareas()){
            dto.getTareas().add(entityADto(t));
        }

        return dto;
    }

    public TaskDTO entityADto (TaskEntity entidad){
        TaskDTO dto = new TaskDTO();

        dto.setTitulo(entidad.getTitulo());
        dto.setDescripcion(entidad.getDescripcion());
        dto.setCreador(entityADto(entidad.getAutor()));
        dto.setCompletada(entidad.isCompletada());
        
        for (CommentEntity c : entidad.getComentarios()){
            dto.getComentarios().add(entityADto(c));
        }

        for (TagEntity t : entidad.getEtiquetas()){
            dto.getEtiquetas().add(entityADto(t));
        }

        return dto;
    }


    public CommentDTO entityADto(CommentEntity entidad){    
        CommentDTO dto = new CommentDTO();

        dto.setContenido(entidad.getContenido());
        dto.setFecha(entidad.getFecha().toString());
        dto.setUser(entityADto(entidad.getAutor()));

        return dto;
    }

    public TagDTO entityADto (TagEntity entidad){
        return new TagDTO(entidad.getEtiqueta());
    }


    /*------------------------------
    ----------- DTO a ENTITY ------
    --------------------------------*/

    public UserEntity DtoAEntity (NewUserDTO nuevoUsuario){
        UserEntity entidad = new UserEntity();

        entidad.setNombre(nuevoUsuario.getNombre());
        entidad.setApellido(nuevoUsuario.getApellido());
        entidad.setNombreUsuario(nuevoUsuario.getNombreUsuario());
        entidad.setCorreo(nuevoUsuario.getCorreo());
        entidad.setContrasena(nuevoUsuario.getContrasena());


        return entidad;
    }

}
