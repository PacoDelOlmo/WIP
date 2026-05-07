package com.example.wip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.wip.entities.TagEntity;
import java.util.List;


@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long>{
    
    List<TagEntity> findByEtiqueta(String etiqueta);
}
