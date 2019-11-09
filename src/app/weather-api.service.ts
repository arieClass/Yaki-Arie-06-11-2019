import { Injectable } from '@angular/core';
import { CityService } from './city.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  readonly apikey: string = "2FqZaZS4H5Tz7PGCHjQvenoFC39oeIGw";
  constructor(private cityService: CityService, private httpClient: HttpClient) { }

  geoLocationIsAvailable(): boolean {
    if ("geolocation" in navigator) {
      console.log('geolocation is available');
      return true;
    } else {
      console.log('geolocation IS NOT available, default location will be set to Tel Aviv');
      return false;
    }
  }

  getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async getGeoPosition(): Promise<string> {
    let coords: any = await this.getCurrentPosition();
    let latitude = coords.coords.latitude;
    let longitude = coords.coords.longitude;
    let data = await this.httpClient.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apikey} &q=${latitude} %2C${longitude} `).toPromise();
    console.log(data)
    let key: string = this.cityService.addCity(data);
    return key;
  }

  async getCurrentCondition(key: string): Promise<any> {
    let data = await this.httpClient.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${this.apikey}`).toPromise();
    console.log(data[0]);
    return data[0];
  }

  async get5daysForcasts(key: string): Promise<any>{
    let data = await this.httpClient.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${this.apikey}`).toPromise();
    console.log(data);
    return data;
  }
}
