package com.example.wip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.wip.entities.WorkspaceEntity;

@Repository
public interface WorkspaceRepository extends JpaRepository<WorkspaceEntity, Long>{
    
}
