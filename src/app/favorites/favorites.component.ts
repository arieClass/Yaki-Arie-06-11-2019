import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';
//import { CityService } from '../city.service';
import { CityWeatherService } from '../city-weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: any[];
  isCelsius: boolean;
  buttonColor: string = 'grey';
  buttonBackColor: string = 'white';

  constructor(private weatherApiService: WeatherApiService, private cityWeatherService: CityWeatherService) { }

  ngDoCheck() {
    this.cityWeatherService.isCelsius.subscribe(data => {
      this.isCelsius = data;
    });
    this.cityWeatherService.getFavorites().toPromise().then(favorites => { this.favorites = favorites; });
  }
  ngOnInit() {
    this.cityWeatherService.getFavorites().toPromise().then(favorites => { this.favorites = favorites; });
  }

}
