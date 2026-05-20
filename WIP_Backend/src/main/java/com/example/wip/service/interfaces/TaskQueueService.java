package com.example.wip.service.interfaces;

import com.example.wip.model.NewElementDTO;
import com.example.wip.model.TaskQueueDTO;

public interface TaskQueueService {
    
    
    TaskQueueDTO nuevaLista(long id, NewElementDTO lista);
    TaskQueueDTO editarLista(long id, long idl, NewElementDTO lista);
    boolean borrarLista(long id, long idl);
    TaskQueueDTO editarColorLista(long id, long idl, NewElementDTO nuevoColor);
}
