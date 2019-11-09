import { Component } from '@angular/core';
import { DarkmodeService } from './darkmode.service';
import { Observable, Subscribable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { promise } from 'protractor';
import { async } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme: Observable<boolean>;
  constructor(private darkmodeService: DarkmodeService, private httpClient: HttpClient) { }
  // async getData() {
  //   await this.httpClient.get("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=gGzT9FiXTEcAx1KFXQyVXKneOOVPG0sS&q=tel").subscribe((data) => { localStorage.setItem('tel', JSON.stringify(data)); console.log(data)});
  // }

  ngAfterViewChecked() {
   // console.log("json parse:..." + JSON.parse(localStorage.getItem('tel')) + "type:....." + typeof (localStorage.getItem('tel')) + "plain:....." + localStorage.getItem('tel'))
    //localStorage.setItem('tel', this.bla)
    
    //console.log("this is localstorage......" + JSON.stringify(localStorage.getItem('tel')) + "....." + typeof (localStorage.getItem('tel')))
  }

  ngOnInit() {
    this.isDarkTheme = this.darkmodeService.isDarkTheme;
    
    //this.getData();
  }
}