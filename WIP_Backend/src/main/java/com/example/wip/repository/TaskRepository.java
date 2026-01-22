package com.example.wip.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.wip.entities.TaskEntity;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long>{
    
    @Query("SELECT t FROM TaskEntity t WHERE autor.idUsuario = :idAutor")
    List<TaskEntity> buscarPorAutorId (long idAutor);
}
