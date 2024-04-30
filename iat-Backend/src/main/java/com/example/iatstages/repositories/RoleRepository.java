package com.example.iatstages.repositories;

import java.util.Optional;

import com.example.iatstages.enums.ERole;
import com.example.iatstages.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
