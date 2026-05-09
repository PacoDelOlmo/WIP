package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.NewElementDTO;
import com.example.wip.model.WorkspaceDTO;


public interface WorkspaceService {
    List<WorkspaceDTO> obtenerTodosWorkspace ();
    List<WorkspaceDTO> obtenerWorkspaceUsuario(long user);
    WorkspaceDTO nuevoWorkspace(long id, NewElementDTO workspace);
    WorkspaceDTO editarWorkspace(long id, long idw, NewElementDTO nuevoNombre);
}
