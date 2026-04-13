package com.example.wip.service.serviceImplement;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.CommentEntity;
import com.example.wip.entities.TagEntity;
import com.example.wip.entities.TaskEntity;
import com.example.wip.entities.TaskboardEntity;
import com.example.wip.entities.TaskqueueEntity;
import com.example.wip.entities.UserEntity;
import com.example.wip.model.CommentDTO;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TagDTO;
import com.example.wip.model.TaskDTO;
import com.example.wip.repository.TaskRepository;
import com.example.wip.repository.TaskboardRepository;
import com.example.wip.repository.TaskqueueRepository;
import com.example.wip.repository.UserRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.TaskService;

@Service
@Primary
public class TaskServiceImplement implements TaskService {

    @Autowired
    TaskboardRepository repo;

    @Autowired
    TaskqueueRepository tqRepo;

    @Autowired
    TaskRepository tRepo;

    @Autowired
    UserRepository uRepo;

    ConversorService conversor = new ConversorService();

    @Override
    public List<TaskDTO> tareasPorUsuario(long idUsuario) {
        List<TaskDTO> tareas = new ArrayList<TaskDTO>();
        List<TaskEntity> allTasks = new ArrayList<TaskEntity>(tRepo.buscarPorAutorId(idUsuario));

        for (TaskEntity t : allTasks){
            tareas.add(conversor.entityADto(t));
        }

        return tareas;
    }
    

    @Override
    public List<TaskDTO> getAll() {
        List<TaskDTO> tareas = new ArrayList<TaskDTO>();
        List<TaskEntity> allTasks = new ArrayList<TaskEntity>(tRepo.findAll());
        for (TaskEntity t : allTasks){
            tareas.add(conversor.entityADto(t));
        }
        return tareas;
    }

    @Override
    public TaskDTO nuevaTarea(long id, long idl, NewElementDTO tarea) {
        Optional<TaskboardEntity> tablero = repo.findById(id);
        Optional<TaskqueueEntity> listaTareas = tqRepo.findById(idl);
        TaskEntity newTarea = new TaskEntity();

        if (tablero.isPresent() && listaTareas.isPresent()){
            if (tablero.get() == listaTareas.get().getTablero()){
                newTarea.setListaTareas(listaTareas.get());
                newTarea.setTitulo(tarea.getTittle());
                tRepo.save(newTarea);
            }

        }

        return conversor.entityADto(newTarea);
    }


    @Override
    public TaskDTO editarNombreTarea(long id, long idl, long idt, NewElementDTO nombreTarea) {
        Optional<TaskboardEntity> tablero = repo.findById(id);
        Optional<TaskqueueEntity> listaTareas = tqRepo.findById(idl);
        Optional<TaskEntity> task = tRepo.findById(idt);

        if (tablero.isPresent() && listaTareas.isPresent() && task.isPresent()){
            if (tablero.get() == listaTareas.get().getTablero() && task.get().getListaTareas() == listaTareas.get()){
                task.get().setTitulo(nombreTarea.getTittle());
            }

        }

        return conversor.entityADto(task.get());
    }


    @Override
    public TaskDTO editarTarea(long id, long idl, long idt, TaskDTO tarea) {
        Optional<TaskboardEntity> tablero = repo.findById(id);
        Optional<TaskqueueEntity> listaTareas = tqRepo.findById(idl);
        Optional<TaskEntity> task = tRepo.findById(idt);

        if (tablero.isPresent() && listaTareas.isPresent() && task.isPresent()){
            if (tablero.get() == listaTareas.get().getTablero() && task.get().getListaTareas() == listaTareas.get()){
                task.get().setDescripcion(tarea.getDescripcion());
                task.get().setCompletada(tarea.isCompletada());
                task.get().setEtiquetas(convertirEtiquetas(tarea.getEtiquetas(), idt)); 
                task.get().setTitulo(tarea.getTitulo());
            }

        }

        return conversor.entityADto(task.get());
    }


    @Override
    public TaskDTO moverTarea(long id, long idl, long idt) {
        Optional<TaskboardEntity> tablero = repo.findById(id);
        Optional<TaskqueueEntity> listaTareas = tqRepo.findById(idl);
        Optional<TaskEntity> task = tRepo.findById(idt);

        if (tablero.isPresent() && listaTareas.isPresent() && task.isPresent()){
            if (tablero.get() == listaTareas.get().getTablero() && task.get().getListaTareas() != listaTareas.get()){
                task.get().setListaTareas(listaTareas.get());
                listaTareas.get().getTareas().add(task.get());
            }

        }

        return conversor.entityADto(task.get());
    }


    @Override
    public TaskDTO actualizarEstadoTarea(long id, long idl, long idt) {
        Optional<TaskboardEntity> tablero = repo.findById(id);
        Optional<TaskqueueEntity> listaTareas = tqRepo.findById(idl);
        Optional<TaskEntity> task = tRepo.findById(idt);

        if (tablero.isPresent() && listaTareas.isPresent() && task.isPresent()){
            if (tablero.get() == listaTareas.get().getTablero() && task.get().getListaTareas() == listaTareas.get()){
                task.get().setCompletada(!task.get().isCompletada());

            }

        }

        return conversor.entityADto(task.get());
    }


    @Override
    public TaskDTO borrarTarea(long id, long idl, long idt) {
        Optional<TaskboardEntity> tablero = repo.findById(id);
        Optional<TaskqueueEntity> listaTareas = tqRepo.findById(idl);
        Optional<TaskEntity> task = tRepo.findById(idt);

        if (tablero.isPresent() && listaTareas.isPresent() && task.isPresent()){
            if (tablero.get() == listaTareas.get().getTablero() && task.get().getListaTareas() == listaTareas.get()){
                listaTareas.get().getTareas().remove(task.get());
                tRepo.delete(task.get());
            }

        }

        return conversor.entityADto(task.get());
    }
    


    private Set<CommentEntity> convertirComentarios (List<CommentDTO> comentarios, long idTarea){
        Set<CommentEntity> comentariosEntidad = new HashSet<CommentEntity>();
        
        for (CommentDTO c : comentarios){
            CommentEntity comentario = new CommentEntity();
            comentario.setContenido(c.getContenido());
            comentario.setFecha(LocalDateTime.parse(c.getFecha()));
            comentario.setIdComentario(c.getId());
            Optional<TaskEntity> tarea = tRepo.findById(idTarea);
            Optional<UserEntity> autor = uRepo.findById(c.getUser().getId());
            
            if (tarea.isPresent() && autor.isPresent()) {
                comentario.setAutor(autor.get());
                comentario.setTarea(tarea.get());
            }
            comentariosEntidad.add(comentario);
        }

        return comentariosEntidad;
    }

    private Set<TagEntity> convertirEtiquetas (List<TagDTO> etiquetas, long idTarea){
        Set<TagEntity> etiquetasEntidad = new HashSet<TagEntity>();
        Optional<TaskEntity> tarea = tRepo.findById(idTarea);
        for (TagDTO e : etiquetas){
            TagEntity etiqueta = conversor.dtoAEntity(e);
            etiqueta.setTarea(tarea.get());
            etiquetasEntidad.add(etiqueta);
        }

        return etiquetasEntidad;
    }
}
