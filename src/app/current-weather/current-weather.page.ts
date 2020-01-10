import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { Weather } from '../models/weather';


@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage {
  currentWeather: Weather;

  constructor(
    public iconMap: IconMapService,
    private loadingController: LoadingController,
    private weather: WeatherService
    ) { }

    async ionViewDidEnter() {
      // this.weather.current().subscribe(w => (this.currentWeather = w));
      const l = await this.loadingController.create();
      l.present();
      this.weather.current().subscribe(d => {
        this.currentWeather = d;
        l.dismiss();
      });
    }
}
