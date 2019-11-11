import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../darkmode.service';
import { CityWeatherService } from '../city-weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  isDarkTheme: Observable<boolean>;
  isCelsius: Observable<boolean>;

  constructor(private darkmodeService: DarkmodeService, private cityWeatherService: CityWeatherService) { }

  ngOnInit() {
    this.isDarkTheme = this.darkmodeService.isDarkTheme;
    this.isCelsius = this.cityWeatherService.isCelsius;
    console.log(this.isCelsius);
  }

  toggleDarkTheme(checked: boolean) {
    this.darkmodeService.setDarkTheme(checked);
  }

  toggleDegrees(checked: boolean) {
    this.cityWeatherService.setCelcious(checked);
  }
}
