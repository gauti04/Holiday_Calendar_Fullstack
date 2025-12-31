package com.holidaycalendar;

import com.holidaycalendar.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class HolidayCalendarApplication implements CommandLineRunner {
    private final CountryService countryService;

    public static void main(String[] args) {
        SpringApplication.run(HolidayCalendarApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize default countries
        countryService.initializeDefaultCountries();
    }
}
