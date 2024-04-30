package com.example.iatstages.repositories;

import com.example.iatstages.entities.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedBackRepository extends JpaRepository <FeedBack, Long> {
}
