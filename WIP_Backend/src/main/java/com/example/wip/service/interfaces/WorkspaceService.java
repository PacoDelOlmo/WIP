package com.example.wip.service.interfaces;

import java.util.List;

import com.example.wip.model.UserDTO;
import com.example.wip.model.WorkspaceDTO;


public interface WorkspaceService {
    List<WorkspaceDTO> obtenerTodosWorkspace ();
    List<WorkspaceDTO> obtenerWorkspaceUsuario(String user);
}
