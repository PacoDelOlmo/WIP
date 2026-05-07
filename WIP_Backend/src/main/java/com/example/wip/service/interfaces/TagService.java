package com.example.wip.service.interfaces;

import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TagDTO;

public interface TagService {

    TagDTO anadirEtiqueta(long idTablero, long idLista, long idTarea, long idUsuario, NewElementDTO comentario);

}
