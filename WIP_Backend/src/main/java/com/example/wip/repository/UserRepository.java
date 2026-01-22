package com.example.wip.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.wip.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    

    @Query("SELECT u FROM UserEntity u WHERE u.nombreUsuario = :usuario")
    List<UserEntity> buscarPorUsuario(@Param("usuario") String nombreUsuario);

    List<UserEntity> findByNombreUsuario(String nombreUsuario);
    List<UserEntity> findByCorreo(String correo);

    @Query("SELECT u FROM UserEntity u WHERE u.correo = :correo")
    List<UserEntity> buscarPorCorreo(@Param("correo") String correoUsuario);
}
