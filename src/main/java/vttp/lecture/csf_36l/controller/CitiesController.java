package vttp.lecture.csf_36l.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import vttp.lecture.csf_36l.models.City;
import vttp.lecture.csf_36l.service.CitiesService;


@RestController
public class CitiesController {
    @Autowired
    private CitiesService citiesService;

    @GetMapping(path="/api/cities", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<City>> getAllCities() {

        System.out.println("Cities called.");
        return ResponseEntity.ok()
            .body(citiesService.getAllCities()
            .orElse(List.of()));
    }
    
}
