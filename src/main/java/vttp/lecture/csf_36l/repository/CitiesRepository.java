package vttp.lecture.csf_36l.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.lecture.csf_36l.models.City;

@Repository
public class CitiesRepository {
    @Autowired
    private  JdbcTemplate jdbcTemplate;

    private static final String SELECT = "select code, city_name from cities;";

    public List<City> getAllCities() {
        return jdbcTemplate.query(SELECT, (rs, rn) -> {
            return City.populate(rs);
        });
    }
    
}
