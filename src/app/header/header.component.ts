import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../darkmode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  
  isDarkTheme: Observable<boolean>;

  constructor(private darkmodeService: DarkmodeService) { }

  ngOnInit() {
    this.isDarkTheme = this.darkmodeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.darkmodeService.setDarkTheme(checked);
  }
}
