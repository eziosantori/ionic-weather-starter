import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { WeatherPageBase } from '../weather-page-base/weather-page-base';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { Weather } from '../models/weather';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';


@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage extends WeatherPageBase<Weather> {
  // currentWeather: Weather;

  constructor(
    public iconMap: IconMapService,
    loadingController: LoadingController,
    userPreferences: UserPreferencesService,
    weather: WeatherService
    ) {
      super(
        loadingController
        , userPreferences
        , () => weather.current()
      );
    }
    toggleScale() {
      this.scale = this.scale === 'C' ? 'F' : 'C';
      this.userPreferences.setUseCelcius(this.scale === 'C');
    }
    // async ionViewDidEnter() {
    //   // this.weather.current().subscribe(w => (this.currentWeather = w));
    //   const l = await this.loadingController.create();
    //   l.present();
    //   this.weather.current().subscribe(d => {
    //     this.currentWeather = d;
    //     l.dismiss();
    //   });
    // }
}
