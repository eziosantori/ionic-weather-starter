import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Weather } from '../models/weather';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { WeatherPageBase } from '../weather-page-base/weather-page-base';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage extends WeatherPageBase<Weather> {
  constructor(
    public iconMap: IconMapService,
    loadingController: LoadingController,
    weather: WeatherService
  ) {
    super(loadingController, () => weather.current());
  }
}
