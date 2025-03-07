import { Component, inject, OnInit } from '@angular/core';
import { CitiesService } from './services/cities.service';
import { CityStore } from './store/city.store';
import { City } from './models/City';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private citiesService = inject(CitiesService)

  private citiesStore = inject(CityStore)

  cities: City[] = [];

  async ngOnInit() {
    this.cities = await this.citiesService.getCities();
    this.cities.forEach((cityObj) => {
      console.log(cityObj)
      this.citiesStore.addNewCity(cityObj)
    });
  }
}
