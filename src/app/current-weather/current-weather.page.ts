import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { WeatherPageBase } from '../weather-page-base/weather-page-base';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { Weather } from '../models/weather';


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
    weather: WeatherService
    ) {
      super(loadingController, () => weather.current());
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
