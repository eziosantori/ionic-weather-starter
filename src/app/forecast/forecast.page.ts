import { Component } from '@angular/core';

import { Forecast } from '../models/forecast';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage {
  forecast: Forecast = [
    [
      {
        temperature: 300,
        condition: 200,
        date: new Date(2018, 8, 19)
      }
    ],
    [
      {
        temperature: 265,
        condition: 601,
        date: new Date(2018, 8, 20)
      }
    ],
    [
      {
        temperature: 293,
        condition: 800,
        date: new Date(2018, 8, 21)
      }
    ]
  ];

  constructor(
    public iconMap: IconMapService,
    private loadingController: LoadingController,
    private weather: WeatherService
    ) {}

    async ionViewDidEnter() {
      // this.weather.forecast().subscribe(f => (this.forecast = f));
      const l = await this.loadingController.create();
      l.present();
      this.weather.forecast().subscribe(d => {
        this.forecast = d;
        l.dismiss();
      });
  }
}
