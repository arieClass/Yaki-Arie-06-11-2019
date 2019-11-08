import { Component } from '@angular/core';
import { DarkmodeService } from './darkmode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme: Observable<boolean>;

  constructor(private darkmodeService: DarkmodeService) { }

  ngOnInit() {
    this.isDarkTheme = this.darkmodeService.isDarkTheme;
  }
}
