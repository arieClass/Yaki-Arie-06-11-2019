import { Injectable } from '@angular/core';
import { City } from './city';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cities: City[] = [];
  favorites: City[] = [];

  constructor() { }

  addCity(data): string {
    let city: City = { key: data.Key, rank: data.Rank, localizedName: data.LocalizedName, countryID: data.Country.ID, countryLocalizedName: data.Country.LocalizedName, cityID: data.AdministrativeArea.ID, favorite: false}
    this.cities.push(city);
    return city.key;
  }

  getCity(key: string): Observable<City> {
    return of(this.cities.find(city => city.key === key));
  }

  getCities(): Observable<City[]> {
    return of(this.cities);
  }

  getFavorites(): Observable<City[]> {
    this.cities.map(city => city.favorite === true ? this.favorites.push(city) : '')
    return of(this.favorites)
  }
}
