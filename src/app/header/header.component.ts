import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../darkmode.service';
import { CityWeatherService } from '../city-weather.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  isDarkTheme: Observable<boolean>;
  isCelsius: Observable<boolean>;

  constructor(private darkmodeService: DarkmodeService, private cityWeatherService: CityWeatherService, private toastr: ToastrService) { }

  ngOnInit() {
    try {
      this.isDarkTheme = this.darkmodeService.isDarkTheme;
      this.isCelsius = this.cityWeatherService.isCelsius;
    } catch (error) {
      this.toastr.error(error.name, 'Something went wrong', {
        tapToDismiss: true, closeButton: true, disableTimeOut: true, positionClass: 'toast-top-center'
      });
    }
  }

  toggleDarkTheme(checked: boolean) {
    this.darkmodeService.setDarkTheme(checked);
  }

  toggleDegrees(checked: boolean) {
    this.cityWeatherService.setCelcious(checked);
  }
}
