package com.example.wip.service.interfaces;

import com.example.wip.model.CommentDTO;
import com.example.wip.model.NewElementDTO;

public interface CommentService {
    CommentDTO anadirComentario(long idTablero, long idLista, long idTarea, long idUsuario, NewElementDTO comentario);
}
