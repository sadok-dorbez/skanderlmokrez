package com.example.iatstages.services.CalendarService;

import com.example.iatstages.entities.Calendar;
import com.example.iatstages.enums.Status;
import com.example.iatstages.repositories.CalendarRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarService implements CalendarInterface {
    private final CalendarRepo calendarRepo;

    @Autowired
    public CalendarService(CalendarRepo calendarRepo) {
        this.calendarRepo = calendarRepo;
    }

    @Override
    public Calendar save(Calendar calendar) {
        return calendarRepo.save(calendar);
    }
    public Calendar changeStatus(Long id, Status newStatus) {
        Calendar calendar = calendarRepo.findById(id).orElseThrow(() -> new RuntimeException("Calendar not found"));
        calendar.setStatus(newStatus);
        return calendarRepo.save(calendar);
    }

    public List<Calendar> getAllCalendars() {
        return calendarRepo.findAll();
    }

}


