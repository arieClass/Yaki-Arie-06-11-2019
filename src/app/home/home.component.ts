import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';
//import { CityService } from '../city.service';
import { CityWeatherService } from '../city-weather.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private weatherApiService: WeatherApiService, private cityWeatherService: CityWeatherService) { }
  //isCelsius = this.celsius.asObservable();

  // setCardDetails(currCon: any, cityName: string) {
  //   let icon: string;
  //   currCon.WeatherIcon < 10 ? icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${currCon.WeatherIcon}-s.png` : icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${currCon.WeatherIcon}-s.png`;
  //   this.card = { cityName: cityName, weatherText: currCon.WeatherText, metric: currCon.Temperature.Metric.Value + "℃", imperial: currCon.Temperature.Imperial.Value + "℉", icon: icon };
  // }

  // setForecastDetails(forecast: any, cityName: string) {
  //   let icon: string;
  //   for (let day of forecast.DailyForecasts) {
  //     if (day.Day.Icon < 10) {
  //       icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${day.Day.Icon}-s.png`;
  //     } else {
  //       icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${day.Day.Icon}-s.png`;
  //     }
  //     //let dayName = new Date(day.Date).getDay();
  //     let card: CardDetails = { cityName: new Date(day.Date).toLocaleDateString('en-US', { weekday: 'long' }), weatherText: day.Day.IconPhrase, metric: (Math.round((day.Temperature.Maximum.Value - 32) * (5 / 9))) + "℃", imperial: day.Temperature.Maximum.Value + "℉", icon: icon };
  //     this.cards.push(card);
  //   }
  // }
  ngDoCheck() {
    this.cityWeatherService.isCelsius.subscribe(data => {
      this.isCelsius = data;
    });
  }

  async ngOnInit() {
    let data = await this.weatherApiService.getGeoPosition();
    let currCon = await this.weatherApiService.getCurrentCondition(data.Key);
    let forecast = await this.weatherApiService.get5daysForcasts(data.Key);
    this.currentCity == null ? this.cityWeatherService.setCity(data, currCon).toPromise().then(currentCity => { this.currentCity = currentCity; }) : "";
    this.forecast == null ? this.cityWeatherService.setForecast(data.Key, forecast).toPromise().then(forecast => { this.forecast = forecast; }) : "";
    // this.cityService.getCity(key).toPromise().then(data => {
    //   this.setCardDetails(currCon, data.localizedName);
    //   this.setForecastDetails(forecast, data.localizedName);
    // });
    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  // setCelsius(isCelsius: boolean): void {
  //   this.celsius.next(isCelsius);
  // }
}