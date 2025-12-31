package com.holidaycalendar.repository;

import com.holidaycalendar.model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    List<Holiday> findByCountryCodeAndDateBetween(String countryCode, LocalDate startDate, LocalDate endDate);

    List<Holiday> findByCountryCodeAndDateBetweenAndType(
        String countryCode,
        LocalDate startDate,
        LocalDate endDate,
        Holiday.HolidayType type
    );

    List<Holiday> findByCountryCodeAndDate(String countryCode, LocalDate date);

    @Query("SELECT DISTINCT h.countryCode FROM Holiday h")
    List<String> findDistinctCountryCodes();

    boolean existsByCountryCodeAndDate(String countryCode, LocalDate date);
}
