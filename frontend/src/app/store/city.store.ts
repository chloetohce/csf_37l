// Component store
// The state has to store a list of cities

import { Injectable } from "@angular/core";
import { City } from "../models/City";
import { ComponentStore } from "@ngrx/component-store";
import { from, Observable, switchMap, tap } from "rxjs";
import { db } from "../shared/app.db";
import { liveQuery } from "dexie";

export interface CityState {
    cities: City[]
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CityStore extends ComponentStore<CityState> {
    constructor() { 
        super({cities: [], loading:false});
    }

    // Selector - select list of cities
    readonly cities$ = this.select(state => state.cities);
    readonly loading$ = this.select(state => state.loading) // Optional

    // Updators
    readonly setLoading = this.updater((state, loading: boolean) => ({...state, loading})) // Optional
    readonly setCities = this.updater<City[]>((state, cities: City[]) => ({...state, cities}))

    // Effects - will upadte the state management if there are changes in your cities
    // Observable is a trigger that will trigger load cities
    // When there are changes to the state, we initiate a function, that queries the indexedDB, and bulk inserts into the state.
    readonly loadCities = this.effect((trigger$: Observable<void>) => 
        trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap(() => 
                from(liveQuery(() => db.cities.reverse().toArray())) 
                    .pipe(
                        tap({
                            next: (cities) => this.setCities(cities), // Retrieves from DB and sets it to the city state object
                            error: (err) => this.setLoading(false) // For UI purposes
                        })
                    )
            )
        )
    );

    // Add new city
    readonly addNewCity = this.effect((city$: Observable<City>) => 
        city$.pipe(
            switchMap((city) => 
                from(db.addCity(city)).pipe(
                    tap(() => this.loadCities())
                )
            )
        )
    )
    
}