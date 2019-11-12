import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';
import { CityWeatherService } from '../city-weather.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private weatherApiService: WeatherApiService, private cityWeatherService: CityWeatherService, private toastr: ToastrService) { }

  ngDoCheck() {
    this.cityWeatherService.isCelsius.subscribe(data => {
      this.isCelsius = data;
    });
  }

  ngOnInit() {
    try {
      this.cityWeatherService.getFavorites().toPromise().then(favorites => { this.favorites = favorites; });
    } catch (error) {
      this.toastr.error(error.name, 'Something went wrong', {
        tapToDismiss: true, closeButton: true, disableTimeOut: true, positionClass: 'toast-top-center'
      });
    }
  }
}
