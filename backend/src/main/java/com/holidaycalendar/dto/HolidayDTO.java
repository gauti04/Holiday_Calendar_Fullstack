package com.holidaycalendar.dto;

import com.holidaycalendar.model.Holiday;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HolidayDTO {
    private Long id;
    private String name;
    private LocalDate date;
    private String type;
    private String countryCode;

    public static HolidayDTO fromEntity(Holiday holiday) {
        return new HolidayDTO(
            holiday.getId(),
            holiday.getName(),
            holiday.getDate(),
            holiday.getType().name(),
            holiday.getCountryCode()
        );
    }
}
