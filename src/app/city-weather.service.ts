import { Injectable } from '@angular/core';
import { CityWeather } from './city-weather';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityWeatherService {

  private forecast: CityWeather[] = [];
  private favorites: CityWeather[] = [];
  private celsius = new Subject<boolean>();
  isCelsius = this.celsius.asObservable();

  constructor() { }

  setCity(data: any, currCon: any): Observable<CityWeather> {
    let icon: string;
    currCon.WeatherIcon < 10 ? icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${currCon.WeatherIcon}-s.png` : icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${currCon.WeatherIcon}-s.png`;
    let city: CityWeather = { key: data.Key, title: data.LocalizedName, weatherText: currCon.WeatherText, metric: currCon.Temperature.Metric.Value + "℃", imperial: currCon.Temperature.Imperial.Value + "℉", icon: icon }
    return of(city);
  }

  setForecast(key: string, forecast: any): Observable<CityWeather[]> {
    this.forecast = [];
    let icon: string;
    for (let day of forecast.DailyForecasts) {
      day.Day.Icon < 10 ? icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${day.Day.Icon}-s.png` : icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${day.Day.Icon}-s.png`;
      let city: CityWeather = { key: key, title: new Date(day.Date).toLocaleDateString('en-US', { weekday: 'long' }), weatherText: day.Day.IconPhrase, metric: (Math.round(((day.Temperature.Maximum.Value - 32) * (5 / 9)) * 10) / 10) + "℃", imperial: day.Temperature.Maximum.Value + "℉", icon: icon };
      this.forecast.push(city);
    }
    return of(this.forecast);
  }

  setCelcious(isCelsius: boolean): void {
    this.celsius.next(isCelsius);
  }

  addOrRemoveFavorite(cityToCheck: CityWeather): boolean {
    console.log("inside addorremove");
    console.log(cityToCheck);
    if (this.favorites.some(data => data.key === cityToCheck.key)) {
      this.favorites = this.favorites.filter(city => city.key !== cityToCheck.key);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      console.log(this.favorites);
      return false;
    } else {
      this.favorites.push(cityToCheck);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      console.log(this.favorites);
      return true;
    }
  }

  isInFavorites(cityToCheck: CityWeather): boolean{
    if(this.favorites.some(data=>data.key === cityToCheck.key)){
      return true;
    }
    return false;
  }
  getFavorites(): Observable<CityWeather[]> {
    this.favorites = [];
    let retrievedFav = JSON.parse(localStorage.getItem('favorites'));
    for (let fav of retrievedFav) {
      let tempfav: CityWeather = { key: fav.key, title: fav.title, weatherText: fav.weatherText, metric: fav.metric, imperial: fav.imperial, icon: fav.icon }
      this.favorites.push(tempfav);
    }
    return of(this.favorites)
  }
}
