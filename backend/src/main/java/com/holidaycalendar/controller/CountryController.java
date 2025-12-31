package com.holidaycalendar.controller;

import com.holidaycalendar.dto.CountryDTO;
import com.holidaycalendar.model.Country;
import com.holidaycalendar.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CountryController {
    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<List<CountryDTO>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        List<CountryDTO> dtos = countries.stream()
            .map(CountryDTO::fromEntity)
            .sorted((a, b) -> a.getName().compareTo(b.getName()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
