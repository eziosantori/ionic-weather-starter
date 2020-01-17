import { Component } from '@angular/core';

import { Forecast } from '../models/forecast';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';
import { WeatherPageBase } from '../weather-page-base/weather-page-base';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage extends WeatherPageBase<Forecast> {
  // forecast: Forecast = [
  //   [
  //     {
  //       temperature: 300,
  //       condition: 200,
  //       date: new Date(2018, 8, 19)
  //     }
  //   ],
  //   [
  //     {
  //       temperature: 265,
  //       condition: 601,
  //       date: new Date(2018, 8, 20)
  //     }
  //   ],
  //   [
  //     {
  //       temperature: 293,
  //       condition: 800,
  //       date: new Date(2018, 8, 21)
  //     }
  //   ]
  // ];

  constructor(
    public iconMap: IconMapService,
    loadingController: LoadingController,
    userPreferences: UserPreferencesService,
    weather: WeatherService
    ) {
      super(
        loadingController,
        userPreferences,
        () => weather.forecast());
    }
  }
