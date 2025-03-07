import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  getCities() {
    return lastValueFrom(this.http.get<City[]>('/api/cities'));
  }
}
