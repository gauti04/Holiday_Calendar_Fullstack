package com.holidaycalendar.service;

import com.holidaycalendar.model.Country;
import com.holidaycalendar.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CountryService {
    private final CountryRepository countryRepository;

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Optional<Country> getCountryByCode(String code) {
        return countryRepository.findById(code);
    }

    public Country saveCountry(Country country) {
        return countryRepository.save(country);
    }

    public void initializeDefaultCountries() {
        if (countryRepository.count() == 0) {
            countryRepository.save(new Country("AT", "Austria"));
            countryRepository.save(new Country("BE", "Belgium"));
            countryRepository.save(new Country("DE", "Germany"));
            countryRepository.save(new Country("BG", "Bulgaria"));
            countryRepository.save(new Country("BR", "Brazil"));
        }
    }
}
