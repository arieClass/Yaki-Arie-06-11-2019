import { Component } from '@angular/core';
import { DarkmodeService } from './darkmode.service';
import { Observable, Subscribable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme: Observable<boolean>;
  constructor(private darkmodeService: DarkmodeService, private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    try {
      this.isDarkTheme = this.darkmodeService.isDarkTheme;
    } catch (error) {
      this.toastr.error(error.name, 'Something went wrong', {
        tapToDismiss: true,
        closeButton: true,
        disableTimeOut: true,
        positionClass: 'toast-top-center'
      });
    }
  }
}