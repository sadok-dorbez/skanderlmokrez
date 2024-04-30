package com.example.iatstages.controllers;



import com.example.iatstages.entities.Calendar;
import com.example.iatstages.entities.User;
import com.example.iatstages.enums.Status;
import com.example.iatstages.services.CalendarService.CalendarService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
public class CalendarController {
    private  CalendarService calendarService;
    @PostMapping("/api/calendar")
    public ResponseEntity<?> handleDateClick(@RequestBody Calendar calendar, @RequestParam Long userId) {

        User user = new User();
        user.setId(userId);
        calendar.setUser(user);

        Calendar savedCalendar = calendarService.save(calendar);
        return ResponseEntity.ok(savedCalendar);
    }

    @GetMapping("/api/calendars")
    public ResponseEntity<List<Calendar>> getAllCalendars() {
        List<Calendar> calendars = calendarService.getAllCalendars();
        return ResponseEntity.ok(calendars);
    }

    @PutMapping("/api/calendars/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable Long id, @RequestParam Status newStatus) {
        Calendar calendar = calendarService.changeStatus(id, newStatus);
        return ResponseEntity.ok(calendar);
    }
}
