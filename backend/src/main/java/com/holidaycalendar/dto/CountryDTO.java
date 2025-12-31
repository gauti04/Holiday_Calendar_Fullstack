package com.holidaycalendar.dto;

import com.holidaycalendar.model.Country;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryDTO {
    private String code;
    private String name;

    public static CountryDTO fromEntity(Country country) {
        return new CountryDTO(country.getCode(), country.getName());
    }
}
