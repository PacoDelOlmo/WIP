package com.example.wip.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wip.entities.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long>{
    
}
