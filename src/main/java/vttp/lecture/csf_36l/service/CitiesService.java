package vttp.lecture.csf_36l.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.lecture.csf_36l.models.City;
import vttp.lecture.csf_36l.repository.CitiesRepository;

@Service
public class CitiesService {
    @Autowired
    private CitiesRepository citiesRepository;

    public Optional<List<City>> getAllCities() {
        return Optional.ofNullable(citiesRepository.getAllCities());
    }
}
