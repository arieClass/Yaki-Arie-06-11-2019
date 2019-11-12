import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityWeather } from './city-weather';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  readonly apikey: string = "E5K6oZxlI1vebAQe2kwcIhT9klJCtQa1";

  constructor(private cityWeather: CityWeather, private httpClient: HttpClient, private toastr: ToastrService) { }

  geoLocationIsAvailable(): boolean {
    if ("geolocation" in navigator) {
      this.toastr.success('geolocation is available on your device', 'navigator', {
        tapToDismiss: true, closeButton: true, disableTimeOut: true, positionClass: 'toast-top-center'
      });
      return true;
    } else {
      this.toastr.info('geolocation IS NOT available, default location will be set to Tel Aviv', 'navigator', {
        tapToDismiss: true, closeButton: true, disableTimeOut: true, positionClass: 'toast-top-center'
      });
      return false;
    }
  }

  getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async getGeoPosition(): Promise<any> {
    let coords: any = await this.getCurrentPosition();
    let latitude = coords.coords.latitude;
    let longitude = coords.coords.longitude;
    let data = await this.httpClient.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apikey}&q=${latitude}%2C${longitude}`).toPromise();
    return data;
  }

  async getCurrentCondition(key: string): Promise<any> {
    let data = await this.httpClient.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${this.apikey}`).toPromise();
    return data[0];
  }

  async get5daysForcasts(key: string): Promise<any> {
    let data = await this.httpClient.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${this.apikey}`).toPromise();
    return data;
  }

  async getSearchedCity(searchedCity: string): Promise<any> {
    let data = await this.httpClient.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apikey}&q=${searchedCity}`).toPromise();
    return data;
  }
}
