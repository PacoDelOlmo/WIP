package com.example.wip.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.wip.entities.TaskboardEntity;
import com.example.wip.model.TaskboardDTO;
import com.example.wip.repository.TaskboardRepository;
import com.example.wip.service.serviceImplement.TaskboardServiceImplement;

public class TaskBoardServiceTest {
    
    @Mock
    private TaskboardRepository taskBoardRepository;

    @InjectMocks
    private TaskboardServiceImplement taskBoardService; 

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testBuscarTableroPorId() {
        Long idBuscado = 1L;
        TaskboardEntity tableroFalso = new TaskboardEntity();
        tableroFalso.setIdTablero(idBuscado);
        tableroFalso.setNombreTablero("Tablero de Pruebas");


        when(taskBoardRepository.findById(idBuscado)).thenReturn(Optional.of(tableroFalso));

        TaskboardDTO resultado = taskBoardService.obtenerTablero(idBuscado);

        assertNotNull(resultado, "El tablero no debería ser nulo");
        assertEquals("Tablero de Pruebas", resultado.getNombreTablero(), "El nombre del tablero no coincide");
        
        verify(taskBoardRepository, times(1)).findById(idBuscado);
    }
}
