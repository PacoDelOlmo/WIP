package com.example.wip.service.serviceImplement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.CommentEntity;
import com.example.wip.entities.TaskEntity;
import com.example.wip.entities.UserEntity;
import com.example.wip.model.CommentDTO;
import com.example.wip.repository.CommentRepository;
import com.example.wip.repository.TaskRepository;
import com.example.wip.repository.UserRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.CommentService;


@Service
@Primary
public class CommentServiceImplement implements CommentService{

    @Autowired
    CommentRepository cRepo;

    @Autowired
    TaskRepository tRepo;

    @Autowired
    UserRepository uRepo;

    ConversorService conversor = new ConversorService();

    @Override
    public CommentDTO anadirComentario(long idTablero, long idLista, long idTarea, long idUsuario, CommentDTO comentario) {
        //Comprobar si coinciden los ids recuperando la tarea y asignar el comentario a la tarea así como el autor al comentario;
            Optional<TaskEntity> tarea = tRepo.findById(idTarea); 
            Optional<UserEntity> usuario = uRepo.findById(idUsuario); 

            if ((tarea != null && usuario != null) && (comentario.getUser().getId() == idUsuario)){
                CommentEntity nuevoComentario = conversor.dtoAEntity(comentario);
                nuevoComentario.setAutor(usuario.get());
                nuevoComentario.setTarea(tarea.get());

                cRepo.save(nuevoComentario);

                usuario.get().getComentarios().add(nuevoComentario);
                tarea.get().getComentarios().add(nuevoComentario);

                return comentario;

            } else {

                CommentDTO error = new CommentDTO();
                error.setContenido("Error");
                return error;
                
            }
    }
    
}
