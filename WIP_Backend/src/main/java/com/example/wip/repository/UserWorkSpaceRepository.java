package com.example.wip.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.wip.entities.UserWorkSpaceEntity;
import java.util.List;
import com.example.wip.entities.UserEntity;
import com.example.wip.entities.WorkspaceEntity;

;

@Repository
public interface UserWorkSpaceRepository extends JpaRepository<UserWorkSpaceEntity, Long>{

    List<UserWorkSpaceEntity> findByUsuarioAndWorkspace(UserEntity usuario, WorkspaceEntity workspace);
}
