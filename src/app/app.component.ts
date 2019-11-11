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

  ngOnInit() {
    this.isDarkTheme = this.darkmodeService.isDarkTheme;
  }
}