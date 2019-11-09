import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';
import { CityService } from '../city.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Tile {
  cols: number;
  rows: number;
  color: string;
}

export interface CardDetails {
  cityName: string;
  weatherText: string;
  metric: string;
  imperial: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private weatherApiService: WeatherApiService, private cityService: CityService) { }
  card: CardDetails;
  cards: CardDetails[] = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  setCardDetails(currCon: any, cityName: string) {
    let icon: string;
    if (currCon.WeatherIcon < 10) {
      icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${currCon.WeatherIcon}-s.png`;
    } else {
      icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${currCon.WeatherIcon}-s.png`;
    }
    this.card = { cityName: cityName, weatherText: currCon.WeatherText, metric: currCon.Temperature.Metric.Value + "℃", imperial: currCon.Temperature.Imperial.Value + "℉", icon: icon };
  }

  setForecastDetails(forecast: any, cityName: string) {
    let icon: string;  
    for (let day of forecast.DailyForecasts) {
      if (day.Day.Icon < 10) {
        icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${day.Day.Icon}-s.png`;
      } else {
        icon = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${day.Day.Icon}-s.png`;
      }
      //let dayName = new Date(day.Date).getDay();
      let card: CardDetails = { cityName: new Date(day.Date).toLocaleDateString('en-US', { weekday: 'long' }), weatherText: day.Day.IconPhrase, metric: (Math.round((day.Temperature.Maximum.Value - 32)*(5/9))) + "℃", imperial: day.Temperature.Maximum.Value + "℉", icon: icon };
      this.cards.push(card);
    }
  }

  async ngOnInit() {
    let key = await this.weatherApiService.getGeoPosition();
    let currCon = await this.weatherApiService.getCurrentCondition(key);
    let forecast = await this.weatherApiService.get5daysForcasts(key);
    this.cityService.getCity(key).toPromise().then(data => {
      this.setCardDetails(currCon, data.localizedName);
      this.setForecastDetails(forecast, data.localizedName);
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  tiles: Tile[] = [
    { cols: 1, rows: 2, color: 'pink' },
    { cols: 1, rows: 2, color: 'black' },
    { cols: 1, rows: 2, color: 'lightblue' },
    { cols: 1, rows: 2, color: 'orenge' },
    { cols: 1, rows: 2, color: 'brown' },
  ];
}
