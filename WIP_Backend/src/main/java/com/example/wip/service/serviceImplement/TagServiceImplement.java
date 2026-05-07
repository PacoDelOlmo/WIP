package com.example.wip.service.serviceImplement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.example.wip.entities.TagEntity;
import com.example.wip.entities.TaskEntity;
import com.example.wip.entities.UserEntity;
import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TagDTO;
import com.example.wip.repository.TagRepository;
import com.example.wip.repository.TaskRepository;
import com.example.wip.repository.UserRepository;
import com.example.wip.service.ConversorService;
import com.example.wip.service.interfaces.TagService;


@Service
@Primary
public class TagServiceImplement implements TagService{

    @Autowired
    TagRepository tagRepo;

    @Autowired
    TaskRepository tRepo;

    @Autowired
    UserRepository uRepo;

    ConversorService conversor = new ConversorService();

    @Override
    public TagDTO anadirEtiqueta(long idTablero, long idLista, long idTarea, long idUsuario, NewElementDTO etiqueta) {

            Optional<TaskEntity> tarea = tRepo.findById(idTarea); 
            Optional<UserEntity> usuario = uRepo.findById(idUsuario); 

            if ((tarea != null && usuario != null) && (etiqueta != null)){
                etiqueta.getTittle().toLowerCase();

                char primeraLetraEtiqueta = etiqueta.getTittle().charAt(0);
                String primeraLetraMaysucula = String.valueOf(primeraLetraEtiqueta).toUpperCase();
                String etiquetaFormateada = primeraLetraMaysucula + etiqueta.getTittle().substring(1);

                List<TagEntity> etiquetasCoinciden = tagRepo.findByEtiqueta(etiquetaFormateada); 
                TagEntity etiquetaAnadida = new TagEntity();

                if (!etiquetasCoinciden.isEmpty()) {
                    etiquetaAnadida = etiquetasCoinciden.getFirst();
                } else {
                    etiquetaAnadida.setEtiqueta(etiquetaFormateada);
                    etiquetaAnadida.setTareas(new ArrayList<TaskEntity>());
                    etiquetaAnadida = tagRepo.save(etiquetaAnadida);
                }

                etiquetaAnadida.getTareas().add(tarea.get());
                tarea.get().getEtiquetas().add(etiquetaAnadida);
                tagRepo.save(etiquetaAnadida);


                return conversor.entityADto(etiquetaAnadida);

            } else {

                TagDTO error = new TagDTO();
                error.setEtiqueta("Error");
                return error;
                
            }
    }
    
}
