import Dexie, { Table } from 'dexie';
import { City } from '../models/City';

export class AppDB extends Dexie {

    cities!: Table<City, string>;
    
    constructor() {
        super('fileupload');
        this.version(1).stores({
            cities: 'code, cityName'
        });
    }

    async addCity(item: City) {
        await this.cities.put(item)
    }
}

export const db = new AppDB();