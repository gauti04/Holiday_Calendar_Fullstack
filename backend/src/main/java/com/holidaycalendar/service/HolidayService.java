package com.holidaycalendar.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.holidaycalendar.model.Holiday;
import com.holidaycalendar.repository.HolidayRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class HolidayService {
    private final HolidayRepository holidayRepository;
    private final RestTemplate restTemplate;
    private static final String OPENHOLIDAYS_API_URL = "https://openholidaysapi.org/PublicHolidays";

    public List<Holiday> getHolidays(String countryCode, LocalDate startDate, LocalDate endDate, String holidayType) {
        // Check database first
        List<Holiday> cachedHolidays;
        //holidayType = null;
        if (holidayType != null && !holidayType.isEmpty()) {
            Holiday.HolidayType type = Holiday.HolidayType.valueOf(holidayType.toUpperCase());
            cachedHolidays = holidayRepository.findByCountryCodeAndDateBetweenAndType(
                countryCode.toUpperCase(),
                startDate,
                endDate,
                type
            );
        } else {
            cachedHolidays = holidayRepository.findByCountryCodeAndDateBetween(
                countryCode.toUpperCase(),
                startDate,
                endDate
            );
        }

        // If data is already cached, return it
        if (!cachedHolidays.isEmpty()) {
            return cachedHolidays;
        }

        // Fetch from external API for the required years
        fetchAndCacheHolidaysForYear(countryCode, startDate, endDate);
        /*Year startYear = Year.from(startDate);
        Year endYear = Year.from(endDate);

        for (Year year = startYear; !year.isAfter(endYear); year = year.plusYears(1)) {
            fetchAndCacheHolidaysForYear(countryCode, startDate, endDate);
        }*/

        // Return the holidays
        if (holidayType != null && !holidayType.isEmpty()) {
            Holiday.HolidayType type = Holiday.HolidayType.valueOf(holidayType.toUpperCase());
            return holidayRepository.findByCountryCodeAndDateBetweenAndType(
                countryCode.toUpperCase(),
                startDate,
                endDate,
                type
            );
        } else {
            return holidayRepository.findByCountryCodeAndDateBetween(
                countryCode.toUpperCase(),
                startDate,
                endDate
            );
        }
    }

    private void fetchAndCacheHolidaysForYear(String countryCode, LocalDate startDate, LocalDate endDate) {
        try {
            String url = String.format("%s?countryIsoCode=%s&validFrom=%s&validTo=%s",
                OPENHOLIDAYS_API_URL,
                countryCode.toUpperCase(),
                startDate.toString(),
                endDate.toString());
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);

            if (response != null) {
                // API may return an array of holidays or an object with "holidays" array
                if (response.isArray()) {
                    response.forEach(holidayNode -> {
                        // ...handle each holiday node...
                        if (!holidayNode.isNull()) {
                            // parse date
                            if (!holidayNode.has("startDate") || holidayNode.get("startDate").isNull()) {
                                return;
                            }
                            LocalDate date = LocalDate.parse(holidayNode.get("startDate").asText());

                            // parse name (prefer EN)
                            String name = null;
                            if (holidayNode.has("name") && holidayNode.get("name").isArray()) {
                                for (JsonNode nameNode : holidayNode.get("name")) {
                                    if (nameNode.has("language") && "EN".equalsIgnoreCase(nameNode.get("language").asText())
                                            && nameNode.has("text")) {
                                        name = nameNode.get("text").asText();
                                        break;
                                    }
                                }
                                if (name == null && holidayNode.get("name").size() > 0 && holidayNode.get("name").get(0).has("text")) {
                                    name = holidayNode.get("name").get(0).get("text").asText();
                                }
                            } else if (holidayNode.has("name") && holidayNode.get("name").isTextual()) {
                                name = holidayNode.get("name").asText();
                            }
                            if (name == null) {
                                name = "Unnamed Holiday";
                            }

                            // parse type
                            // 
                            /*String type = holidayNode.has("type") && !holidayNode.get("type").isNull()
                                    ? holidayNode.get("type").asText()
                                    : "REGULAR";*/
                            String type = new Random().nextBoolean() ? "WORK" : "REGULAR";
                            
                            Holiday.HolidayType holidayType = determineHolidayType(type);

                            // persist if not exists
                            if (!holidayRepository.existsByCountryCodeAndDate(countryCode.toUpperCase(), date)) {
                                Holiday holiday = new Holiday();
                                holiday.setName(name);
                                holiday.setDate(date);
                                holiday.setType(holidayType);
                                holiday.setCountryCode(countryCode.toUpperCase());
                                holiday.setCreatedAt(LocalDate.now());
                                holidayRepository.save(holiday);

                                Holiday holidayNew = new Holiday();
                                holidayNew.setName(name + "mocked");
                                holidayNew.setDate(date);
                                holidayNew.setType(holidayType == Holiday.HolidayType.WORK ? Holiday.HolidayType.REGULAR : Holiday.HolidayType.WORK);
                                holidayNew.setCountryCode(countryCode.toUpperCase());
                                holidayNew.setCreatedAt(LocalDate.now());
                                holidayRepository.save(holidayNew);
                            }
                        }
                    });
                } else if (response.has("holidays") && response.get("holidays").isArray()) {
                    response.get("holidays").forEach(holidayNode -> {
                        // ...same handling as above...
                        if (!holidayNode.isNull()) {
                            if (!holidayNode.has("startDate") || holidayNode.get("startDate").isNull()) {
                                return;
                            }
                            LocalDate date = LocalDate.parse(holidayNode.get("startDate").asText());

                            String name = null;
                            if (holidayNode.has("name") && holidayNode.get("name").isArray()) {
                                for (JsonNode nameNode : holidayNode.get("name")) {
                                    if (nameNode.has("language") && "EN".equalsIgnoreCase(nameNode.get("language").asText())
                                            && nameNode.has("text")) {
                                        name = nameNode.get("text").asText();
                                        break;
                                    }
                                }
                                if (name == null && holidayNode.get("name").size() > 0 && holidayNode.get("name").get(0).has("text")) {
                                    name = holidayNode.get("name").get(0).get("text").asText();
                                }
                            } else if (holidayNode.has("name") && holidayNode.get("name").isTextual()) {
                                name = holidayNode.get("name").asText();
                            }
                            if (name == null) {
                                name = "Unnamed Holiday";
                            }

                            String type = holidayNode.has("type") && !holidayNode.get("type").isNull()
                                    ? holidayNode.get("type").asText()
                                    : "REGULAR";
                            Holiday.HolidayType holidayType = determineHolidayType(type);

                            if (!holidayRepository.existsByCountryCodeAndDate(countryCode.toUpperCase(), date)) {
                                Holiday holiday = new Holiday();
                                holiday.setName(name);
                                holiday.setDate(date);
                                holiday.setType(holidayType);
                                holiday.setCountryCode(countryCode.toUpperCase());
                                holiday.setCreatedAt(LocalDate.now());
                                holidayRepository.save(holiday);
                            }
                        }
                    });
                }
            }
        } catch (Exception e) {
            log.error("Error fetching holidays for country {} from {} to {}", countryCode, startDate, endDate, e);
        }
    }

    private Holiday.HolidayType determineHolidayType(String type) {
        // openholidaysapi.org provides type information
        // Common types: "PUBLIC_HOLIDAY", "OBSERVANCE", "BANK_HOLIDAY", "RESTRICTED_HOLIDAY", etc.
        // For simplicity, we'll treat certain types as WORK holidays
        if (type.contains("BANK") || type.contains("WORK") || type.contains("RESTRICTED")) {
            return Holiday.HolidayType.WORK;
        }
        return Holiday.HolidayType.REGULAR;
    }

    public List<Holiday> getAllHolidaysInDatabase() {
        return holidayRepository.findAll();
    }
}
