package com.example.wip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.wip.entities.TaskqueueEntity;

@Repository
public interface TaskqueueRepository extends JpaRepository<TaskqueueEntity, Long>{

    
}
