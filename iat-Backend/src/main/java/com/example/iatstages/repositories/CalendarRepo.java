package com.example.iatstages.repositories;


import com.example.iatstages.entities.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;



public interface CalendarRepo extends JpaRepository<Calendar, Long> {
}
