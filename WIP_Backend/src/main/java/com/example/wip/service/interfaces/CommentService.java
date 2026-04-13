package com.example.wip.service.interfaces;

import com.example.wip.model.CommentDTO;

public interface CommentService {
    CommentDTO anadirComentario(long idTablero, long idLista, long idTarea, long idUsuario, CommentDTO comentario);
}
