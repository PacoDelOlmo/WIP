package com.example.wip.service.serviceImplement;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.CommentEntity;
import com.example.wip.entities.TaskEntity;
import com.example.wip.entities.UserEntity;
import com.example.wip.model.CommentDTO;
import com.example.wip.model.NewElementDTO;
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
    public CommentDTO anadirComentario(long idTablero, long idLista, long idTarea, long idUsuario, NewElementDTO comentario) {
            Optional<TaskEntity> tarea = tRepo.findById(idTarea); 
            Optional<UserEntity> usuario = uRepo.findById(idUsuario); 

            if ((tarea != null && usuario != null) && (comentario != null)){
                CommentEntity nuevoComentario = new CommentEntity();
                nuevoComentario.setContenido(comentario.getTittle());
                nuevoComentario.setFecha(LocalDateTime.now());
                nuevoComentario.setAutor(usuario.get());
                nuevoComentario.setTarea(tarea.get());

                cRepo.save(nuevoComentario);

                usuario.get().getComentarios().add(nuevoComentario);
                tarea.get().getComentarios().add(nuevoComentario);

                return conversor.entityADto(nuevoComentario);

            } else {

                CommentDTO error = new CommentDTO();
                error.setContenido("Error");
                return error;
                
            }
    }
    
}
