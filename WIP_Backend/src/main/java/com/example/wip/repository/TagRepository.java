package com.example.wip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.wip.entities.TagEntity;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long>{
    
}
