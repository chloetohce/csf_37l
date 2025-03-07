import { Component, inject, OnInit } from '@angular/core';
import { CityStore } from '../../store/city.store';
import { Observable } from 'rxjs';
import { City } from '../../models/City';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  private cityStore = inject(CityStore); // Data coming in from indexedDB
  citiesList$!: Observable<City[]>;
  selectedCity?: string;

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.citiesList$ = this.cityStore.cities$;
    this.cityStore.loadCities();
  }
}
