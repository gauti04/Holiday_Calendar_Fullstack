package com.holidaycalendar.controller;

import com.holidaycalendar.dto.HolidayDTO;
import com.holidaycalendar.model.Holiday;
import com.holidaycalendar.service.HolidayService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/holidays")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class HolidayController {
    private final HolidayService holidayService;

    @GetMapping
    public ResponseEntity<List<HolidayDTO>> getHolidays(
        @RequestParam String country,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
        @RequestParam(required = false) String holidayType
    ) {
        List<Holiday> holidays = holidayService.getHolidays(country, startDate, endDate, holidayType);
        List<HolidayDTO> dtos = holidays.stream()
            .map(HolidayDTO::fromEntity)
            .sorted((a, b) -> a.getDate().compareTo(b.getDate()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/debug")
    public ResponseEntity<List<HolidayDTO>> getAllHolidays() {
        List<Holiday> holidays = holidayService.getAllHolidaysInDatabase();
        List<HolidayDTO> dtos = holidays.stream()
            .map(HolidayDTO::fromEntity)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
