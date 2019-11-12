import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service'
import { CityWeatherService } from '../city-weather.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentCity: any;
  forecast: any[];
  isCelsius: boolean;
  buttonColor: string = 'grey';
  buttonBackColor: string = 'white';
  searchCity = new FormControl('');

  constructor(private weatherApiService: WeatherApiService, private cityWeatherService: CityWeatherService, private toastr: ToastrService) { }

  ngDoCheck() {
    this.cityWeatherService.isCelsius.subscribe(data => {
      this.isCelsius = data;
    });
    this.checkFavBtn();
  }

  async onSubmit(event: Event) {
    try {
      if (/^[a-zA-Z ]*$/.test(this.searchCity.value)) {
        let data = await this.weatherApiService.getSearchedCity(this.searchCity.value);
        this.setAllHomeCityDetails(data[0]);
      }
      else {
        this.toastr.warning('City name has to contain English words only', 'Typo', {
          tapToDismiss: true, closeButton: true, disableTimeOut: true, positionClass: 'toast-top-center'
        });
      }
    } catch (error) {
      this.toastr.error(error.name, 'Something went wrong', {
        tapToDismiss: true, closeButton: true, disableTimeOut: true, positionClass: 'toast-top-center'
      });
    }
  }

  async ngOnInit() {
    try {
      let data = await this.weatherApiService.getGeoPosition();
      this.setAllHomeCityDetails(data);
    } catch (error) {
      this.toastr.error(error.name, 'Something went wrong', {
        tapToDismiss: true, closeButton: true, disableTimeOut: true, positionClass: 'toast-top-center'
      });
    }
    this.checkFavBtn();
  }

  async setAllHomeCityDetails(data: any) {
    try {
      let currCon = await this.weatherApiService.getCurrentCondition(data.Key);
      let forecast = await this.weatherApiService.get5daysForcasts(data.Key);
      this.cityWeatherService.setCity(data, currCon).toPromise().then(currentCity => { this.currentCity = currentCity; });
      this.cityWeatherService.setForecast(data.Key, forecast).toPromise().then(forecast => { this.forecast = forecast; });
    } catch (error) {
      this.toastr.error(error.name, 'Something went wrong', {
        tapToDismiss: true, closeButton: true, disableTimeOut: true, positionClass: 'toast-top-center'
      });
    }
  }

  checkFavBtn() {
    if (this.cityWeatherService.isInFavorites(this.currentCity)) {
      this.buttonColor = '#ff597e';
      this.buttonBackColor = '#4c7bd9';
    } else {
      this.buttonColor = 'grey';
      this.buttonBackColor = 'white';
    }
  }

  addOrRemoveFavorite() {
    if (this.cityWeatherService.addOrRemoveFavorite(this.currentCity)) {
      this.buttonColor = '#ff597e';
      this.buttonBackColor = '#4c7bd9';
    } else {
      this.buttonColor = 'grey';
      this.buttonBackColor = 'white';
    }
  }
}